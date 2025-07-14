import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Upload = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [idImage, setIdImage] = useState(null);

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Camera access is needed to take a photo.');
        return false;
      }
    }
    return true;
  };

  const requestMediaLibraryPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Media library access is needed.');
        return false;
      }
    }
    return true;
  };

  const pickImage = async (setImage) => {
    const hasCameraPermission = await requestCameraPermission();
    const hasMediaPermission = await requestMediaLibraryPermission();

    if (!hasCameraPermission || !hasMediaPermission) return;

    Alert.alert('Select Image', 'Choose an option to upload your image', [
      {
        text: 'Take Photo',
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0]);
          }
        },
      },
      {
        text: 'Choose from Gallery',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0]);
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleNext = async () => {
    if (!profileImage) {
      Alert.alert('Missing Profile Picture', 'Please upload a profile picture to continue.');
      return;
    }
    if (!idImage) {
      Alert.alert('Missing Valid ID', 'Please upload a valid ID to continue.');
      return;
    }

    try {
      await AsyncStorage.setItem('profileImage', JSON.stringify(profileImage));
      await AsyncStorage.setItem('idImage', JSON.stringify(idImage));
      router.push('/setup/payment');
    } catch (error) {
      console.error('Error saving images:', error);
      Alert.alert('Storage Error', 'Could not save images. Please try again.');
    }
  };

  const isNextButtonEnabled = profileImage && idImage;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.contentArea}>
        <Text style={styles.title}>Upload a profile picture & valid ID</Text>
        <Text style={styles.description}>
          Your photo and ID help drivers recognize you and keep the platform safe.
        </Text>

        {/* Profile Picture Upload */}
        <TouchableOpacity style={styles.uploadOptionButton} onPress={() => pickImage(setProfileImage)}>
          <View style={styles.uploadOptionContent}>
            <FontAwesome5 name="camera-retro" size={20} color="white" style={styles.uploadIcon} />
            <Text style={styles.uploadText}>Profile picture</Text>
            {profileImage && <Image source={{ uri: profileImage.uri }} style={styles.uploadedThumbnail} />}
          </View>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>

        {/* ID Upload */}
        <TouchableOpacity style={styles.uploadOptionButton} onPress={() => pickImage(setIdImage)}>
          <View style={styles.uploadOptionContent}>
            <FontAwesome5 name="id-card-alt" size={20} color="white" style={styles.uploadIcon} />
            <Text style={styles.uploadText}>Valid ID</Text>
            {idImage && <Image source={{ uri: idImage.uri }} style={styles.uploadedThumbnail} />}
          </View>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleNext}
        style={[styles.nextButton, !isNextButtonEnabled && styles.nextButtonDisabled]}
        disabled={!isNextButtonEnabled}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Upload;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 20,
    paddingHorizontal: 25,
  },
  backButton: {
    position: 'absolute',
    top: StatusBar.currentHeight + 20,
    left: 20,
    zIndex: 10,
    padding: 8,
    backgroundColor: "#1C1A1B",
    borderRadius: 50,
  },
  contentArea: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 8,
    marginTop: 30,
  },
  description: {
    fontSize: 16,
    color: '#918D8F',
    marginBottom: 40,
    lineHeight: 22,
  },
  uploadOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1A1B',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 18,
    marginBottom: 15,
  },
  uploadOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allows content to take up available space
  },
  uploadIcon: {
    marginRight: 15,
  },
  uploadText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  uploadedThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginLeft: 'auto', // Pushes the thumbnail to the right
  },
  nextButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: '#FBB73A',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  nextButtonDisabled: {
    backgroundColor: 'rgba(251,183,58,0.5)',
  },
  nextButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});