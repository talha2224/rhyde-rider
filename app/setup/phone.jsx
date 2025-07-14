import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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


const Phone = () => {
    const [phone, setPhone] = useState('');
    const handleGoBack = () => {
        router.back();
    };

    const handleNext = async () => {
        try {
            await AsyncStorage.setItem('phone', phone);
            router.push('/setup/otp');
        } catch (error) {
            console.log("Error saving phone number:", error);
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

                <Text style={styles.title}>What’s your phone number?</Text>
                <Text style={styles.description}>We’ll use your number and email to send ryde updates and receipts.</Text>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder="Phone number" placeholderTextColor="#fff" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
                </View>

            </View>

            <TouchableOpacity onPress={handleNext} style={[styles.nextButton, !phone && styles.nextButtonDisabled]} disabled={!phone} >
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
