import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from 'react-native-toast-message';
import { screens } from '../constants/constant';
import { SocketProvider } from '../contexts/SocketContext';

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
      <SocketProvider>
        <StripeProvider publishableKey='pk_test_51OjJpTASyMRcymO6x2PBK1nrHChycNMNXj7HHvTRffOp5xufCj3WRSCLoep1tGp5Ilx3IWj7ck5yqrwEH8VSRKn80055Kvyelu'>
          <Stack screenOptions={{ headerShown: false, animation: "slide_from_right", animationTypeForReplace: "push", contentStyle: { backgroundColor: "rgb(1, 1, 1)" }, }}>
            {screens.map((name) => (
              <Stack.Screen key={name} name={name} />
            ))}
          </Stack>
        </StripeProvider>
      </SocketProvider>
      <Toast />
      <StatusBar style="auto" />
    </ThemeProvider>

  );
}
