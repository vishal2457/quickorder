import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "./screens/Auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "./contexts/auth.provider";
import Main from "./screens/Main";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <AuthProvider>
        <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
        <Stack.Screen name="App" component={Main} />
        <Stack.Screen name="Auth" component={Auth} />
    </Stack.Navigator>
        </AuthProvider>
      </SafeAreaView>
    </NavigationContainer>
  );
}
