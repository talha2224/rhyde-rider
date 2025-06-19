import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

const Upload = () => {

  const [profileImageUri, setProfileImageUri] = useState(null);
  const [idImageUri, setIdImageUri] = useState(null);

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'Sorry, we need camera roll permissions to make this work!',
          [{ text: 'OK' }]
        );
        return false;
      }
      return true;
    }
    return true;
  };

  const requestMediaLibraryPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission required',
          'Sorry, we need media library permissions to make this work!',
          [{ text: 'OK' }]
        );
        return false;
      }
      return true;
    }
    return true;
  };

  const pickImage = async (setImageUri) => {
    const hasCameraPermission = await requestCameraPermission();
    const hasMediaLibraryPermission = await requestMediaLibraryPermission();

    if (!hasCameraPermission || !hasMediaLibraryPermission) {
      return;
    }

    Alert.alert(
      "Select Image",
      "Choose an option to upload your image",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
              setImageUri(result.assets[0].uri);
            }
          },
        },
        {
          text: "Choose from Gallery",
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
              setImageUri(result.assets[0].uri);
            }
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleNext = () => {
    if (!profileImageUri) {
      Alert.alert('Missing Profile Picture', 'Please upload a profile picture to continue.');
      return;
    }
    if (!idImageUri) {
      Alert.alert('Missing Valid ID', 'Please upload a valid ID to continue.');
      return;
    }
    console.log('Profile Picture URI:', profileImageUri);
    console.log('Valid ID URI:', idImageUri);
    router.push('/setup/payment');
  };

  const isNextButtonEnabled = profileImageUri && idImageUri;

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

        {/* Profile Picture Upload Section */}
        <TouchableOpacity
          style={styles.uploadOptionButton}
          onPress={() => pickImage(setProfileImageUri)}
        >
          <View style={styles.uploadOptionContent}>
            <FontAwesome5 name="camera-retro" size={20} color="white" style={styles.uploadIcon} />
            <Text style={styles.uploadText}>Profile picture</Text>
            {profileImageUri && (
              <Image source={{ uri: profileImageUri }} style={styles.uploadedThumbnail} />
            )}
          </View>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>

        {/* Valid ID Upload Section */}
        <TouchableOpacity
          style={styles.uploadOptionButton}
          onPress={() => pickImage(setIdImageUri)}
        >
          <View style={styles.uploadOptionContent}>
            <FontAwesome5 name="id-card-alt" size={20} color="white" style={styles.uploadIcon} />
            <Text style={styles.uploadText}>Valid ID</Text>
            {idImageUri && (
              <Image source={{ uri: idImageUri }} style={styles.uploadedThumbnail} />
            )}
          </View>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Next Button */}
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