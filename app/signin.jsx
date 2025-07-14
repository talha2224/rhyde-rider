import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import logo from "../assets/images/logo.png";
import loginBg from "../assets/images/onboarding/1.png";
import config from '../config';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async () => {
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Missing fields',
                text2: 'Please enter both email and password.',
            });
            return;
        }

        try {
            Toast.show({
                type: 'info',
                text1: 'Logging in...',
                text2: 'Please wait.',
                autoHide: false, // prevent auto-dismiss
            });

            const response = await axios.post(`${config.baseUrl}/rider/login`, {
                email,
                password,
            });

            Toast.hide(); // Hide loading toast

            if (response.status === 200 && response.data?.data?._id) {
                await AsyncStorage.setItem('userId', response.data.data._id);

                Toast.show({
                    type: 'success',
                    text1: 'Login Successful',
                    text2: 'Welcome back!',
                });

                router.push('/home');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Login Failed',
                    text2: response.data?.msg || 'Unexpected error occurred.',
                });
            }
        } catch (error) {
            Toast.hide();

            if (error.response) {
                const code = error.response.data?.code;
                const msg = error.response.data?.msg;

                if (code === 401) {
                    Toast.show({
                        type: 'error',
                        text1: 'Account Not Verified',
                        text2: msg || 'Verification pending. Check your email.',
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Login Error',
                        text2: msg || 'Invalid email or password.',
                    });
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Network Error',
                    text2: 'Please check your internet connection.',
                });
            }
        }
    };


    const handleForgotPassword = () => {
        router.push("/forgot");
    };

    const handleSignUp = () => {
        router.push("/signup");
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.inner}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={20} color="white" />
                    </TouchableOpacity>

                    <Image source={loginBg} style={styles.backgroundImage} resizeMode="cover" />
                    <Image source={logo} style={styles.logo} />

                    <View style={styles.contentArea}>
                        <Text style={styles.welcomeText}>Welcome Back</Text>
                        <Text style={styles.descriptionText}>
                            Sign in to continue your smooth and secure ryde experience
                        </Text>

                        {/* Email Input */}
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

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons
                                name="lock-outline"
                                size={20}
                                color="#FFD329"
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#888"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.passwordToggle}
                            >
                                <MaterialCommunityIcons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
                            <Text style={styles.signInButtonText}>Sign in</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
                            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                        </TouchableOpacity>

                        <View style={styles.signUpContainer}>
                            <Text style={styles.signUpText}>Don't have an account?</Text>
                            <TouchableOpacity onPress={handleSignUp}>
                                <Text style={styles.signUpLink}> Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
export default Signin;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: -100,
    },
    backButton: {
        borderRadius: 20,
        padding: 8,
        width: 40,
        height: 40,
        marginTop: 50,
        justifyContent: "center",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#221E43",
        zIndex: 100,
    },
    logo: {
        position: 'absolute',
        top: 70,
        right: 180,
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    contentArea: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 25,
        backgroundColor: "#000",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        zIndex: 100,
        marginTop: 300,
        paddingBottom: 50,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        marginTop: 40,
    },
    descriptionText: {
        fontSize: 15,
        color: '#918D8F',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22,
        paddingHorizontal: 10,
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
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    },
    passwordToggle: {
        padding: 5,
    },
    signInButton: {
        width: '100%',
        paddingVertical: 18,
        backgroundColor: '#FBB73A',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    signInButtonText: {
        color: '#333',
        fontSize: 18,
    },
    forgotPasswordButton: {
        marginTop: 20,
    },
    forgotPasswordText: {
        color: '#fff',
    },
    signUpContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signUpText: {
        color: '#918D8F',
        fontSize: 14,
    },
    signUpLink: {
        color: '#fff',
        fontSize: 14,
    },
});