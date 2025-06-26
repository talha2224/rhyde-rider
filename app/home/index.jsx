import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import carImg from '../../assets/images/home/car.png';
import mapImg from '../../assets/images/home/map.png';
import BottomNavbar from '../../components/BottomNavbar';
import { getRandomDarkColor } from '../../hooks/generateColor';

const Home = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello Daniel</Text>
            <Text style={styles.question}>Where would you like to go?</Text>
          </View>
          <TouchableOpacity onPress={()=>router.push("/home/notification")}><MaterialCommunityIcons name="bell-outline" size={24} color="#FFF" /></TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top rydes</Text>
            <TouchableOpacity onPress={()=>router.push("/home/rhydes")}>
              <Text style={styles.seeMore}>See more</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
            {
              [1, 2, 3, 4]?.map((i) => (
                <View key={i} style={[styles.rydeCard, { backgroundColor: getRandomDarkColor() }]}>
                  <Image source={carImg} style={styles.rydeImage} />
                  <View style={styles.rydeDetails}>
                    <Text style={styles.rydeName}>Compact SUV</Text>
                    <Text style={styles.rydeDistance}>10 mins away</Text>
                    <View style={styles.ratingContainer}>
                      <AntDesign name="star" size={14} color="#FFD700" />
                      <AntDesign name="star" size={14} color="#FFD700" />
                      <AntDesign name="star" size={14} color="#FFD700" />
                      <AntDesign name="star" size={14} color="#FFD700" />
                      <AntDesign name="staro" size={14} color="#FFD700" />
                      <Text style={styles.reviewCount}>(120 Review)</Text>
                    </View>
                    <Text style={styles.rydePrice}>$34.60</Text>
                  </View>
                </View>
              ))
            }
          </ScrollView>
        </View>

        {/* Map Section */}
        <View style={styles.mapContainer}>
          <Image source={mapImg} style={styles.mapImage} resizeMode="cover" />
          {/* <View style={styles.mapOverlay}>
            <MaterialCommunityIcons name="map-marker" size={30} color="#FFD700" />
          </View> */}
        </View>

        {/* Location Input Section */}
        <View style={styles.locationInputContainer}>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons name="circle-outline" size={20} color="#FFD700" />
            <TextInput placeholder='Your current location' placeholderTextColor={"#fff"}style={{height:40,flex:1}}/>
          </View>
          <View style={styles.inputRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={20} color="#FFD700" />
            <TextInput placeholder='Your destination' placeholderTextColor={"#fff"}style={{height:40,flex:1}}/>
          </View>
          <TouchableOpacity style={styles.bookRydeButton}>
            <Text style={styles.bookRydeButtonText}>Book ryde</Text>
          </TouchableOpacity>
        </View>

        {/* History Section */}
        <View style={[styles.section, { marginBottom: 80 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>History</Text>
            <TouchableOpacity onPress={()=>router.push("/home/rideHistory")}>
              <Text style={styles.seeMore}>See more</Text>
            </TouchableOpacity>
          </View>
          {
            [1, 2, 3]?.map((i) => (
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
            ))
          }
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
    // backgroundColor: 'rgba(255, 215, 0, 0.3)',
    // width: 100,
    // height: 100,
    // borderRadius: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    backgroundColor:"#1C1A1B",
    paddingVertical:5,
    paddingHorizontal:8,
    borderRadius:5,
    marginBottom:10,
    gap:10
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
