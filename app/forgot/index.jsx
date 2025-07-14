import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Toast from 'react-native-toast-message';
import config from '../../config';


const Phone = () => {
    const [email, setEmail] = useState('');

    const handleGoBack = () => {
        router.back();
    };

    const handleNext = async () => {
        try {
            Toast.show({
                type: 'info',
                text1: 'Sending OTP...',
                autoHide: false,
            });

            const response = await axios.post(`${config.baseUrl}/rider/send/otp`, {
                email: email.trim(),
            });

            Toast.hide();

            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'OTP sent to your email.',
                });

                router.push({
                    pathname: '/forgot/otp',
                    params: { email }, // pass email to next screen
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed',
                    text2: response.data?.msg || 'Something went wrong.',
                });
            }
        } catch (error) {
            Toast.hide();
            if (error.response?.data?.msg) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: error.response.data.msg,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Network Error',
                    text2: 'Please try again.',
                });
            }
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

                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.description}>Enter your email to receive a link and securely reset your password.</Text>

                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons
                        name="email-outline"
                        size={20}
                        color="#FFD329"
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

            </View>

            <TouchableOpacity onPress={handleNext} style={[styles.nextButton, !email && styles.nextButtonDisabled]} disabled={!email} >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Phone

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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 15,
        marginBottom: 15,
        paddingHorizontal: 15,
        width: '100%',
        height: 55,
    },
    input: {
        color: 'white',
        fontSize: 16,
        flex: 1,
    },
    inputIcon: {
        marginRight: 10,
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
        backgroundColor: 'rgba(255,215,0,0.5)',
    },
    nextButtonText: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
