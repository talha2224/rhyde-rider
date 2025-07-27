import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import cover_photo from "../../../assets/images/cover_photo.png";
import BottomNavbar from "../../../components/BottomNavbar";
import config from '../../../config';

const Profile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;
        const res = await axios.get(`${config.baseUrl}/rider/info/${userId}`);
        if (res.data?.data) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error?.response?.data || error.message);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () =>{
    await AsyncStorage.removeItem("userId")
    router.push('/signin')
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <Image source={cover_photo} style={styles.coverPhoto} resizeMode="cover" />


        <View style={{ paddingHorizontal: 20 }}>
          <Image
            source={{ uri: user?.profile }}
            style={styles.profilePhoto}
          />
          <Text style={styles.userName}>{user?.name}</Text>

          <View style={styles.quickAccessButtons}>
            <TouchableOpacity style={styles.quickAccessButton} onPress={() => router.push('/home/profile/singleprofile')}>
              <MaterialCommunityIcons name="account-details-outline" size={24} />
              <Text style={styles.quickAccessButtonText}>My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessButton} onPress={() => router.push('/home/savedplaces')}>
              <MaterialCommunityIcons name="map-marker-multiple-outline" size={24} />
              <Text style={styles.quickAccessButtonText}>Saved Places</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAccessButton} onPress={() => router.push('/home/profile/gift')}>
              <MaterialCommunityIcons name="bag-personal-outline" size={24} />
              <Text style={styles.quickAccessButtonText}>Safety Kits</Text>
            </TouchableOpacity>
          </View>

        </View>


        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/home/profile/setting')}>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#FFD700" />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemTitle}>Settings</Text>
              <Text style={styles.menuItemDescription}>Customer your app experience</Text>
            </View>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/home/profile/notification')}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#FFD700" />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemTitle}>Notifications</Text>
              <Text style={styles.menuItemDescription}>Stay updated on your trips</Text>
            </View>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/home/profile/paymentmethod')}>
            <MaterialCommunityIcons name="credit-card-outline" size={24} color="#FFD700" />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemTitle}>Payment methods</Text>
              <Text style={styles.menuItemDescription}>Manage your payout</Text>
            </View>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/home/profile/support')}>
            <MaterialCommunityIcons name="lifebuoy" size={24} color="#FFD700" />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemTitle}>Customer Support</Text>
              <Text style={styles.menuItemDescription}>Chat with our customer support</Text>
            </View>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/home/profile/subscription')}>
            <MaterialCommunityIcons name="tag-heart-outline" size={24} color="#FFD700" />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemTitle}>Subscription</Text>
              <Text style={styles.menuItemDescription}>Subscribe to our premium plan</Text>
            </View>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/home/profile/report')}>
            <MaterialCommunityIcons name="alert-circle-outline" size={24} color="#FF6347" />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemTitle}>Report a problem</Text>
              <Text style={styles.menuItemDescription}>Let's help you experience the best</Text>
            </View>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={24} color="#FF6347" />
            <View style={styles.menuItemTextContainer}>
              <Text style={styles.menuItemTitle}>Logout</Text>
              <Text style={[styles.menuItemDescription, { display: "none" }]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, deserunt?</Text>
            </View>
            <AntDesign name="right" size={16} color="#AAA" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181617',
  },
  scrollViewContent: {
    paddingBottom: 80, // Space for BottomNavbar
  },
  coverPhoto: {
    width: '100%',
    height: 180, // Adjust height as needed
  },
  profileCard: {
    backgroundColor: '#2A2A2A', // Darker background for the card
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: -80, // Overlap with cover photo
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#1C1A1B', // Border color to match background
    marginTop: -50, // Adjust to position correctly on the card
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  userLocation: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 20,
  },
  quickAccessButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  quickAccessButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFD700',
    flex: 1,
    marginRight: 10
  },
  quickAccessButtonText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: '#1C1A1B',
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#AAA',
  },
});

export default Profile;
