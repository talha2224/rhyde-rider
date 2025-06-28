import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';

const AddAddress = () => {
    const [address, setAddress] = useState('');
    const [locationName, setLocationName] = useState('');

    const handleSaveAddress = () => {
        ToastAndroid.show(`Address Saved`,ToastAndroid.SHORT)
        router.back();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add address</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.instructionText}>
                    Enter the address of the place you'd like to save for future use
                </Text>

                <View style={styles.inputSection}>
                    <View style={styles.inputRow}>
                        <MaterialCommunityIcons name="map-marker-outline" size={24} color="#FFD700" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Address"
                            placeholderTextColor="#AAA"
                            value={address}
                            onChangeText={setAddress}
                        />
                        <TouchableOpacity style={styles.targetButton}>
                            <MaterialCommunityIcons name="target" size={24} color="#FFD700" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputRow}>
                        <MaterialCommunityIcons name="tag-outline" size={24} color="#FFD700" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Name of location"
                            placeholderTextColor="#AAA"
                            value={locationName}
                            onChangeText={setLocationName}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1A1B', // Dark background
        paddingTop: 70, // Adjust for status bar
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    instructionText: {
        fontSize: 14,
        color: '#AAA',
        marginBottom: 30,
        lineHeight: 20,
    },
    inputSection: {
        borderRadius: 15,
        marginBottom: 30,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#2A2A2A',
        borderRadius: 10
    },
    textInput: {
        flex: 1,
        color: '#FFF',
        fontSize: 16,
        marginLeft: 10,
    },
    targetButton: {
        padding: 5,
    },
    saveButton: {
        backgroundColor: '#FFD700', // Gold color
        borderRadius: 15,
        paddingVertical: 18,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#1C1A1B',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddAddress;
