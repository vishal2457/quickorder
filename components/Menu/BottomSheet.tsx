import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  colors,
  marginHorizontal,
  spaceVertical,
} from "../../styles/variables";
import { Picker } from "@react-native-picker/picker";
import Conditional from "../Conditional";




function BottomSheet({
  onCategorySave,
  categoryForm,
  handleCategoryChange,
  formTypeObj,
  formType,
}) {

  let { ADD_FORM, EDIT_FORM } = formTypeObj;

  let ActionButton = () => {
    return (
      <>
        {formType == ADD_FORM ? (
          <Text style={{ color: "#fff" }}>Save</Text>
        ) : (
          <Text style={{ color: "#fff" }}>Update</Text>
        )}
      </>
    );
  };

  return (
    <ScrollView>
      <View
        style={{
          marginVertical: spaceVertical.extraSmall,
          paddingHorizontal: marginHorizontal.small,
        }}
      >
    
            {/**
             * @ADD_CATEGORY
             */}
            <Text style={{ fontSize: 18, textDecorationLine: "underline" }}>
              Add New Category
            </Text>

            <Text style={styles.text_footer}>Category Name</Text>

            <View style={styles.action}>
              <Feather name="edit" color="#05375a" size={20} />
              <TextInput
                placeholder="category name"
                style={styles.textInput}
                autoCapitalize="none"
                value={categoryForm?.CategoryName}
                onChangeText={(val) =>
                  handleCategoryChange(val, "CategoryName")
                }
              />
            </View>
            <Text style={styles.text_footer}>Category Description</Text>

            <View style={styles.action}>
              <Feather name="info" color="#05375a" size={20} />
              <TextInput
                placeholder="category Description"
                style={styles.textInput}
                autoCapitalize="none"
                value={categoryForm?.Description}
                onChangeText={(val) => handleCategoryChange(val, "Description")}
              />
            </View>
            <TouchableOpacity
              onPress={onCategorySave}
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginTop: spaceVertical.semiSmall,
              }}
            >
              <View
                style={{
                  paddingHorizontal: marginHorizontal.normal,
                  paddingVertical: spaceVertical.extraSmall - 4,
                  borderRadius: 10,
                  backgroundColor: colors.secondary,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff" }}>Save</Text>
              </View>
            </TouchableOpacity>
          
           
           
         
    
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    // marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    marginTop: spaceVertical.small,
  },
  type: {
    flexDirection: "row",
    fontSize: 18,

    marginRight: marginHorizontal.small,
  },
  selectedType: {
    flexDirection: "row",
    marginRight: marginHorizontal.small,
    borderWidth: 1,
    fontSize: 18,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderColor: colors.secondary,
    borderRadius: 10,
  },
});

export default BottomSheet;
