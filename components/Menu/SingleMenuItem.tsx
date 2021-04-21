import React, { useState } from "react";
import { Platform, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-animatable";
import {
  colors,
  marginHorizontal,
  spaceVertical,
} from "../../styles/variables";
import Octicons from "react-native-vector-icons/Octicons";
import { FoodType } from "../../utility/commonUtility";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

function SingleMenuItem({ menuItem, index, subIndex, editMenu }) {
  let { VEG, NON_VEG } = FoodType;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      {/**
       * @Left_Side
       */}

      {/**
       * @Menu_Name
       */}
      <View style={{ flexDirection: "row" }}>
        <Octicons
          name="primitive-dot"
          size={15}
          style={{
            marginTop: spaceVertical.extraSmall - 8,
            color: `${menuItem?.FoodType == VEG ? "green" : "red"}`,
          }}
        />
        <View style={{ marginLeft: marginHorizontal.extraSmall }}>
          <Text style={styles.itemName}>{menuItem?.Name}</Text>
          <View>
            {/**
             * @Price
             */}
            <View
              style={{
                flexDirection: "row",

                marginTop: 5,
              }}
            >
              <FontAwesome
                name="rupee"
                color="#05375a"
                size={15}
                style={{ marginRight: 3, fontWeight: "200", marginTop: 3 }}
              />
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                {menuItem?.Price}
              </Text>
            </View>
            {/**
             * @Description
             */}
            <View
              style={{
                marginTop: 3,
                maxWidth: "85%",
              }}
            >
              <Text style={{ color: colors.gray }}>
                {menuItem?.Description}
              </Text>
            </View>
            {/**
             * @Ingredients
             */}
            <View style={{ flexDirection: "row" }}>
              {menuItem?.Ingredients?.split(",").map(
                (ingredient: string, index: number) => {
                  return (
                    <View key={index} style={styles.ingredient}>
                      <Text>{ingredient}</Text>
                    </View>
                  );
                }
              )}
            </View>
          </View>
        </View>
      </View>

      {/**
       * @Right_Side
       */}
      {/* <View style={styles.rightSide}> */}
      {/**
       * @Switch
       */}
      <View style={styles.switch}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => editMenu(index, subIndex)}>
            <Feather
              name="edit"
              color="#05375a"
              size={18}
              style={{ marginRight: 4, marginTop: 3 }}
            />
          </TouchableOpacity>
          <Switch
            trackColor={{ false: "#767577", true: colors.secondary }}
            thumbColor={menuItem?.IsActive ? colors.primary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={menuItem?.IsActive ? true : false}
            style={{
              transform: [
                { scaleX: Platform.OS == "ios" ? 0.8 : 1 },
                { scaleY: Platform.OS == "ios" ? 0.8 : 1 },
              ],
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    marginVertical: spaceVertical.extraSmall - 6,
    paddingHorizontal: marginHorizontal.extraSmall,
    paddingVertical: spaceVertical.extraSmall,
    borderRadius: 10,
    minHeight: 60,
  },
  container: {
    // backgroundColor: "#fff",
    marginVertical: spaceVertical.extraSmall - 4,
    // paddingHorizontal: marginHorizontal.extraSmall,
    // paddingVertical: spaceVertical.extraSmall,
    // borderRadius: 10,
    // minHeight: 60,
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  itemName: {
    textTransform: "capitalize",
    fontSize: 18,
  },
  ingredient: {
    paddingHorizontal: marginHorizontal.extraSmall - 2,
    paddingVertical: spaceVertical.extraSmall - 9,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 45,
    marginRight: marginHorizontal.extraSmall - 4,
    marginVertical: spaceVertical.extraSmall,
  },
  rightSide: {
    // marginHorizontal: marginHorizontal.extraSmall,
  },
  switch: {
    position: "absolute",
    right: 5,
    top: 8,
    bottom: 0,
    //   flexDirection: "row"
  },
});

export default SingleMenuItem;
