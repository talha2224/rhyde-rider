import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import carImg from '../../assets/images/home/car.png';
import BottomNavbar from '../../components/BottomNavbar';
import Map from '../../components/Map';
import config from '../../config';

const Home = () => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [destination, setDestination] = useState({ pickupAddress: '', dropOfAddress: '', dropOfLongtitude: "", dropOfLatitude: "" });
  const [suggestions, setSuggestions] = useState([]);

  const handlePlaceSelection = useCallback((data, details) => {
    if (details) {
      const { lat, lng } = details?.geometry?.location;
      setDestination({
        pickupAddress: address?.formattedAddress,
        dropOfAddress: data.description?.replaceAll(',', ' '),
        dropOfLongtitude: lng,
        dropOfLatitude: lat
      });
      setSuggestions([]);
    } else {
      console.warn('Data not found');
    }
  }, [address]);

  const handleSuggestionSelect = async (item) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=AIzaSyDo4GPTF9dChnFkV-uX5zoiA7JHZongxPI`
      );
      const details = await res.json();

      if (details.status === 'OK') {
        handlePlaceSelection(item, details.result);
      } else {
        console.warn('Place details error:', details.status);
        setSuggestions([]);
      }
    } catch (err) {
      console.error('Error getting place details:', err);
    }
  };

  const fetchSuggestions = async (inputText) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputText}&key=AIzaSyDo4GPTF9dChnFkV-uX5zoiA7JHZongxPI&language=en`
      );
      const json = await res.json();
      setSuggestions(json.status === 'OK' ? json.predictions : []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const updateLocation = async (latitude,longitude) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const role = "rider"
      if (!userId || !latitude || !longitude) return;
      const payload = { latitude,longitude, ...(role === "driver" ? { driverId: userId } : { riderId: userId }) };
      const res = await axios.post(`${config.baseUrl}/location/update`, payload);
      if (res?.data?.status === 200) {
        console.log("📍 Location updated:");
      }
    } catch (error) {
      console.error("❌ Failed to update location:", error?.response?.data || error.message);
    }
  };

  const fetchSavedLocation = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const role = "rider"
      if (!userId || !role) return;
      const res = await axios.get(`${config.baseUrl}/location/${role}/${userId}`);
      if (res?.data?.status === 200) {
      }
    } catch (error) {
      console.error("❌ Failed to fetch saved location:", error?.response?.data || error.message);
    }
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;

        const res = await axios.get(`${config.baseUrl}/rider/info/${userId}`);
        if (res.status === 201 && res.data?.data) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.log('Failed to fetch user:', error?.response?.data || error.message);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          ToastAndroid.show('Permission to access location was denied', ToastAndroid.SHORT);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        const [addr] = await Location.reverseGeocodeAsync(loc.coords);
        setAddress(addr);
        await updateLocation(loc.coords.latitude,loc.coords.longitude);
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    };

    getLocation();
  }, []);

  const isBookDisabled = !destination.pickupAddress || !destination.dropOfAddress;
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello {user?.name}</Text>
            <Text style={styles.question}>Where would you like to go?</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/home/notification')}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top rydes</Text>
            <TouchableOpacity onPress={() => router.push('/home/rhydes')}>
              <Text style={styles.seeMore}>See more</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
            {[1, 2, 3, 4].map((i) => (
              <View key={i} style={[styles.rydeCard, { backgroundColor: '#FBB73A' }]}>
                <Image source={carImg} style={styles.rydeImage} />
                <View style={styles.rydeDetails}>
                  <Text style={styles.rydeName}>Compact SUV</Text>
                  <Text style={styles.rydeDistance}>10 mins away</Text>
                  <View style={styles.ratingContainer}>
                    {[...Array(4)].map((_, idx) => (
                      <AntDesign key={idx} name="star" size={14} color="#FFD700" />
                    ))}
                    <AntDesign name="staro" size={14} color="#FFD700" />
                    <Text style={styles.reviewCount}>(120 Review)</Text>
                  </View>
                  <Text style={styles.rydePrice}>$34.60</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {!location ? (
          <View style={[styles.mapContainer, { justifyContent: 'center', alignItems: 'center', backgroundColor: "#000" }]}>
            <Text style={{ color: '#fff', fontSize: 16, }}>Map loading...</Text>
          </View>
        ) : (
          <Map mapContainer={styles.mapContainer} location={location} />
        )}

        <View style={styles.locationInputContainer}>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons name="circle-outline" size={20} color="#FFD700" />
            <TextInput
              editable={false}
              defaultValue={address?.formattedAddress}
              placeholder="Your current location"
              placeholderTextColor="#fff"
              style={{ height: 40, flex: 1, color: '#fff', opacity: 0.6 }}
            />
          </View>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={20} color="#FFD700" />
            <TextInput
              value={destination.dropOfAddress}
              onChangeText={(text) => {
                setDestination((prev) => ({ ...prev, dropOfAddress: text }));
                fetchSuggestions(text);
              }}
              placeholder="Your destination"
              placeholderTextColor="#fff"
              style={{ height: 40, flex: 1, color: '#fff' }}
            />
          </View>
          {suggestions.length > 0 &&
            suggestions.map((item) => (
              <TouchableOpacity
                key={item.place_id}
                onPress={() => handleSuggestionSelect(item)}
                style={{ padding: 10, backgroundColor: '#1C1A1B', borderBottomWidth: 1, borderBottomColor: 'gray' }}
              >
                <Text style={{ color: '#fff' }}>{item.description}</Text>
              </TouchableOpacity>
            ))}

          <TouchableOpacity onPress={() => { router.push({ pathname: '/home/booking', params: { currentLocation: JSON.stringify(location), destination: JSON.stringify(destination), }, }); }} disabled={isBookDisabled} style={[styles.bookRydeButton, isBookDisabled && { opacity: 0.5 },]}>
            <Text style={styles.bookRydeButtonText}>Book ryde</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { marginBottom: 80 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>History</Text>
            <TouchableOpacity onPress={() => router.push('/home/rideHistory')}>
              <Text style={styles.seeMore}>See more</Text>
            </TouchableOpacity>
          </View>
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.historyItem}>
              <View style={styles.historyIconText}>
                <FontAwesome5 name="store" size={20} color="#FFD700" />
                <View style={styles.historyDetails}>
                  <Text style={styles.historyTitle}>Fashion Store</Text>
                  <Text style={styles.historyAddress}>45, Jos Avenue 34 Crescent</Text>
                </View>
              </View>
              <Text style={styles.historyPrice}>$40.6</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNavbar />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1A1B',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  question: {
    fontSize: 16,
    color: '#AAA',
    marginTop: 5,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  seeMore: {
    color: '#FFD700', // Gold color
    fontSize: 14,
  },
  cardScroll: {
    paddingBottom: 10,
  },
  rydeCard: {
    borderRadius: 15,
    padding: 15,
    paddingHorizontal: 10,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rydeCardAlt: {
    width: 150,
  },
  rydeImage: {
    width: 100,
    height: 70,
    resizeMode: 'contain',
    marginRight: 10,
  },
  rydeImageAlt: {
    width: 80,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  rydeDetails: {
    flex: 1,
  },
  rydeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  rydeDistance: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  reviewCount: {
    fontSize: 12,
    color: '#FFF',
    marginLeft: 5,
  },
  rydePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 5,
  },
  mapContainer: {
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    position: 'absolute',
  },
  mapOverlay: {
  },
  locationInputContainer: {
    backgroundColor: '#000',
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
    padding: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#1C1A1B",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginBottom: 10,
    gap: 10
  },
  bookRydeButton: {
    backgroundColor: '#FBB73A',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  bookRydeButtonText: {
    color: '#1E1E1E',
    fontWeight: "700"
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  historyIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyDetails: {
    marginLeft: 10,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  historyAddress: {
    fontSize: 12,
    color: '#AAA',
    marginTop: 2,
  },
  historyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});

export default Home;
