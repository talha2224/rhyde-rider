import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import driverProfile from '../../../assets/images/bookings/driver.png'; // Assuming this path is correct

const Rate = () => {
    const [rating, setRating] = useState(0); // State for star rating
    const [feedback, setFeedback] = useState(''); // State for feedback text

    const driverDetails = {
        name: 'Wilson Ezekiel',
        location: 'Illinois, United States',
    };

    const handleSubmitRating = () => {
        console.log('Rating:', rating);
        console.log('Feedback:', feedback);
        router.push("/home/booking/tip"); // Or navigate to a confirmation screen
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rate driver</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.content}>
                    <Text style={styles.mainTitle}>Rate your driver</Text>
                    <Text style={styles.description}>
                        Share your experience to help us maintain high- {'\n'}quality rides and reward great drivers.
                    </Text>

                    <View style={styles.driverInfoContainer}>
                        <Image source={driverProfile} style={styles.driverAvatar} />
                        <Text style={styles.driverName}>{driverDetails.name}</Text>
                        <Text style={styles.driverLocation}>{driverDetails.location}</Text>
                    </View>

                    <View style={styles.starRatingContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                <AntDesign
                                    name={star <= rating ? 'star' : 'staro'}
                                    size={40}
                                    color="#FFD700" // Gold color
                                    style={styles.starIcon}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TextInput
                        style={styles.feedbackInput}
                        placeholder="Write your feedback (Optional)"
                        placeholderTextColor="#AAA"
                        multiline
                        numberOfLines={4}
                        value={feedback}
                        onChangeText={setFeedback}
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmitRating}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181617', // Dark background
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
        alignItems: 'center',
    },
    content: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#1C1A1B',
        borderRadius: 20,
        padding: 20,
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: '#AAA',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
    },
    driverInfoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    driverAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    driverName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 5,
    },
    driverLocation: {
        fontSize: 14,
        color: '#AAA',
    },
    starRatingContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    starIcon: {
        marginHorizontal: 5,
    },
    feedbackInput: {
        backgroundColor: '#1C1A1B',
        borderRadius: 10,
        padding: 15,
        color: '#FFF',
        fontSize: 17,
        height: 120,
        textAlignVertical: 'top',
        width: '100%',
        marginBottom: 30,
        borderWidth:1,
        borderColor:"#252222",
    },
    submitButton: {
        backgroundColor: '#FFD700', // Gold color
        borderRadius: 15,
        paddingVertical: 18,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#1C1A1B',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Rate;
