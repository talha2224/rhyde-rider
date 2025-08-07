import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { JSX, useEffect } from "react";
import "react-native-reanimated";
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import { screens } from '../constants/constant';
import { SocketProvider } from '../contexts/SocketContext';


SplashScreen.preventAutoHideAsync();

const toastConfig = {
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#FFD700',
        backgroundColor: '#FFD700',
        borderRadius: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C1A1B',
      }}
      text2Style={{
        fontSize: 14,
        color: '#1C1A1B',
      }}
    />
  ),
  info: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#FFD700',
        backgroundColor: '#FFD700',
        borderRadius: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C1A1B',
      }}
      text2Style={{
        fontSize: 14,
        color: '#1C1A1B',
      }}
    />
  ),
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#FFD700',
        backgroundColor: '#FFD700',
        borderRadius: 10,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C1A1B',
      }}
      text2Style={{
        fontSize: 14,
        color: '#1C1A1B',
      }}
    />
  ),
};


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
        <StripeProvider publishableKey='pk_test_51Rr17RJ0wsnsgQqZ1cZUbG1S5KzJQvnneNiuRJjY6gmn4E3ma0rPXQaftYixDVdbuWLZDi3tZQyRzXSpvKdhFec100aVhQpPYM'>
          <Stack screenOptions={{ headerShown: false, animation: "slide_from_right", animationTypeForReplace: "push", contentStyle: { backgroundColor: "rgb(1, 1, 1)" }, }}>
            {screens.map((name) => (
              <Stack.Screen key={name} name={name} />
            ))}
          </Stack>
        </StripeProvider>
      </SocketProvider>
      <Toast config={toastConfig}/>
      <StatusBar style="auto" />
    </ThemeProvider>

  );
}
