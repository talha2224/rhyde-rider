import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
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


const Password = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleGoBack = () => {
        router.back();
    };

    const handleNext = () => {
        router.push('/signin');
    };

    return (
        <View style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />

            {/* Back Button */}
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.contentArea}>

                <Text style={styles.title}>What’s your phone number?</Text>
                <Text style={styles.description}>We’ll use your number and email to send ryde updates and receipts.</Text>

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

                <View style={styles.inputContainer}>
                    <MaterialCommunityIcons
                        name="lock-outline"
                        size={20}
                        color="#FFD329"
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#888"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={styles.passwordToggle}
                    >
                        <MaterialCommunityIcons
                            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color="#888"
                        />
                    </TouchableOpacity>
                </View>

            </View>

            <TouchableOpacity onPress={handleNext} style={[styles.nextButton, !password && styles.nextButtonDisabled]} disabled={!password} >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

        </View>
    );
}

export default Password;

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
