import AsyncStorage from '@react-native-async-storage/async-storage'; // <-- Import AsyncStorage
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, View } from 'react-native';
import Logo from '../assets/images/logo.png';

const DefaultScreen = () => {
  useEffect(() => {
    const checkUser = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setTimeout(() => {
        if (userId) {
          router.replace('/home');
        } else {
          router.replace('/onboarding');
        }
      }, 2000);
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
