import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const screens = [
    "index",
    "onboarding",
    "signup",
    "signin",
    "setup/index",
    "setup/phone",
    "setup/otp",
    "setup/upload",
    "setup/payment",
    "setup/emergency",
    "forgot/index",
    "forgot/otp",
    "forgot/password",
    "home/index",
    "home/activities",
    "home/wallet",
    "home/rewards",
    "home/profile",
    "home/rideHistory",
    "home/notification",
    "home/rhydes",
    "home/transactions",
    "home/credit",
    "home/loyality",
    "home/coupon",
    "home/deposit",
    "home/milestones",
    "home/mlm",
    "home/chat",
    "home/savedplaces",
    "home/addaddress",
    "home/booking/index",
    "home/booking/activebooking",
    "home/booking/cancelled",
    "home/booking/feedback",
    "home/booking/rate",
    "home/booking/tip",
    "home/profile/profile",
    "home/profile/singleprofile",
    "home/profile/notification",
    "home/profile/setting",
    "home/profile/language",
    "home/profile/emergency",
    "home/profile/paymentmethod",
    "home/profile/addcard",
    "home/profile/gift",
    "home/profile/support",
    "home/profile/subscription",
    "home/profile/report",
    "+not-found",
  ];

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{ headerShown: false, animation: "slide_from_right", animationTypeForReplace: "push", contentStyle: { backgroundColor: "rgb(1, 1, 1)", }, }}>
        {screens.map((name) => (
          <Stack.Screen key={name} name={name} />
        ))}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>

  );
}
