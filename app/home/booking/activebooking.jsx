import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Image, Linking, Modal, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import { BOOKING_STATES, driverDetails, priceConfirmationDetails, rideDetails } from '../../../constants/constant';
import { useSocket } from '../../../contexts/SocketContext';
import { darkMapStyle } from '../../../style/dark.map.style';

const { height } = Dimensions.get('window');

const ActiveBooking = () => {

    const { getSocket } = useSocket();
    const [currentBookingState, setCurrentBookingState] = useState(BOOKING_STATES.DRIVER_ARRIVED);
    const params = useLocalSearchParams();
    const [bookingDetails, setBookingDetails] = useState(null);

    // LOCATIONS 
    const [pickupLocation, setPickupLocation] = useState(null);
    const [dropOffLocation, setDropOffLocation] = useState(null);
    const [driverLocation, setDriverLocation] = useState(null)





    const [showAddStopModal, setShowAddStopModal] = useState(false);
    const [showPriceConfirmationModal, setShowPriceConfirmationModal] = useState(false);
    const [showStopAddedModal, setShowStopAddedModal] = useState(false);
    const [showRydeCompletedModal, setShowRydeCompletedModal] = useState(false);


    const handleCallPress = () => {
        const phoneNumber = `tel:${bookingDetails?.driverId?.phone_number}`;
        Linking.openURL(phoneNumber).catch(err => console.error('Failed to open dialer:', err));
    };




    const BookingHeader = ({ title, showSave = false, showShare = false }) => (
        <View style={styles.header}>
            {/* <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <AntDesign name="arrowleft" size={24} color="#FFF" />
            </TouchableOpacity> */}
            <Text style={styles.headerTitle}>Ride Inprogress</Text>
            <View style={styles.headerIcons}>
                {showSave && (
                    <TouchableOpacity style={styles.headerIcon}>
                        <AntDesign name="pluscircleo" size={24} color="#FFF" />
                    </TouchableOpacity>
                )}
                {showShare && (
                    <TouchableOpacity style={styles.headerIcon}>
                        <Ionicons name="share-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    const renderAwaitingDriver = () => (
        <View style={styles.bottomSheet}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <Text style={styles.sheetTitle}>Driver is arriving</Text>
                <Text style={styles.arrivalTime}>{driverDetails.arrivalTime}</Text>
            </View>
            <View style={styles.driverInfo}>
                <Image source={{ uri: bookingDetails?.driverId?.profile_img }} style={styles.driverAvatar} />
                <View style={styles.driverTextDetails}>
                    <Text style={styles.driverName}>{bookingDetails?.driverId?.name}</Text>
                    <View style={styles.driverRating}>
                        <AntDesign name="star" size={14} color="#FFD700" />
                        <Text style={styles.driverRatingText}>{driverDetails.rating} ({driverDetails.rides} rides)</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => { router.push("/home/chat") }} style={styles.contactButton}>
                    <Ionicons name="chatbubble-outline" size={24} color="#FFD700" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactButton}>
                    <Ionicons name="call-outline" size={24} color="#FFD700" />
                </TouchableOpacity>
            </View>
            <Text style={{ color: "#fff", fontSize: 19, fontWeight: "600", marginBottom: 15 }}>Car Details</Text>
            <View style={styles.carDetailsContainer}>
                <View>
                    <Text style={styles.carDetailLabel}>Car Model</Text>
                    <Text style={styles.carDetailValue}>{bookingDetails?.driverId?.model}</Text>
                </View>
                <View>
                    <Text style={styles.carDetailLabel}>License number</Text>
                    <Text style={styles.carDetailValue}>{bookingDetails?.driverId?.license_plate_number}</Text>
                </View>
                <View>
                    <Text style={styles.carDetailLabel}>Seats</Text>
                    <Text style={styles.carDetailValue}>{4}</Text>
                </View>
                <View>
                    <Text style={styles.carDetailLabel}>Color</Text>
                    <Text style={styles.carDetailValue}>{bookingDetails?.driverId?.color}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/home/booking/cancelled")}>
                <Text style={styles.actionButtonText}>Cancel ryde</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { borderWidth: 1, borderColor: "#FFD700", backgroundColor: "transparent" }]} onPress={() => setCurrentBookingState(BOOKING_STATES.DRIVER_ARRIVED)}>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Next</Text>
            </TouchableOpacity>
        </View>
    );


    const renderDriverArrived = () => (
        <View style={styles.bottomSheet}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <Text style={styles.sheetTitle}>Driver arrived</Text>
            </View>
            <View style={styles.driverInfo}>
                <Image source={{ uri: bookingDetails?.driverId?.profile_img }} style={styles.driverAvatar} />
                <View style={styles.driverTextDetails}>
                    <Text style={styles.driverName}>{bookingDetails?.driverId?.name}</Text>
                    <View style={styles.driverRating}>
                        <AntDesign name="star" size={14} color="#FFD700" />
                        <Text style={styles.driverRatingText}>{driverDetails.rating} ({driverDetails.rides} rides)</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => { router.push("/home/chat") }} style={styles.contactButton}>
                    <Ionicons name="chatbubble-outline" size={24} color="#FFD700" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCallPress} style={styles.contactButton}>
                    <Ionicons name="call-outline" size={24} color="#FFD700" />
                </TouchableOpacity>
            </View>
            <Text style={{ color: "#fff", fontSize: 19, fontWeight: "600", marginBottom: 15 }}>Car Details</Text>

            <View style={styles.carDetailsContainer}>
                <View>
                    <Text style={styles.carDetailLabel}>Car Model</Text>
                    <Text style={styles.carDetailValue}>{bookingDetails?.driverId?.model}</Text>
                </View>
                <View>
                    <Text style={styles.carDetailLabel}>License number</Text>
                    <Text style={styles.carDetailValue}>{bookingDetails?.driverId?.license_plate_number}</Text>
                </View>
                <View>
                    <Text style={styles.carDetailLabel}>Seats</Text>
                    <Text style={styles.carDetailValue}>{4}</Text>
                </View>
                <View>
                    <Text style={styles.carDetailLabel}>Color</Text>
                    <Text style={styles.carDetailValue}>{bookingDetails?.driverId?.color}</Text>
                </View>
            </View>

            {/* <TouchableOpacity style={styles.actionButton} onPress={() => setCurrentBookingState(BOOKING_STATES.LIVE_TRACKING)}>
                <Text style={styles.actionButtonText}>Complete Trip</Text>
            </TouchableOpacity> */}
        </View>
    );

    const renderLiveTracking = () => (
        <View style={styles.bottomSheet}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <Text style={styles.sheetTitle}>Active ryde</Text>
                <Text style={styles.arrivalTime}>{driverDetails.arrivalTime}</Text>
            </View>
            <View style={styles.rideLocationDetails}>
                <View style={styles.locationRow}>
                    <MaterialCommunityIcons name="target" size={20} color="#FFD700" />
                    <Text style={styles.locationText}>{rideDetails.pickup}</Text>
                </View>
                <View style={styles.locationRow}>
                    <MaterialCommunityIcons name="map-marker" size={20} color="#FFF" />
                    <Text style={styles.locationText}>{rideDetails.destination}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={() => setShowAddStopModal(true)}>
                <Text style={styles.actionButtonText}>Add stop</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.secondaryActionButton}
                onPress={() => setShowRydeCompletedModal(true)} // Simulate ryde completion
            >
                <Text style={styles.secondaryActionButtonText}>Complete trip</Text>
            </TouchableOpacity>
        </View>
    );

    // --- Modals ---

    const renderAddStopModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showAddStopModal}
            onRequestClose={() => setShowAddStopModal(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold", textAlign: "center" }}>Add Stop</Text>
                    <ScrollView style={styles.modalScrollView}>
                        <View style={styles.locationInputSectionModal}>
                            <View style={styles.inputRow}>
                                <MaterialCommunityIcons name="target" size={20} color="#FFD700" />
                                <TextInput
                                    style={styles.textInput}
                                    value={rideDetails.pickup}
                                    editable={false}
                                    placeholderTextColor="#AAA"
                                />
                            </View>
                            <View style={styles.inputRow}>
                                <MaterialCommunityIcons name="map-marker" size={20} color="#FFF" />
                                <TextInput
                                    style={styles.textInput}
                                    value={rideDetails.destination} // This would be the new stop input
                                    placeholder="Enter new stop"
                                    placeholderTextColor="#AAA"
                                />
                            </View>
                            <TouchableOpacity onPress={() => router.push("/home/savedplaces")} style={styles.savedPlacesButton}>
                                <MaterialCommunityIcons name="send" size={20} color="#FFD700" />
                                <Text style={styles.savedPlacesText}>Saved places</Text>
                                <AntDesign name="right" size={16} color="#AAA" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.modalActionButton} onPress={() => { setShowAddStopModal(false); setShowPriceConfirmationModal(true); }}>
                            <Text style={styles.modalActionButtonText}>Add stop</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalSecondaryActionButton} onPress={() => setShowAddStopModal(false)}>
                            <Text style={styles.modalSecondaryActionButtonText}>Cancel stop</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

    const renderPriceConfirmationModal = () => (
        <Modal animationType="slide" transparent={true} visible={showPriceConfirmationModal} onRequestClose={() => setShowPriceConfirmationModal(false)}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.priceConfirmationHeader}>
                        <Text style={styles.priceConfirmationTitle}>Price confirmation</Text>
                    </View>
                    <View style={styles.priceDetailsContainer}>
                        <View style={styles.priceDetailRow}>
                            <Text style={styles.priceDetailLabel}>Estimated time</Text>
                            <Text style={styles.priceDetailValue}>{priceConfirmationDetails.estimatedTime}</Text>
                        </View>
                        <View style={styles.priceDetailRow}>
                            <Text style={styles.priceDetailLabel}>Additional fare</Text>
                            <Text style={styles.priceDetailValue}>{priceConfirmationDetails.additionalFare}</Text>
                        </View>
                        <View style={styles.priceDetailRow}>
                            <Text style={styles.priceDetailLabel}>Total fare</Text>
                            <Text style={styles.priceDetailValue}>{priceConfirmationDetails.totalFare}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.modalActionButton}
                        onPress={() => {
                            setShowPriceConfirmationModal(false);
                            setShowStopAddedModal(true); // Go to stop added confirmation
                        }}
                    >
                        <Text style={styles.modalActionButtonText}>Confirm stop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalSecondaryActionButton}
                        onPress={() => setShowPriceConfirmationModal(false)}
                    >
                        <Text style={styles.modalSecondaryActionButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const renderStopAddedModal = () => (
        <Modal animationType="fade" transparent={true} visible={showStopAddedModal} onRequestClose={() => setShowStopAddedModal(false)}>
            <View style={styles.centerModalOverlay}>
                <View style={styles.centerModalContent}>
                    <MaterialCommunityIcons name="wallet-outline" size={60} color="#FFD700" style={styles.centerModalIcon} />
                    <Text style={styles.centerModalTitle}>Stop has been added</Text>
                    <Text style={styles.centerModalDescription}>Your additional stop has been confirmed. {'\n'}Your driver will adjust the route accordingly.</Text>
                    <TouchableOpacity style={styles.centerModalButton} onPress={() => { setShowStopAddedModal(false); }}>
                        <Text style={styles.centerModalButtonText}>Okay, Got it!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const renderRydeCompletedModal = () => (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showRydeCompletedModal}
            onRequestClose={() => setShowRydeCompletedModal(false)}
        >
            <View style={styles.centerModalOverlay}>
                <View style={styles.centerModalContent}>
                    <MaterialCommunityIcons name="wallet-outline" size={60} color="#FFD700" style={styles.centerModalIcon} />
                    <Text style={styles.centerModalTitle}>Ryde Completed</Text>
                    <Text style={styles.centerModalDescription}>
                        We hope you had a smooth journey. Let us {'\n'}know how your driver did!
                    </Text>
                    <TouchableOpacity style={styles.centerModalButton} onPress={() => { setShowRydeCompletedModal(false); router.push({pathname:"/home/booking/rate",params:{bookingData:JSON.stringify(bookingDetails)}}) }}>
                        <Text style={styles.centerModalButtonText}>Rate driver</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );


    // PARAMS 
    useEffect(() => {
        if (params?.bookingData) {
            const bookingData = JSON.parse(params?.bookingData);
            setPickupLocation(bookingData?.pickupCoordinates)
            setDropOffLocation(bookingData?.dropOffCoordinates)
            setDriverLocation(bookingData?.dropOffCoordinates)
            setBookingDetails(bookingData)
        }
        else {
            ToastAndroid.show("No booking rydes", ToastAndroid.SHORT);
            router.back();
        }
    }, []);

    // SOCKET EVENTS FOR RIDE STATUS AND DRIVER UPDATED LOCATION
    useEffect(() => {
        const socket = getSocket();
        if (!socket) return;

        socket.on("rideCompleted", (booking) => {
            Toast.show({
                type: "success",
                text1: "Ride completed",
                text2: "Thanks for chosing rhyde",
            });
            setTimeout(() => {
                setShowRydeCompletedModal(true)
            }, 2000);
        });

        socket.on("driverLocationUpdate", (data) => {
            console.log("driver location via socket:", data);
            setDriverLocation(data);
        });

        return () => {
            socket.off("rideCompleted");
            socket.off("bookingCancelled");
        };
    }, [getSocket]);


    return (
        <View style={styles.fullScreenContainer}>
            {/* Dynamic Header */}
            {currentBookingState === BOOKING_STATES.AWAITING_DRIVER && <BookingHeader title="Awaiting driver" showSave={true} showShare={true} />}
            {currentBookingState === BOOKING_STATES.DRIVER_ARRIVED && <BookingHeader title="Awaiting driver" showSave={true} showShare={true} />}
            {currentBookingState === BOOKING_STATES.LIVE_TRACKING && <BookingHeader title="Live tracking" showShare={true} />}

            {/* Map Section - always visible */}

            {
                pickupLocation && dropOffLocation && driverLocation ? (
                    <MapView
                        style={styles.mapContainer}
                        initialRegion={{
                            latitude: pickupLocation?.latitude || 0,
                            longitude: pickupLocation?.longitude || 0,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                        showsUserLocation
                        showsMyLocationButton={false}
                        customMapStyle={darkMapStyle}
                    >
                        {/* 📍 User Pickup Location */}
                        <Marker coordinate={pickupLocation}>
                            <MaterialCommunityIcons name="map-marker" size={30} color="gold" />
                        </Marker>

                        {/* 🚘 Driver Location */}
                        <Marker coordinate={driverLocation}>
                            <MaterialCommunityIcons name="car" size={26} color="gold" />
                        </Marker>

                        {/* 🎯 Drop-off Location */}
                        <Marker coordinate={dropOffLocation}>
                            <MaterialCommunityIcons name="flag-checkered" size={26} color="gold" />
                        </Marker>

                        {/* 🛣️ Polyline: Driver → Pickup → Drop-off */}
                        <Polyline
                            coordinates={[
                                driverLocation,
                                pickupLocation,
                                dropOffLocation
                            ]}
                            strokeColor="gold" // Line color
                            strokeWidth={1}     // Line thickness
                        />
                    </MapView>
                ) : (
                    <Text>Loading Map</Text>
                )
            }



            {/* Conditionally rendered bottom sheets based on state */}
            {currentBookingState === BOOKING_STATES.AWAITING_DRIVER && renderAwaitingDriver()}
            {currentBookingState === BOOKING_STATES.DRIVER_ARRIVED && renderDriverArrived()}
            {currentBookingState === BOOKING_STATES.LIVE_TRACKING && renderLiveTracking()}

            {/* Modals that can appear on top */}
            {renderAddStopModal()}
            {renderPriceConfirmationModal()}
            {renderStopAddedModal()}
            {renderRydeCompletedModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#1C1A1B',
        paddingTop: 70
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    backButton: {
        paddingRight: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        flex: 1, // Allow title to take available space
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 15,
    },
    headerIcon: {
    },
    mapContainer: {
        flex: 1,
        borderRadius: 15,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    driverOnMap: {
        position: 'absolute',
        top: '30%',
        left: '20%',
        zIndex: 1,
    },
    destinationMarker: {
        position: 'absolute',
        top: '50%', // Adjust position for destination
        right: '25%',
        zIndex: 1,
    },
    alertIcon: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#1C1A1B',
        borderRadius: 30,
        padding: 10,
        zIndex: 2,
    },

    // Bottom Sheet Styles (common to Awaiting, Arrived, Live Tracking)
    bottomSheet: {
        backgroundColor: '#181617',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40, // More padding to avoid cutting off content
    },
    sheetTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    arrivalTime: {
        fontSize: 14,
        color: '#AAA',
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    driverAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    driverTextDetails: {
        flex: 1,
    },
    driverName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    driverRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    driverRatingText: {
        fontSize: 14,
        color: '#AAA',
        marginLeft: 5,
    },
    contactButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#333',
        marginLeft: 10,
    },
    carDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1C1A1B',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
    },
    carDetailLabel: {
        fontSize: 14,
        color: '#AAA',
        marginBottom: 5,
    },
    carDetailValue: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    actionButton: {
        backgroundColor: '#FFD700',
        borderRadius: 15,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 10,
    },
    actionButtonText: {
        color: '#1C1A1B',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryActionButton: {
        backgroundColor: '#1C1A1B',
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
    },
    secondaryActionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    rideLocationDetails: {
        marginBottom: 20,
        backgroundColor: "#201E1E",
        padding: 10,
        borderRadius: 10
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    locationText: {
        color: '#FFF',
        fontSize: 16,
        marginLeft: 10,
    },

    // Modal Specific Styles (from SelectLocation and adapted)
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#181617',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: height * 0.9,
        paddingBottom: 20,
        paddingTop: 20
    },
    modalScrollView: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    modalActionButton: {
        backgroundColor: '#FFD700',
        borderRadius: 15,
        paddingVertical: 18,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    modalActionButtonText: {
        color: '#1C1A1B',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalSecondaryActionButton: {
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    modalSecondaryActionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    locationInputSectionModal: {
        backgroundColor: '#1C1A1B',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    textInput: {
        flex: 1,
        color: '#FFF',
        fontSize: 16,
        marginLeft: 10,
    },
    savedPlacesButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        marginTop: 10,
    },
    savedPlacesText: {
        color: '#FFF',
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
    },
    priceConfirmationHeader: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 15,
    },
    priceConfirmationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    priceDetailsContainer: {
        backgroundColor: '#1C1A1B',
        borderRadius: 15,
        marginHorizontal: 20,
        padding: 15,
        marginBottom: 20,
    },
    priceDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    priceDetailLabel: {
        fontSize: 16,
        color: '#AAA',
    },
    priceDetailValue: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },

    // Center Modals (Stop Added, Ryde Completed)
    centerModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    centerModalContent: {
        backgroundColor: '#181617',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 30,
        marginHorizontal: 40,
        alignItems: 'center',
        width: "100%"
    },
    centerModalIcon: {
        marginBottom: 20,
    },
    centerModalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    centerModalDescription: {
        fontSize: 14,
        color: '#AAA',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
    },
    centerModalButton: {
        backgroundColor: '#FFD700',
        borderRadius: 15,
        alignItems: 'center',
        height: 60,
        width: "100%",
        justifyContent: "center",
    },
    centerModalButtonText: {
        color: '#1C1A1B',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ActiveBooking;
