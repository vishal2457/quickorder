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

function BottomSheet({
  onCategorySave,
  categoryForm,
  handleCategoryChange,
  type,
  BottomSheetTypeObj,
  categories,
  FoodType,
  ingredientsArr,
  onIngredientSave,
  setingredients,
  removeIngredient,
  menuForm,
  handleMenuChange,
  onMenuSave,
  selectedCategory,
  setselectedCategory
}) {

  let { ADD_CATEGORY, ADD_MENU } = BottomSheetTypeObj;
  let { VEG, NON_VEG } = FoodType;

  return (
    <ScrollView>
      <View
        style={{
          marginVertical: spaceVertical.extraSmall,
          paddingHorizontal: marginHorizontal.small,
        }}
      >
        {type == ADD_CATEGORY ? (
          <>
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
          </>
        ) : (
          <>
            {/**
             * @ADD_MENU
             */}
            <Text style={{ fontSize: 18, textDecorationLine: "underline" }}>
              Add Menu
            </Text>
            <Text style={styles.text_footer}>Category</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.text_footer}>{selectedCategory || 'Select Category'}</Text>

              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                  setselectedCategory(itemValue)
                }
                style={{ width: 30, height: 50 }}
              >
                {categories.length
                  ? categories.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={item?.CategoryName}
                          value={item?.CategoryName}
                        />
                      );
                    })
                  : null}
              </Picker>
            </View>

            <Text style={styles.text_footer}>Item Name</Text>

            <View style={styles.action}>
              <Feather name="edit" color="#05375a" size={20} />
              <TextInput
                placeholder="Item name"
                style={styles.textInput}
                autoCapitalize="none"
                value={menuForm?.Name}
                onChangeText={(val) => handleMenuChange(val, "Name")}
              />
            </View>
            <Text style={styles.text_footer}>Item Description</Text>

            <View style={styles.action}>
              <Feather name="info" color="#05375a" size={20} />
              <TextInput
                placeholder="Item Description"
                style={styles.textInput}
                autoCapitalize="none"
                value={menuForm?.ItemDescription}
                onChangeText={(val) => handleMenuChange(val, "ItemDescription")}
              />
            </View>
            <Text style={styles.text_footer}>Item Price</Text>

            <View style={styles.action}>
              <FontAwesome name="rupee" color="#05375a" size={18} />
              <TextInput
                placeholder="Price"
                style={styles.textInput}
                autoCapitalize="none"
                value={menuForm?.Price}
                onChangeText={(val) => handleMenuChange(val, "Price")}
              />
            </View>
            <Text style={styles.text_footer}>Type</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => handleMenuChange(VEG, "FoodType")}
                activeOpacity={0.8}
              >
                <View
                  style={
                    menuForm?.FoodType == VEG
                      ? styles.selectedType
                      : styles.type
                  }
                >
                  <Ionicons
                    name={`radio-button-${
                      menuForm?.FoodType == VEG ? "on" : "off"
                    }`}
                    color="#05375a"
                    size={20}
                  />

                  <Text
                    style={{ paddingLeft: 4, paddingTop: 2, color: "green" }}
                  >
                    Veg
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleMenuChange(NON_VEG, "FoodType")}
                activeOpacity={0.8}
              >
                <View
                  style={
                    menuForm?.FoodType == NON_VEG
                      ? styles.selectedType
                      : styles.type
                  }
                >
                  <Ionicons
                    name={`radio-button-${
                      menuForm?.FoodType == NON_VEG ? "on" : "off"
                    }`}
                    color="#05375a"
                    size={20}
                  />

                  <Text style={{ paddingLeft: 4, paddingTop: 2, color: "red" }}>
                    Non Veg
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.text_footer}>Ingredients</Text>

            <View style={styles.action}>
              <Feather name="edit" color="#05375a" size={20} />
              <TextInput
                placeholder="Add Ingredients"
                style={styles.textInput}
                autoCapitalize="none"
                value={menuForm?.Ingredient}
                onChangeText={(val) => setingredients(val)}
              />
              <TouchableOpacity onPress={onIngredientSave}>
                <Ionicons name="save" color="grey" size={20} />
              </TouchableOpacity>
            </View>
            {!ingredientsArr.length ? <Text style={{color: "gray"}}>Press save icon to add an ingredient</Text> : null}
            <ScrollView horizontal>
              <View style={{ flexDirection: "row" }}>
                {ingredientsArr.map((item: string, index: number) => {
                  return (
                    <View
                      key={index}
                      style={{
                        paddingHorizontal: marginHorizontal.extraSmall - 4,
                        borderWidth: 1,
                        borderColor: colors.darkGray,
                        borderRadius: 45,
                        marginHorizontal: marginHorizontal.extraSmall - 4,
                        marginVertical: spaceVertical.extraSmall,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ paddingRight: 5 }}>{item}</Text>
                        <TouchableOpacity
                          onPress={() => removeIngredient(index)}
                        >
                          <Ionicons
                            name={`close-circle-outline`}
                            color="#05375a"
                            size={18}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={onMenuSave}
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
          </>
        )}
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
