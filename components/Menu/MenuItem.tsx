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
import SingleMenuItem from "./SingleMenuItem";


function MenuItem({ item, editMenu, index }) {
  


  return (
    <View style={styles.mainContainer}>
      <View style={{marginBottom: spaceVertical.extraSmall}}>
       <Text style={{fontSize: 18, fontWeight: 'bold', textTransform: 'capitalize' }}>{item?.CategoryName}</Text> 
       <Text style={{fontSize: 12, color: colors.gray }}>{item?.Description}</Text> 
      </View>
      <View style={{borderWidth: 0.8, borderColor: '#ebebeb'}} />

{/**
 * @Menu_In_Category
 */}
 {item?.Menu_Items.length ? (
   <> 
   {item?.Menu_Items.map((menuItem, subIndex) => {
     return  <SingleMenuItem menuItem={menuItem} index={index} subIndex={subIndex} key={subIndex} editMenu={editMenu} />
   })}
   </>
 ) : (<Text> No items to show </Text>)}

  
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
    paddingHorizontal: marginHorizontal.extraSmall -2,
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
      position: 'absolute',
      right: 5,
      top: 8,
      bottom: 0,
    //   flexDirection: "row"
  }
});

export default MenuItem;
