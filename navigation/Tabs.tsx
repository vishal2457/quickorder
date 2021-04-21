import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AddMenu from "../screens/AddMenu";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Reviews from "../screens/Reviews";
import Qr from "../screens/Qr";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, fontSize } from "../styles/variables";
const Tab = createBottomTabNavigator();

type TabViewProps = {
  focused: boolean;
  source: any;
  title: string;
};

const TabView = ({ focused, source, title }: TabViewProps) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Ionicons
        name={source}
        style={{
          color: focused ? colors.primary : "#748c94",
        }}
        size={22}
      />
      <Text
        style={{
          color: focused ? colors.primary : "#748c94",
          fontSize: fontSize.extraSmall,
        }}
      >
        {focused ? title : ''}
      </Text>
    </View>
  );
};

type CustomTabBarButton = {
  children: any;
  onPress: any;
};

const CustomTabBarButton = ({ children, onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: colors.primary,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 20, //Top Left Corner
          borderTopRightRadius: 20,
          height: 80,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="AddMenu"
        component={AddMenu}
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabView focused={focused} source={`grid`} title="MENU" />;
          },
        }}
      />
      <Tab.Screen
        name="Qr"
        component={Qr}
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabView focused={focused} source={`qr-code`} title="QR" />;
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={`home`}
                style={{
                  color: "#fff",
                }}
                size={32}
              />
            );
          },

          tabBarButton: (props) => {
            return <CustomTabBarButton {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabView focused={focused} source={`person`} title="PROFILE" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Reviews"
        component={Reviews}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabView focused={focused} source={`newspaper`} title="REVIEWS" />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5dF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
