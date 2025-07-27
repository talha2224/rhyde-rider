import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ToastAndroid } from "react-native";
import { connectSocket } from "../utils/socket";

export default function AppWrapper({ children }) {
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem("userId").then((riderId) => {
      if (riderId) {
        connectSocket(riderId).then((socket) => {
          socket.on("bookingAccepted", ({ booking }) => {
            ToastAndroid.show("Driver accepted ride", ToastAndroid.SHORT);
            router.push({ pathname: "/home/booking/activebooking", params: { booking: JSON.stringify(booking) } });
          });
          socket.on("bookingCancelled", () => {
            ToastAndroid.show("Driver declined ride", ToastAndroid.SHORT);
          });
          socket.on("driverLocationUpdate", (loc) => {
            console.log("driver loc:", loc);
          });
        });
      }
    });
  }, []);

  return children;
}
