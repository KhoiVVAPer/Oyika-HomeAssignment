import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import "react-native-reanimated";

import { queryClient } from "../api/RootQueryClient";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainTabbar from ".";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
import { Note } from "@/models/Note";
import { ActivityIndicator } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
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
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppProvider
        id={"oyika-assignment-vomheie"}
        baseUrl={"https://services.cloud.mongodb.com"}
      >
        <UserProvider fallback={MainTabbar}>
          <RealmProvider
            schema={[Note]}
            sync={{
              flexible: true,
              onError: (_session, error) => {
                // Show sync errors in the console
                console.error(error);
              },
            }}
            fallback={<ActivityIndicator />}
          >
            <QueryClientProvider client={queryClient}>
              <SafeAreaProvider>
                <MainTabbar />
              </SafeAreaProvider>
            </QueryClientProvider>
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
