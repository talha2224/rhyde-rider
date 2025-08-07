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
import { calculateRideDetails, getAddressFromCoordinates } from "../../../utils/function";

const colorPalette = [
  "#FFD700",
  "#FF0000",
  "#00C3FF",
  "#FFA200",
  "#00FFBC",
  "#9370DB",
  "#D3D3D3",
];

const SelectRhydes = () => {
  const { getSocket } = useSocket();
  const params = useLocalSearchParams();
  const [paymentMethod, setpaymentMethod] = useState("");
  const [showDriverDetailsModal, setShowDriverDetailsModal] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [userCurrentLocation, setUserCurrentlocation] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverAddress, setDriverAddress] = useState("Loading address...");
  const [driverColors, setDriverColors] = useState({});

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
        paymentMethod,
      };
      let res = await axios.post(`${config.baseUrl}/booking`, payload);
      if (res) {
        Toast.hide();
        Toast.show({
          type: "success",
          text1: "Request Sent To Rhyde",
          text2: "Waiting For Rhyde Confirmation.",
        });
      }
    } catch (error) {
      console.log(error, "error comes while create booking");
    }
  };

  const handleStripPayment = async (booking) => {
    try {
      let userId = await AsyncStorage.getItem("userId");
      let res = await axios.post(`${config.baseUrl}/payment/create`, { amount: Math.floor(booking?.fare * 100), id: userId });
      let secret = res?.data?.clientSecret;
      const initResponse = await initPaymentSheet({ merchantDisplayName: booking?.riderId?.name, paymentIntentClientSecret: secret });
      if (initResponse.error) {
        Toast.show({ type: "error", text1: "Error", text2: initResponse?.error?.message });
        return;
      } else {
        const paymentResponse = await presentPaymentSheet();
        if (paymentResponse.error) {
          Toast.show({ type: "error", text1: "Error", text2: paymentResponse?.error?.message });
          return;
        } else {
          let response = await axios.post(`${config.baseUrl}/transaction`, { riderId: booking?.riderId?._id, driverId: booking?.driverId?._id, type: "ride payment", amount: booking?.fare });
          if (response.data.data) {
            router.push({
              pathname: "/home/booking/activebooking",
              params: { bookingData: JSON.stringify(booking) },
            });
          }
        }
      }
    } catch (error) {
      console.log(error, "error in handling stripe payment");
    }
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorPalette.length);
    return colorPalette[randomIndex];
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const isColorLight = (hexColor) => {
    const { r, g, b } = hexToRgb(hexColor);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 186;
  };

  const handleDecline = (driverId) => {
    const updatedRiders = drivers.filter((ryde) => ryde.driver._id !== driverId);
    setDrivers(updatedRiders);
    const updatedColors = { ...driverColors };
    delete updatedColors[driverId];
    setDriverColors(updatedColors);
  };

  useEffect(() => {
    if (params?.availableDriver && params?.userLocation && params.paymentMethod) {
      try {
        const parsedUserLocation = JSON.parse(params.userLocation);
        const availableRider = JSON.parse(params.availableDriver);
        if (availableRider.length === 0) {
          ToastAndroid.show("No available rydes", ToastAndroid.SHORT);
          router.back();
        } else {
          setDrivers(availableRider);
          setUserCurrentlocation(parsedUserLocation);
          setpaymentMethod(params?.paymentMethod);
          // Assign random colors once
          const colors = {};
          availableRider.forEach((d) => {
            colors[d.driver._id] = getRandomColor();
          });
          setDriverColors(colors);
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
      Toast.show({
        type: "success",
        text1: "Your Ryde was accepted ",
        text2: "Have a great ryde",
      });
      if (booking?.paymentMethod === "Credit Debit Card") {
        (async () => {
          handleStripPayment(booking);
        })();
      } else {
        router.push({
          pathname: "/home/booking/activebooking",
          params: { bookingData: JSON.stringify(booking) },
        });
      }
    });

    socket.on("bookingCancelled", () => {
      Toast.show({
        type: "info",
        text1: "Rhyde declined your booking",
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
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose rydes</Text>
      </View>

      <ScrollView style={styles.rydesList}>
        {userCurrentLocation &&
          drivers?.map((ryde, index) => {
            const { driverDistanceFromRider, totalRideAmount } = calculateRideDetails(
              ryde.location,
              userCurrentLocation.currentLocation,
              userCurrentLocation.dropOffLocation,
              ryde.driver.perKmRate
            );

            const bgColor = driverColors[ryde.driver._id] || "#FFD700";
            const isLight = isColorLight(bgColor);

            return (
              <View key={index} style={[styles.rydeCard, { backgroundColor: bgColor }]}>
                <View style={styles.rydeCardContent}>
                  <Image source={{ uri: ryde?.driver?.front_view_img }} style={styles.carImage} resizeMode="contain" />
                  <View style={styles.rydeDetails}>
                    <Text style={[styles.rydeName, { color: isLight ? "#000" : "#FFF" }]}>{ryde?.driver?.name}</Text>
                    <Text style={{ color: isLight ? "#333" : "#fff", fontSize: 14, marginTop: 2 }}>
                      {driverDistanceFromRider !== null ? `${driverDistanceFromRider} miles away` : "N/A"}
                    </Text>
                    <Text style={[styles.rydePrice, { color: isLight ? "#000" : "#FFF" }]}>
                      {totalRideAmount !== null ? `$${totalRideAmount}` : "N/A"}
                    </Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => handleDecline(ryde?.driver?._id)} style={styles.declineButton}>
                    <Text style={styles.declineButtonText}>Decline</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.acceptButton} onPress={() => { setSelectedDriver(ryde); setShowDriverDetailsModal(true); }}>
                    <Text style={[styles.acceptButtonText, { color: isLight ? "#000" : "#1C1A1B" }]}>Send Request</Text>
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
    color: "#fff",
    marginTop: 2,
  },
  rydePrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
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
    backgroundColor: "red",
  },
  declineButtonText: {
    color: "white",
    fontSize: 16,
  },
  acceptButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "black",
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
