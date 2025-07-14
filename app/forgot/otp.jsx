import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router'; // Assuming expo-router is correctly set up
import { useRef, useState } from 'react'; // Import useRef
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
    const { email } = useLocalSearchParams();
    const inputRefs = useRef([]);

    const handleOtpChange = (text, index) => {
        if (text.length > 1) {
            text = text.charAt(0);
        }

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        if (text !== '' && index < 3) {
            inputRefs.current[index + 1].focus();
        }
        if (index === 3 && text !== '') {
            Keyboard.dismiss();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    const handleNext = async () => {
        const fullOtp = otp.join('');

        try {
            Toast.show({
                type: 'info',
                text1: 'Verifying...',
                autoHide: false,
            });

            const response = await axios.post(`${config.baseUrl}/rider/verify/otp`, {
                email,
                otp: fullOtp,
            });

            Toast.hide();

            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Verified',
                    text2: 'OTP verified successfully!',
                });

                router.push({
                    pathname: '/forgot/password',
                    params: { email }, // pass to reset screen
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Verification Failed',
                    text2: response.data?.msg || 'Invalid OTP',
                });
            }
        } catch (error) {
            Toast.hide();
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error?.response?.data?.msg || 'Something went wrong',
            });
        }
    };
    const isOtpComplete = otp.every(digit => digit !== '');

    const handleResendOtp = async () => {
        try {
            Toast.show({
                type: 'info',
                text1: 'Resending...',
                autoHide: false,
            });

            const response = await axios.post(`${config.baseUrl}/rider/send/otp`, { email });

            Toast.hide();

            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'OTP Sent',
                    text2: 'New OTP sent to your email',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed',
                    text2: response.data?.msg || 'Try again later',
                });
            }
        } catch (error) {
            Toast.hide();
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error?.response?.data?.msg || 'Something went wrong',
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
                <Text style={styles.title}>OTP Verification</Text>
                <Text style={styles.description}>
                    An OTP code will be sent to your phone number or{' '}
                    <Text style={styles.emailLink}>use Email instead</Text>
                </Text>

                {/* OTP Input Fields */}
                <View style={styles.otpInputContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            keyboardType="number-pad"
                            maxLength={1}
                            onChangeText={(text) => handleOtpChange(text, index)}
                            value={digit}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            caretHidden={true} // Hide cursor
                        />
                    ))}
                </View>

                {/* Resend OTP / Timer (Optional - not in image, but common for OTP) */}

                <TouchableOpacity onPress={handleResendOtp} style={styles.resendOtpButton}>
                    <Text style={{ color: "#8C849C" }}>Didn’t receive code? </Text>
                    <Text style={styles.resendOtpText}>Resend OTP</Text>
                </TouchableOpacity>

            </View>

            {/* Next Button */}
            <TouchableOpacity
                onPress={handleNext}
                style={[styles.nextButton, !isOtpComplete && styles.nextButtonDisabled]}
                disabled={!isOtpComplete}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

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
        marginTop: 20,
        flexDirection: "row",
        gap: 6
    },
    resendOtpText: {
        color: '#FBB73A',
        fontSize: 16,
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

export default Otp;