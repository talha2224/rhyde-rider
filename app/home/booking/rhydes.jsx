import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import driverProfile from "../../../assets/images/bookings/driver.png";
import carImg from '../../../assets/images/home/car.png';
import { driverDetails, rydesData } from '../../../constants/constant';

const { height } = Dimensions.get('window');


const SelectRhydes = () => {
    const [showDriverDetailsModal, setShowDriverDetailsModal] = useState(false);

    const CustomModal = ({ visible, onClose, children, title }) => (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{title}</Text>
                    </View>
                    <ScrollView style={styles.modalScrollView}>
                        {children}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>

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
                            <TouchableOpacity style={styles.declineButton}>
                                <Text style={styles.declineButtonText}>Decline</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.acceptButton}
                                onPress={() => setShowDriverDetailsModal(true)} // Open modal on Accept
                            >
                                <Text style={styles.acceptButtonText}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Driver Details Modal */}
            <CustomModal visible={showDriverDetailsModal} onClose={() => setShowDriverDetailsModal(false)} title="Driver details">
                <View style={styles.driverDetailsContainer}>
                    <Image source={driverProfile} style={styles.driverAvatar} />
                    <Text style={styles.driverName}>{driverDetails.name}</Text>
                    <Text style={styles.driverLocation}>{driverDetails.location}</Text>

                    <View style={styles.driverStatsContainer}>
                        <View style={styles.driverStatItem}>
                            <AntDesign name="star" size={20} color="#FFD700" />
                            <Text style={styles.driverStatValue}>{driverDetails.rating}</Text>
                            <Text style={styles.driverStatLabel}>Ratings</Text>
                        </View>
                        <View style={styles.driverStatItem}>
                            <AntDesign name="car" size={20} color="#FFD700" />
                            <Text style={styles.driverStatValue}>{driverDetails.rides}</Text>
                            <Text style={styles.driverStatLabel}>Trips</Text>
                        </View>
                        <View style={styles.driverStatItem}>
                            <AntDesign name="calendar" size={20} color="#FFD700" />
                            <Text style={styles.driverStatValue}>{driverDetails.yearsOfExp}</Text>
                            <Text style={styles.driverStatLabel}>Years of Exp</Text>
                        </View>
                        <View style={styles.driverStatItem}>
                            <AntDesign name="profile" size={20} color="#FFD700" />
                            <Text style={styles.driverStatValue}>{driverDetails.totalReviews}</Text>
                            <Text style={styles.driverStatLabel}>Reviews</Text>
                        </View>
                    </View>

                    <Text style={styles.carDetailsTitle}>Car Details</Text>

                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={{}}>

                        <View style={styles.carDetailsRow}>
                            <Text style={styles.carDetailsLabel}>Car Model</Text>
                            <Text style={styles.carDetailsValue}>{driverDetails.carModel}</Text>
                        </View>
                        <View style={styles.carDetailsRow}>
                            <Text style={styles.carDetailsLabel}>License number</Text>
                            <Text style={styles.carDetailsValue}>{driverDetails.licenseNumber}</Text>
                        </View>
                        <View style={styles.carDetailsRow}>
                            <Text style={styles.carDetailsLabel}>Seats</Text>
                            <Text style={styles.carDetailsValue}>{driverDetails.seats}</Text>
                        </View>
                        <View style={styles.carDetailsRow}>
                            <Text style={styles.carDetailsLabel}>Color</Text>
                            <Text style={styles.carDetailsValue}>{driverDetails.color}</Text>
                        </View>

                    </ScrollView>
                </View>
                <TouchableOpacity onPress={()=>{setShowDriverDetailsModal(false);router.push("/home/booking/activebooking")}} style={styles.modalAcceptButton}>
                    <Text style={styles.modalAcceptButtonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setShowDriverDetailsModal(false)}} style={styles.modalDeclineButton}>
                    <Text style={styles.modalDeclineButtonText}>Decline</Text>
                </TouchableOpacity>
            </CustomModal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1A1B',
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 40,
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
        marginBottom: 40,
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

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#181617',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: height * 0.8,
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        padding: 20,
    },
    modalBackButton: {},
    modalTitle: {
        fontSize: 20,
        color: '#FFF',
        marginTop: 15
    },
    modalScrollView: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },

    driverDetailsContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    driverAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    driverName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 5,
    },
    driverLocation: {
        fontSize: 14,
        color: '#AAA',
        marginBottom: 20,
    },
    driverStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 30,
    },
    driverStatItem: {
        alignItems: 'center',
        backgroundColor:"#1C1A1B",
        padding:10,
        borderRadius:10
    },
    driverStatValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: 5,
    },
    driverStatLabel: {
        fontSize: 12,
        color: '#AAA',
    },
    carDetailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 15,
    },
    carDetailsRow: {
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    carDetailsLabel: {
        fontSize: 16,
        color: '#AAA',
    },
    carDetailsValue: {
        fontSize: 16,
        color: '#FFF',
        marginTop:5
    },
    modalAcceptButton: {
        backgroundColor: '#FFD700',
        borderRadius: 15,
        paddingVertical: 18,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10,
    },
    modalAcceptButtonText: {
        color: '#1C1A1B',
        fontSize: 18,
    },
    modalDeclineButton: {
        backgroundColor: 'transparent',
        marginHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    modalDeclineButtonText: {
        color: '#AAA',
        fontSize: 16,
    },
});

export default SelectRhydes;