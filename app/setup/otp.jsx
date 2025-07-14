import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Keyboard,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import config from '../../config';

const Otp = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const [email, setUserEmail] = useState('');

    useEffect(() => {
        (async () => {
            const email = await AsyncStorage.getItem("email");
            setUserEmail(email);
        })();
    }, []);

    const sendOtp = async (email) => {
        try {
            await axios.post(`${config.baseUrl}/rider/send/otp`, { email });
            Toast.show({ type: 'success', text1: 'OTP sent to your email' });
        } catch (error) {
            console.error("OTP Send Error", error);
            Toast.show({ type: 'error', text1: 'Failed to send OTP' });
        }
    };

    const verifyOtp = async () => {
        const code = otp.join('');
        if (code.length !== 4) {
            Toast.show({ type: 'error', text1: 'Enter full 4-digit OTP' });
            return;
        }

        try {
            const response = await axios.post(`${config.baseUrl}/rider/verify/otp`, {
                email: email,
                otp: code
            });

            if (response.status === 200) {
                Toast.show({ type: 'success', text1: 'OTP Verified!' });
                router.push('/setup/upload');
            } else {
                Toast.show({ type: 'error', text1: response?.data?.msg || "Verification failed" });
            }
        } catch (error) {
            console.error("OTP Verify Error", error);
            Toast.show({
                type: 'error',
                text1: error?.response?.data?.msg || "Invalid OTP"
            });
        }
    };

    const handleOtpChange = (text, index) => {
        if (text.length > 1) text = text.charAt(0);
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        if (text !== '' && index < 3) inputRefs.current[index + 1]?.focus();
        if (index === 3 && text !== '') Keyboard.dismiss();
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    const isOtpComplete = otp.every(digit => digit !== '');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.contentArea}>
                <Text style={styles.title}>OTP Verification</Text>
                <Text style={styles.description}>
                    An OTP code has been sent to your registered email.
                </Text>

                <View style={styles.otpInputContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleOtpChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            caretHidden={true}
                        />
                    ))}
                </View>
                <TouchableOpacity onPress={() => sendOtp(email)} style={styles.resendOtpButton}>
                    <Text style={styles.resendOtpText}>Resend OTP</Text>
                </TouchableOpacity>
            </View>



            <TouchableOpacity
                onPress={verifyOtp}
                style={[styles.nextButton, !isOtpComplete && styles.nextButtonDisabled]}
                disabled={!isOtpComplete}
            >
                <Text style={styles.nextButtonText}>Verify</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Otp;

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
        backgroundColor: "#1C1A1B", // Darker background for the button
        borderRadius: 50, // Make it circular
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
        color: '#A19BAE',
        marginBottom: 40,
        lineHeight: 22,
    },
    emailLink: {
        color: '#fff'
    },
    otpInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40,
        width: '100%',
        gap: 20
    },
    otpInput: {
        width: 50,
        height: 55,
        backgroundColor: '#1C1A1B',
        borderRadius: 15,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 1, // Add border to differentiate empty vs filled
        borderColor: '#444', // Default border color
    },
    // Optional: style for a resend OTP button if you add one
    resendOtpButton: {
        alignSelf: 'center',
        marginTop: 20,
    },
    resendOtpText: {
        color: '#FBB73A',
        fontSize: 16,
        fontWeight: '600',
    },
    nextButton: {
        width: '100%',
        paddingVertical: 18,
        backgroundColor: '#FBB73A', // Matches the image's button color
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
        backgroundColor: 'rgba(251,183,58,0.5)', // Lighter yellow when disabled
    },
    nextButtonText: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
    },
});