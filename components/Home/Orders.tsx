import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import {
  colors,
  marginHorizontal,
  spaceVertical,
} from "../../styles/variables";
import { getDateDetail } from "../../utility/commonUtility";
import SingleOrder from "./SingleOrder";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Conditional from "../Conditional";

function Orders({ order, orderFinished, activeType, orderTypes }) {
  return (
    <View style={styles.mainContainer}>
      <View style={{ marginBottom: spaceVertical.extraSmall }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {order.OrderNo} | {getDateDetail(order.createdAt)} | Table:{" "}
          {order.TableNo}
        </Text>
      </View>
      <View style={{ borderWidth: 0.8, borderColor: "#ebebeb" }} />
      {order.Food_Order_Details.map((item, index) => {
        return <SingleOrder item={item} key={index} />;
      })}
      <View style={{ borderWidth: 0.8, borderColor: "#ebebeb" }} />
      <View
        style={{
          flexDirection: "row",
          marginVertical: spaceVertical.extraSmall,
        }}
      >
        <Text>Total Bill : </Text>
        <FontAwesome
          name="rupee"
          color="#05375a"
          size={12}
          style={{ marginRight: 3, fontWeight: "200", marginTop: 3 }}
        />
        <Text>{parseFloat(order.TotalAmount)}</Text>
      </View>
      <Conditional
        condition={activeType == orderTypes.PENDING }
        elseComponent={
          <TouchableOpacity>
            <View style={styles.orderButton}>
              <Text style={{ color: "#fff", fontSize: 18 }}>
                ORDER FINISHED
              </Text>
            </View>
          </TouchableOpacity>
        }
      >
        <TouchableOpacity onPress={() => orderFinished(order.ID)}>
          <View style={styles.orderButton}>
            <Text style={{ color: "#fff", fontSize: 18 }}>ORDER READY</Text>
          </View>
        </TouchableOpacity>
      </Conditional>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    marginVertical: spaceVertical.extraSmall,
    marginHorizontal: marginHorizontal.extraSmall,
    paddingHorizontal: marginHorizontal.extraSmall + 2,
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
  orderButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: spaceVertical.extraSmall,
    borderRadius: 10,
    backgroundColor: "#0275d8",
  },
});

export default Orders;
