import React, { useEffect, useState } from "react";
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
import Api from "../utility/API";
import { colors, marginHorizontal, spaceVertical } from "../styles/variables";
import { Picker } from "@react-native-picker/picker";
import Conditional from "../components/Conditional";
import Header from "../components/Header";
import { showToast } from "../utility/commonUtility";

function AddMenu({ navigation, route }) {
  let FoodType = {
    VEG: "Veg",
    NON_VEG: "NonVeg",
  };
  let { VEG, NON_VEG } = FoodType;
  let formTypeObj = {
    ADD_FORM: "ADD_FORM",
    EDIT_FORM: "EDIT_FORM",
  };
  let { ADD_FORM, EDIT_FORM } = formTypeObj;

  const [formType, setformType] = useState(ADD_FORM);
  const [categories, setcategories] = useState<any[]>([]);
  const [editID, seteditID] = useState<any>(null);
  const [selectedCategory, setselectedCategory] = useState("");
  const [menuForm, setmenuForm] = useState({
    Name: "",
    ItemDescription: "",
    Price: "",
    FoodType: VEG,
    Ingredients: [],
    AddOns: [],
    Ingredient: "",
  });
  const [types, settypes] = useState({ arr: [{ TypeName: "", Price: "", Serves:"" }] });
  const [addOns, setaddOns] = useState({ arr: [] });

  /**
   * @get_all_categories
   */
  const getAllCategories = () => {
    Api.get("/categories/getAll")
      .then((res) => {
        setcategories(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCategories();
    const unsubscribe = navigation.addListener("focus", () => {
      if (!route.params) return;
      const { itemId, itemData } = route.params;
      setformType(EDIT_FORM);
      seteditID(itemId);
      let { Name, Description, Price, FoodType, Ingredients, AddOns, Types } = itemData;
      // @ts-ignore
      setmenuForm({
        Name,
        ItemDescription: Description,
        Price,
        FoodType,
        Ingredients: Ingredients.split(","),
        Ingredient: "",
      });
      console.log(AddOns, Types);
      
      setaddOns({arr: AddOns});
      settypes({arr: Types});
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const removeIngredient = (index) => {
    let tempArr = menuForm.Ingredients;
    tempArr.splice(index, 1);
    setmenuForm({ ...menuForm, Ingredients: tempArr });
  };

  const onIngredientSave = () => {
    let tempArr: any = menuForm.Ingredients;
    tempArr.push(menuForm.Ingredient);
    setmenuForm({ ...menuForm, Ingredients: tempArr });
    setmenuForm({ ...menuForm, Ingredient: "" });
  };

  /**
   * @On_Menu_Save
   */
  const onMenuSave = () => {
    let CategoryID = categories.filter(
      (item): any => item?.CategoryName == selectedCategory
    )[0].ID;

    let url: string = formType == ADD_FORM ? "addNew" : `update/${editID}`;
    Api.post(`/menuItem/${url}`, { ...menuForm, CategoryID, MenuTypes: types.arr, MenuAddOns: addOns.arr })
      .then((res: object) => {
        showToast(`Menu ${formType == ADD_FORM ? "added" : "updated"} !`);
        navigation.navigate("Menu")
        //@ts-ignore
        setmenuForm({
          Name: "",
          ItemDescription: "",
          Price: "",
          FoodType: VEG,
          Ingredients: [],
          Ingredient: "",
        });
      })
      .catch((err: any) => {
        console.log(err);
        showToast("Something went wrong !");
      });
  };

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

  /**
   * @handle_Menu_Change
   */
  const handleMenuChange = (val: string, name: any) => {
    setmenuForm({ ...menuForm, [name]: val });
  };

  /**
   * @add new type in menu item
   */
  const addNewType = () => {
    let obj = { TypeName: "", Price: "", Serves:"" };
    let arr: any = types.arr;
    arr.push(obj);
    settypes({ arr });
  };

  const removeType = (index) => {
    let arr: any = types.arr;
    arr.splice(index, 1);
    settypes({ arr });
  };

  /**
   * @add new type in menu item
   */
  const addNewAddOn = () => {
    let obj = { AddOn: "", Price: "" };
    let arr: any = addOns.arr;
    arr.push(obj);
    setaddOns({ arr });
  };

  const removeAddOn = (index) => {
    let arr: any = addOns.arr;
    arr.splice(index, 1);
    setaddOns({ arr });
  };

  /**
   * @delete menu item
   */
  const removeMenuItem = () => {
    return false;
  };

  const handleTypeChange = (index: number, val, name) => {
    let arr: any = types.arr;
    arr[index][name] = val;
    settypes({arr});
  };

  const handleAddOnChange = (index: number, val, name) => {
    let arr: any = addOns.arr;
    arr[index][name] = val;
    setaddOns({arr});
  };

  return (
    <>
      <Header navigation={navigation} />
      <ScrollView>
        <View
          style={{
            marginVertical: spaceVertical.extraSmall,
            paddingHorizontal: marginHorizontal.small,
          }}
        >
          <>
            {/**
             * @ADD_MENU
             */}
            <Conditional
              condition={formType == ADD_FORM}
              elseComponent={
                <Text style={{ fontSize: 18, textDecorationLine: "underline" }}>
                  Edit Menu
                </Text>
              }
            >
              <Text style={{ fontSize: 18, textDecorationLine: "underline" }}>
                Add Menu
              </Text>
            </Conditional>

            <Text style={styles.text_footer}>Category</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.text_footer}>
                {selectedCategory || "Select Category"}
              </Text>

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
            {/* <Text style={styles.text_footer}>Item Price</Text>

            <View style={styles.action}>
              <FontAwesome name="rupee" color="#05375a" size={18} />
              <TextInput
                placeholder="Price"
                style={styles.textInput}
                autoCapitalize="none"
                value={menuForm?.Price}
                onChangeText={(val) => handleMenuChange(val, "Price")}
              />
            </View> */}
            <Text style={styles.text_footer}>Food Type</Text>
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

            {/* <Text style={styles.text_footer}>Ingredients</Text>

            <View style={styles.action}>
              <Feather name="edit" color="#05375a" size={20} />
              <TextInput
                placeholder="Add Ingredients"
                style={styles.textInput}
                autoCapitalize="none"
                value={menuForm?.Ingredient}
                onChangeText={(val: string) =>
                  setmenuForm({ ...menuForm, Ingredient: val })
                }
              />
              <TouchableOpacity onPress={onIngredientSave}>
                <Ionicons name="save" color="grey" size={20} />
              </TouchableOpacity>
            </View>
            {!menuForm.Ingredients.length ? (
              <Text style={{ color: "gray" }}>
                Press save icon to add an ingredient
              </Text>
            ) : null} */}
            <ScrollView horizontal>
              <View style={{ flexDirection: "row" }}>
                {menuForm.Ingredients.map((item: string, index: number) => {
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: spaceVertical.extraSmall,
              }}
            >
              <Text style={styles.text_footer}>Types</Text>
              <TouchableOpacity
                onPress={addNewType}
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  // marginTop: spaceVertical.semiSmall,
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
                  <Text style={{ color: "#fff" }}>Add New Type</Text>
                </View>
              </TouchableOpacity>
            </View>

            {types.arr.length
              ? types.arr.map((item: any, index) => {
                  return (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          marginVertical: spaceVertical.extraSmall - 6,
                        }}
                      >
                        <TextInput
                          placeholder="Title:"
                          style={styles.textInput}
                          autoCapitalize="none"
                          value={item.TypeName}
                          onChangeText={(val) =>
                            handleTypeChange(index, val, "TypeName")
                          }
                        />
                        <TextInput
                          placeholder="Price:"
                          style={styles.textInput}
                          autoCapitalize="none"
                          value={item.Price}
                          onChangeText={(val) =>
                            handleTypeChange(index, val, "Price")
                          }
                        />
                             <TextInput
                          placeholder="Serves:"
                          style={styles.textInput}
                          autoCapitalize="none"
                          value={item.Serves}
                          onChangeText={(val) =>
                            handleTypeChange(index, val, "Serves")
                          }
                        />
                        <TouchableOpacity onPress={() => removeType(index)}>
                          <Ionicons name="trash" color="grey" size={20} />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          borderBottomColor: "#e6e6e6",
                          borderBottomWidth: 1,
                        }}
                      />
                    </>
                  );
                })
              : null}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: spaceVertical.extraSmall,
              }}
            >
              <Text style={styles.text_footer}>Add On</Text>
              <TouchableOpacity
                onPress={addNewAddOn}
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  // marginTop: spaceVertical.semiSmall,
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
                  <Text style={{ color: "#fff" }}>New Add On</Text>
                </View>
              </TouchableOpacity>
            </View>

            {addOns.arr.length
              ? addOns.arr.map((item: any, index) => {
                  return (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          marginVertical: spaceVertical.extraSmall - 6,
                        }}
                      >
                        <TextInput
                          placeholder="Add On:"
                          style={styles.textInput}
                          autoCapitalize="none"
                          value={item.AddOn}
                          onChangeText={(val) =>
                            handleAddOnChange(index, val, "AddOn")
                          }
                        />
                        <TextInput
                          placeholder="Price:"
                          style={styles.textInput}
                          autoCapitalize="none"
                          value={item.Price}
                          onChangeText={(val) =>
                            handleAddOnChange(index, val, "Price")
                          }
                        />
                        <TouchableOpacity onPress={() => removeAddOn(index)}>
                          <Ionicons name="trash" color="grey" size={20} />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          borderBottomColor: "#e6e6e6",
                          borderBottomWidth: 1,
                        }}
                      />
                    </>
                  );
                })
              : null}
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
                <ActionButton />
              </View>
            </TouchableOpacity>
          </>
        </View>
      </ScrollView>
    </>
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

export default AddMenu;
