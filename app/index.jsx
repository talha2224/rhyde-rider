import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, View } from 'react-native';
import Logo from '../assets/images/logo.png';
import config from '../config';


const DefaultScreen = () => {
  useEffect(() => {
    const checkUser = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        try {
          let isBookingExits = await axios.get(`${config.baseUrl}/booking/ongoing?riderId=${userId}`)
          if (isBookingExits.data?.data) {
            router.push({ pathname: "/home/booking/activebooking", params: { bookingData: JSON.stringify(isBookingExits?.data?.data) }, });
          }
          else {
            router.replace('/home');
          }

        }
        catch (error) {
          console.log(error, 'error')
          router.replace('/home');
        }
      }
      else {
        router.replace('/onboarding');
      }
    };

    checkUser();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={Logo} />
    </View>
  );
};

export default DefaultScreen;
