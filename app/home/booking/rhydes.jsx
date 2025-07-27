import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import DriverDetailModel from "../../../components/DriverDetailModel";
import config from "../../../config";
import { useSocket } from "../../../contexts/SocketContext";
import { calculateRideDetails, getAddressFromCoordinates, } from "../../../utils/function";


const SelectRhydes = () => {
  const { getSocket } = useSocket();
  const params = useLocalSearchParams();
  const [paymentMethod, setpaymentMethod] = useState("");
  const [showDriverDetailsModal, setShowDriverDetailsModal] = useState(false);
  const [riders, setRiders] = useState([]);
  const [userCurrentLocation, setUserCurrentlocation] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverAddress, setDriverAddress] = useState("Loading address...");

  const sendRideRequestToDriver = async () => {
    setShowDriverDetailsModal(false);
    try {
      Toast.show({
        type: "info",
        text1: "Sending Request To Rhyde",
        text2: "Please Wait.",
        autoHide: false,
      });
      const riderId = await AsyncStorage.getItem("userId");

      const payload = {
        riderId,
        driverId: selectedDriver?.driver?._id,
        pickupCoordinates: userCurrentLocation.currentLocation,
        dropOffCoordinates: {
          longitude: userCurrentLocation.dropOffLocation?.dropOfLongtitude,
          latitude: userCurrentLocation.dropOffLocation?.dropOfLatitude,
        },
        pickupAddress: userCurrentLocation?.dropOffLocation?.pickupAddress,
        dropOffAddress: userCurrentLocation?.dropOffLocation?.dropOfAddress,
        isSchedule: false,
        paymentMethod
      };
      let res = await axios.post(`${config.baseUrl}/booking`, payload);
      if (res) {
        Toast.hide();
        Toast.show({
          type: "success",
          text1: "Request Send To Rhyde",
          text2: "Waiting For Rhyde Confirmation.",
        });
      }
    } catch (error) {
      console.log(error, "error comes while create booking");
    }
  };

  const handleStripPayment = async (booking) => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      let res = await axios.post(`${config.baseUrl}/payment/create`, { amount: Math.floor(booking?.fare * 100), id: userId })
      let secret = res?.data?.clientSecret
      const initResponse = await initPaymentSheet({ merchantDisplayName: booking?.riderId?.name, paymentIntentClientSecret: secret })
      if (initResponse.error) {
        Toast.show({ type: "error", text1: "Error", text2: initResponse?.error?.message, });
        return
      }
      else {
        const paymentResponse = await presentPaymentSheet()
        if (paymentResponse.error) {
          Toast.show({ type: "error", text1: "Error", text2: paymentResponse?.error?.message, });
          return
        }
        else {
          let response = await axios.post(`${config.baseUrl}/transaction`, { riderId: booking?.riderId?._id, driverId: booking?.driverId?._id, type: "ride payment", amount: booking?.fare })
          console.log(response.data.data,'transaction hitsory')
          if (response.data.data) {
            router.push({
              pathname: "/home/booking/activebooking",
              params: { bookingData: JSON.stringify(booking) },
            });
          }
        }
      }
    }
    catch (error) {
      console.log(error, 'error in handling stripe payment')
    }
  }

  useEffect(() => {
    if (params?.availableDriver && params?.userLocation && params.paymentMethod) {
      try {
        const parsedUserLocation = JSON.parse(params.userLocation);
        const availableRider = JSON.parse(params.availableDriver);
        if (availableRider.length === 0) {
          ToastAndroid.show("No available rydes", ToastAndroid.SHORT);
          router.back();
        } else {
          setRiders(availableRider);
          setUserCurrentlocation(parsedUserLocation);
          setpaymentMethod(params?.paymentMethod)
        }
      } catch {
        ToastAndroid.show("Invalid data", ToastAndroid.SHORT);
        router.back();
      }
    } else {
      ToastAndroid.show("No available rydes", ToastAndroid.SHORT);
      router.back();
    }
  }, []);

  useEffect(() => {
    const fetchDriverAddress = async () => {
      if (selectedDriver?.location) {
        const address = await getAddressFromCoordinates(
          selectedDriver.location.latitude,
          selectedDriver.location.longitude
        );
        setDriverAddress(address);
      } else {
        setDriverAddress("Location unavailable");
      }
    };

    if (showDriverDetailsModal && selectedDriver) {
      fetchDriverAddress();
    }
  }, [showDriverDetailsModal, selectedDriver]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("bookingAccepted", (booking) => {
      console.log(booking?.paymentMethod,'bookingData?.paymentMethod')
      Toast.show({
        type: "success",
        text1: "Rhyde accepted your booking",
        text2: "Have A Safe Journey",
      });
      if (booking?.paymentMethod === "Credit Debit Card") {
        (async () => {
          handleStripPayment(booking)
        })()
      }
      else {
        router.push({
          pathname: "/home/booking/activebooking",
          params: { bookingData: JSON.stringify(booking) },
        });
      }
    });

    socket.on("bookingCancelled", (booking) => {
      Toast.show({
        type: "info",
        text1: "Rhyde decline your booking",
        text2: "Find a new rhyde",
      });
      router.push("/home");
    });

    return () => {
      socket.off("bookingAccepted");
      socket.off("bookingCancelled");
    };
  }, [getSocket]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose rydes</Text>
      </View>

      <ScrollView style={styles.rydesList}>
        {userCurrentLocation &&
          riders?.map((ryde, index) => {
            const { driverDistanceFromRider, totalRideAmount } =
              calculateRideDetails(
                ryde.location,
                userCurrentLocation.currentLocation,
                userCurrentLocation.dropOffLocation,
                ryde.driver.perKmRate
              );
            return (
              <View key={index} style={styles.rydeCard}>
                <View style={styles.rydeCardContent}>
                  <Image
                    source={{ uri: ryde?.driver?.front_view_img }}
                    style={styles.carImage}
                    resizeMode="contain"
                  />
                  <View style={styles.rydeDetails}>
                    <Text style={styles.rydeName}>{ryde?.driver?.name}</Text>
                    <Text style={styles.rydeDistance}>
                      {driverDistanceFromRider !== null
                        ? `${driverDistanceFromRider} km away`
                        : "N/A"}
                    </Text>
                    <Text style={styles.rydePrice}>
                      {totalRideAmount !== null
                        ? `$ ${totalRideAmount}`
                        : "N/A"}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.declineButton}>
                    <Text style={styles.declineButtonText}>Decline</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => {
                      setSelectedDriver(ryde);
                      setShowDriverDetailsModal(true);
                    }}
                  >
                    <Text style={styles.acceptButtonText}>Send Request</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </ScrollView>

      <DriverDetailModel
        visible={showDriverDetailsModal}
        onClose={() => setShowDriverDetailsModal(false)}
        title="Driver details"
      >
        <View style={styles.driverDetailsContainer}>
          <Image
            source={{ uri: selectedDriver?.driver?.profile_img }}
            style={styles.driverAvatar}
          />
          <Text style={styles.driverName}>{selectedDriver?.driver?.name}</Text>
          {selectedDriver?.location && (
            <Text style={styles.driverLocation}>{driverAddress}</Text>
          )}
          <View style={styles.driverStatsContainer}>
            <View style={styles.driverStatItem}>
              <AntDesign name="car" size={20} color="#FFD700" />
              <Text style={styles.driverStatValue}>10</Text>
              <Text style={styles.driverStatLabel}>Trips</Text>
            </View>
            <View style={styles.driverStatItem}>
              <AntDesign name="calendar" size={20} color="#FFD700" />
              <Text style={styles.driverStatValue}>3</Text>
              <Text style={styles.driverStatLabel}>Years of Exp</Text>
            </View>
            <View style={styles.driverStatItem}>
              <AntDesign name="profile" size={20} color="#FFD700" />
              <Text style={styles.driverStatValue}>4</Text>
              <Text style={styles.driverStatLabel}>Reviews</Text>
            </View>
          </View>
          <Text style={styles.carDetailsTitle}>Car Details</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.carDetailsRow}>
              <Text style={styles.carDetailsLabel}>Car Model</Text>
              <Text style={styles.carDetailsValue}>
                {selectedDriver?.driver?.model}
              </Text>
            </View>
            <View style={styles.carDetailsRow}>
              <Text style={styles.carDetailsLabel}>License number</Text>
              <Text style={styles.carDetailsValue}>
                {selectedDriver?.driver?.license_plate_number}
              </Text>
            </View>
            <View style={styles.carDetailsRow}>
              <Text style={styles.carDetailsLabel}>Seats</Text>
              <Text style={styles.carDetailsValue}>4</Text>
            </View>
            <View style={styles.carDetailsRow}>
              <Text style={styles.carDetailsLabel}>Color</Text>
              <Text style={styles.carDetailsValue}>
                {selectedDriver?.driver?.color}
              </Text>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={sendRideRequestToDriver}
          style={styles.modalAcceptButton}
        >
          <Text style={styles.modalAcceptButtonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowDriverDetailsModal(false)}
          style={styles.modalDeclineButton}
        >
          <Text style={styles.modalDeclineButtonText}>Cancel</Text>
        </TouchableOpacity>
      </DriverDetailModel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1A1B",
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  rydesList: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  rydeCard: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#FBB73A",
  },
  rydeCardContent: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
    color: "#FFF",
  },
  rydeDistance: {
    fontSize: 14,
    color: "#DDD",
    marginTop: 2,
  },
  rydePrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  declineButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  declineButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
  },
  acceptButtonText: {
    color: "#1C1A1B",
    fontSize: 16,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#AAA",
  },
  driverDetailsContainer: {
    alignItems: "center",
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
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  driverLocation: {
    fontSize: 14,
    color: "#AAA",
    marginBottom: 20,
  },
  driverStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  driverStatItem: {
    alignItems: "center",
    backgroundColor: "#1C1A1B",
    padding: 10,
    borderRadius: 10,
  },
  driverStatValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 5,
  },
  driverStatLabel: {
    fontSize: 12,
    color: "#AAA",
  },
  carDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 15,
  },
  carDetailsRow: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  carDetailsLabel: {
    fontSize: 16,
    color: "#AAA",
  },
  carDetailsValue: {
    fontSize: 16,
    color: "#FFF",
    marginTop: 5,
  },
  modalAcceptButton: {
    backgroundColor: "#FFD700",
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  modalAcceptButtonText: {
    color: "#1C1A1B",
    fontSize: 18,
  },
  modalDeclineButton: {
    backgroundColor: "transparent",
    marginHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  modalDeclineButtonText: {
    color: "#AAA",
    fontSize: 16,
  },
});

export default SelectRhydes;
