import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import carImg from '../../assets/images/home/car.png';
import { getRandomDarkColor } from '../../hooks/generateColor';

const Rhydes = () => {
    const rydesData = [
        {
            id: '1',
            name: 'XL Intercity',
            distance: '10 Mins away',
            reviews: 120,
            price: '$34.60',
            color: getRandomDarkColor(),
        },
        {
            id: '2',
            name: 'Compact SUV',
            distance: '10 Mins away',
            reviews: 120,
            price: '$34.60',
            color: getRandomDarkColor(),
        },
        {
            id: '3',
            name: 'Full-Size SUV',
            distance: '10 Mins away',
            reviews: 120,
            price: '$34.60',
            color: getRandomDarkColor(),
        },
        {
            id: '4',
            name: 'Sport Car',
            distance: '10 Mins away',
            reviews: 120,
            price: '$34.60',
            color: getRandomDarkColor(),
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Choose rydes</Text>
            </View>

            {/* Rydes List */}
            <ScrollView style={styles.rydesList}>
                {rydesData.map((ryde) => (
                    <View key={ryde.id} style={[styles.rydeCard, { backgroundColor: ryde.color }]}>
                        <View style={styles.rydeCardContent}>
                            <Image source={carImg} style={styles.carImage} resizeMode="contain" />
                            <View style={styles.rydeDetails}>
                                <Text style={styles.rydeName}>{ryde.name}</Text>
                                <Text style={styles.rydeDistance}>{ryde.distance}</Text>
                                <View style={styles.ratingContainer}>
                                    {[...Array(5)].map((_, i) => (
                                        <AntDesign key={i} name={i < Math.floor(ryde.reviews / 100) ? "star" : "staro"} size={14} color="#FFD700" />
                                    ))}
                                    <Text style={styles.reviewCount}>({ryde.reviews} Review)</Text>
                                </View>
                                <Text style={styles.rydePrice}>{ryde.price}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => router.back()} style={styles.declineButton}>
                                <Text style={styles.declineButtonText}>Decline</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.back()} style={styles.acceptButton}>
                                <Text style={styles.acceptButtonText}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1A1B',
        paddingTop: 50,
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
    rydesList: {
        paddingHorizontal: 20,
        marginBottom:40
    },
    rydeCard: {
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    rydeCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    carImage: {
        width: 120,
        height: 80,
        marginRight: 15,
    },
    rydeDetails: {
        flex: 1,
    },
    rydeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    rydeDistance: {
        fontSize: 14,
        color: '#DDD',
        marginTop: 2,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    reviewCount: {
        fontSize: 12,
        color: '#DDD',
        marginLeft: 5,
    },
    rydePrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFD700', // Gold color
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    declineButton: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#fff"
    },
    declineButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    acceptButton: {
        flex: 1,
        backgroundColor: '#FFD700', // Gold color
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 10,
    },
    acceptButtonText: {
        color: '#1C1A1B',
        fontSize: 16,
    },
});

export default Rhydes;
