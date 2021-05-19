import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { colors, marginHorizontal, spaceVertical } from "../styles/variables";

function Header({ navigation }) {
  return (
    <View style={styles.headerWrapper}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Entypo name="shop" size={24} color={colors.textDark} />
        <Text
          style={{
            marginLeft: marginHorizontal.extraSmall,
            fontWeight: "bold",
          }}
        >
          Teapost
        </Text>
        <Text style={{ marginLeft: marginHorizontal.extraSmall }}>
          (teapost)
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Barcode")}>
        <AntDesign name="scan1" size={24} color={colors.textDark} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: marginHorizontal.small,
    paddingTop: spaceVertical.extraSmall,
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});

export default Header;
