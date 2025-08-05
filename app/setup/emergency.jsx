import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import config from '../../config';

const Emergency = () => {
    const [fullName2, setFullName2] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleGoBack = () => {
        router.back();
    };

    const handleNext = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const fullName = await AsyncStorage.getItem('fullName');
            const phone = await AsyncStorage.getItem('phone');
            const paymentMethod = await AsyncStorage.getItem('paymentMethod');

            const profileImageStr = await AsyncStorage.getItem('profileImage');
            const idImageStr = await AsyncStorage.getItem('idImage');

            const profileImage = JSON.parse(profileImageStr);
            const idImage = JSON.parse(idImageStr);

            if (!profileImage || !idImage || !paymentMethod || !userId) {
                Alert.alert('Error', 'Missing data from previous steps.');
                return;
            }
            Toast.show({
                type: 'info',
                text1: 'Uploading...',
                text2: 'Please wait while we complete your profile.',
                autoHide: false,
            });

            const formData = new FormData();
            formData.append('name', fullName);
            formData.append('phone_number', phone);
            formData.append('payment_method', paymentMethod);

            formData.append('profile', {
                uri: profileImage.uri,
                name: profileImage.fileName || 'profile.jpg',
                type: profileImage.mimeType || 'image/jpeg',
            });

            formData.append('id_card', {
                uri: idImage.uri,
                name: idImage.fileName || 'id.jpg',
                type: idImage.mimeType || 'image/jpeg',
            });

            const response = await axios.put(
                `${config.baseUrl}/rider/update/${userId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Hide loading toast manually
            Toast.hide();

            if (response.status === 200) {
                // Clear all AsyncStorage keys except userId
                const keys = await AsyncStorage.getAllKeys();
                const keysToRemove = keys.filter((key) => key !== 'userId');
                await AsyncStorage.multiRemove(keysToRemove);

                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Profile completed successfully!',
                });

                router.push("/home");
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response.data?.msg || 'Something went wrong.',
                });
            }
        } catch (err) {
            console.error(err);
            Toast.hide();
            Toast.show({
                type: 'error',
                text1: 'Upload Failed',
                text2: 'Something went wrong while uploading data.',
            });
        }
    };



    return (
        <View style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

            {/* Back Button */}
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.contentArea}>

                <Text style={styles.title}>Who should we alert in an emergency?</Text>
                <Text style={styles.description}>Add trusted contacts we can notify instantly in case of an emergency.</Text>

                <View style={[styles.inputContainer, { marginBottom: 15 }]}>
                    <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#fff" keyboardType="default" value={fullName2} onChangeText={setFullName2} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Phone number" placeholderTextColor="#fff" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />
                </View>

            </View>

            <TouchableOpacity onPress={handleNext} style={[styles.nextButton, !fullName2 && styles.nextButtonDisabled]} disabled={!fullName2} >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Emergency

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
        marginTop: 40
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
        color: '#A19BAE',
        marginBottom: 40,
        lineHeight: 22,
    },
    inputContainer: {
        backgroundColor: '#1C1A1B',
        borderRadius: 15,
        paddingHorizontal: 15,
        width: '100%',
        height: 55,
        justifyContent: 'center',
    },
    input: {
        color: 'white',
        fontSize: 16,
        flex: 1,
    },
    nextButton: {
        width: '100%',
        paddingVertical: 18,
        backgroundColor: '#FBB73A',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    nextButtonDisabled: {
        backgroundColor: 'rgba(255,215,0,0.5)',
    },
    nextButtonText: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
