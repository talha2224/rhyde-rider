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

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="setup/index" options={{ headerShown: false }} />
        <Stack.Screen name="setup/phone" options={{ headerShown: false }} />
        <Stack.Screen name="setup/otp" options={{ headerShown: false }} />
        <Stack.Screen name="setup/upload" options={{ headerShown: false }} />
        <Stack.Screen name="setup/payment" options={{ headerShown: false }} />
        <Stack.Screen name="setup/emergency" options={{ headerShown: false }} />
        <Stack.Screen name="forgot/index" options={{ headerShown: false }} />
        <Stack.Screen name="forgot/otp" options={{ headerShown: false }} />
        <Stack.Screen name="forgot/password" options={{ headerShown: false }} />

        {/*
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="otp" options={{ headerShown: false }} />
        <Stack.Screen name="social" options={{ headerShown: false }} />
        <Stack.Screen name="forgot/index" options={{ headerShown: false }} />
        <Stack.Screen name="forgot/otp" options={{ headerShown: false }} />
        <Stack.Screen name="forgot/password" options={{ headerShown: false }} />
        <Stack.Screen name="forgot/final" options={{ headerShown: false }} />
        <Stack.Screen name="profile/index" options={{ headerShown: false }} />
        <Stack.Screen name="profile/name" options={{ headerShown: false }} />
        <Stack.Screen name="profile/language" options={{ headerShown: false }} />
        <Stack.Screen name="profile/payment" options={{ headerShown: false }} />
        <Stack.Screen name="profile/terms" options={{ headerShown: false }} />
        <Stack.Screen name="profile/final" options={{ headerShown: false }} />


        <Stack.Screen name="home/index" options={{ headerShown: false }} />
        <Stack.Screen name="home/rate" options={{ headerShown: false }} />
        <Stack.Screen name="home/search" options={{ headerShown: false }} />
        <Stack.Screen name="home/notification" options={{ headerShown: false }} />
        <Stack.Screen name="home/chats" options={{ headerShown: false }} />
        <Stack.Screen name="home/msg" options={{ headerShown: false }} />
        <Stack.Screen name="home/bookings" options={{ headerShown: false }} />
        <Stack.Screen name="home/wallet" options={{ headerShown: false }} />
        <Stack.Screen name="home/topup" options={{ headerShown: false }} />
        <Stack.Screen name="home/payment" options={{ headerShown: false }} />
        <Stack.Screen name="home/profile" options={{ headerShown: false }} />
        <Stack.Screen name="home/edit" options={{ headerShown: false }} />
        <Stack.Screen name="home/favorite" options={{ headerShown: false }} />
        <Stack.Screen name="home/notificationsettings" options={{ headerShown: false }} />
        <Stack.Screen name="home/language" options={{ headerShown: false }} />
        <Stack.Screen name="home/security" options={{ headerShown: false }} />
        <Stack.Screen name="home/support" options={{ headerShown: false }} />
        <Stack.Screen name="home/delivery" options={{ headerShown: false }} />
        <Stack.Screen name="home/map" options={{ headerShown: false }} /> */}

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
