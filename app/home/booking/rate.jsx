import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import config from '../../../config';

const Rate = () => {
    const params = useLocalSearchParams();
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null);

    const handleSubmitRating = async () => {
        if (!rating) {
            ToastAndroid.show("Please provide a rating", ToastAndroid.SHORT);
            return;
        }

        try {
            const res = await axios.post(`${config.baseUrl}/review`, {
                bookingId:bookingDetails?._id,
                driverId: bookingDetails?.driverId?._id,
                stars:rating,
                message:feedback,
            });
            ToastAndroid.show("Review submitted successfully", ToastAndroid.SHORT);
            router.push({pathname:"/home/booking/tip",params:{bookingData:JSON.stringify(bookingDetails)}});
        } catch (error) {
            console.error("Submit review error:", error);
            ToastAndroid.show("Failed to submit review", ToastAndroid.SHORT);
        }
    };

    useEffect(() => {
        if (params?.bookingData) {
            const bookingData = JSON.parse(params?.bookingData);
            setBookingDetails(bookingData)
        }
        else {
            ToastAndroid.show("No booking rydes", ToastAndroid.SHORT);
            router.back();
        }
    }, []);

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
                        Share your experience to help us maintain high- {'\n'}quality rydes and reward great drivers.
                    </Text>

                    <View style={styles.driverInfoContainer}>
                        <Image source={{ uri: bookingDetails?.driverId?.profile_img }} style={styles.driverAvatar} />
                        <Text style={styles.driverName}>{bookingDetails?.driverId?.name}</Text>
                        <Text style={styles.driverLocation}>{bookingDetails?.dropOffAddress}</Text>
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
        borderWidth: 1,
        borderColor: "#252222",
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
