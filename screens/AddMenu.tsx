import React, { useEffect, useRef } from "react";
//@ts-ignore
import Header from "../components/Header.tsx";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import { colors, marginHorizontal, spaceVertical } from "../styles/variables";
import RBSheet from "react-native-raw-bottom-sheet";
import Api from "../utility/API";
import BottomSheet from "../components/Menu/BottomSheet";
import { showToast } from "../utility/commonUtility";
import MenuItem from "../components/Menu/MenuItem";

function AddMenu({ navigation }) {
  const refRBSheet: any = useRef();

  let BottomSheetTypeObj = {
    ADD_CATEGORY: "ADD_CATEGORY",
    ADD_MENU: "ADD_MENU",
  };

  let FoodType = {
    VEG: "Veg",
    NON_VEG: "NonVeg",
  };
  let { VEG, NON_VEG } = FoodType;

  let { ADD_CATEGORY, ADD_MENU } = BottomSheetTypeObj;

  const [BottomSheetType, setBottomSheetType] = React.useState(ADD_CATEGORY);

  const [categoryForm, setcategoryForm] = React.useState({
    CategoryName: "",
    Description: "",
  });

  const [menuForm, setmenuForm] = React.useState({
    Name: "",
    ItemDescription: "",
    Price: "",
    FoodType: VEG,
    Ingredients: [],
    Ingredient: "",
  });

  const [categories, setcategories] = React.useState<any[]>([]);
  const [menu, setmenu] = React.useState<any[]>([]);
  const [selectedCategory, setselectedCategory] = React.useState("");

  /**
   * @Useeffect
   */
  useEffect(() => {
    getMenu()
    return () => {
      
    }
  }, []);

  function getMenu() {
    Api.get("/menuItem/getAll")
    .then(result => {

      setmenu(result?.data?.data) 
    })
    .catch(err => console.log(err))
  }

  /**
   * @Handle_Category_Change
   */
  const handleCategoryChange = (val: string, name: any) => {
    setcategoryForm({ ...categoryForm, [name]: val });
  };

  /**
   * @handle_Menu_Change
   */
  const handleMenuChange = (val: string, name: any) => {
    setmenuForm({ ...menuForm, [name]: val });
  };

  const onIngredientSave = () => {
    let tempArr: any = menuForm.Ingredients;
    tempArr.push(menuForm.Ingredient);
    setmenuForm({ ...menuForm, Ingredients: tempArr });
    setmenuForm({ ...menuForm, Ingredient: "" });
  };

  const removeIngredient = (index) => {
    let tempArr = menuForm.Ingredients;
    tempArr.splice(index, 1);
    setmenuForm({ ...menuForm, Ingredients: tempArr });
  };

  const onCategorySave = () => {
    if (!categoryForm.CategoryName) {
      return showToast("Category name required");
    }

    Api.post("/categories/addNew", categoryForm)
      .then((res) => {
        setcategoryForm({ CategoryName: "", Description: "" });
        refRBSheet.current.close();
        showToast("Category Added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCategories = () => {
    Api.get("/categories/getAll")
      .then((res) => {
        setcategories(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onMenuSave = () => {
    let CategoryID = categories.filter(
      (item): any => item?.CategoryName == selectedCategory
    )[0].ID;
    Api.post("/menuItem/addNew", { ...menuForm, CategoryID })
      .then((res) => {
        getMenu();
        showToast("Menu Added !");
        setmenuForm({
          Name: "",
          ItemDescription: "",
          Price: "",
          FoodType: VEG,
          Ingredients: [],
          Ingredient: "",
        });
        refRBSheet.current.close();
      })
      .catch((err) => {
        showToast("Something went wrong !");
      });
  };

  const openBottomSheet = (type) => {
    setBottomSheetType(type);
    if (type == ADD_MENU && !categories.length) getAllCategories();
    refRBSheet.current.open();
  };

  /**
   * @param index head index of category
   * @param subIndex subindex of menu items in category
   */
  const editMenu = (index, subIndex) => {
    refRBSheet.current.open();
    setBottomSheetType(ADD_MENU)
    let singleMenu = menu[index]?.Menu_Items[subIndex];
    let {Name, Description, Price, FoodType, Ingredients} = singleMenu
    setmenuForm({
      Name,
      ItemDescription: Description,
      Price,
      FoodType,
      Ingredients: Ingredients.split(","),
      Ingredient: "",
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header navigation={navigation} />
        {/* Titles */}
        <View style={styles.titlesWrapper}>
          <Text style={styles.titlesSubtitle}>Menu</Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => openBottomSheet(ADD_MENU)}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: marginHorizontal.extraSmall,
              }}
            >
              <View
                style={{
                  paddingHorizontal: marginHorizontal.extraSmall,
                  paddingVertical: spaceVertical.extraSmall - 4,
                  borderRadius: 10,
                  backgroundColor: colors.secondary,
                }}
              >
                <Text style={{ color: "#fff" }}>Add Item</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openBottomSheet(ADD_CATEGORY)}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  paddingHorizontal: marginHorizontal.extraSmall,
                  paddingVertical: spaceVertical.extraSmall - 4,
                  borderRadius: 10,
                  backgroundColor: colors.secondary,
                }}
              >
                <Text style={{ color: "#fff" }}>Add Category</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <RBSheet
          ref={refRBSheet}
          height={600}
          openDuration={250}
          customStyles={{
            container: {
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            },
          }}
        >
          <BottomSheet
            handleCategoryChange={handleCategoryChange}
            onCategorySave={onCategorySave}
            categoryForm={categoryForm}
            type={BottomSheetType}
            BottomSheetTypeObj={BottomSheetTypeObj}
            categories={categories}
            FoodType={FoodType}
            onIngredientSave={onIngredientSave}
            ingredientsArr={menuForm.Ingredients}
            setingredients={(val: string) =>
              setmenuForm({ ...menuForm, Ingredient: val })
            }
            removeIngredient={removeIngredient}
            menuForm={menuForm}
            handleMenuChange={handleMenuChange}
            onMenuSave={onMenuSave}
            selectedCategory={selectedCategory}
            setselectedCategory={setselectedCategory}
          />
        </RBSheet>

        {/* Popular */}
        <View style={styles.popularWrapper}>
          {(menu.length) ? (
            menu.map((item, index) => {
              return <MenuItem item={item} key={index} editMenu={editMenu} index={index}
              />;
            })
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center", height: 500 }}>
              <Text>No menu item added</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titlesWrapper: {
    marginTop: spaceVertical.small,
    paddingHorizontal: marginHorizontal.small,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titlesSubtitle: {
    fontFamily: "Montserrat-Regular",
    fontSize: 20,
    color: colors.textDark,
    marginBottom: spaceVertical.small,
  },
  titlesTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 32,
    color: colors.textDark,
    marginTop: 5,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  search: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: colors.textLight,
    borderBottomWidth: 2,
  },
  searchText: {
    fontFamily: "Montserrat-Semibold",
    fontSize: 14,
    marginBottom: 5,
    color: colors.textLight,
  },
  categoriesWrapper: {
    marginTop: 30,
  },
  categoriesTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    paddingHorizontal: 20,
  },
  categoriesListWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  categoryItemWrapper: {
    backgroundColor: "#F5CA48",
    marginRight: 20,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  categoryItemImage: {
    width: 60,
    height: 60,
    marginTop: 25,
    alignSelf: "center",
    marginHorizontal: 20,
  },
  categoryItemTitle: {
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    marginTop: 10,
  },
  categorySelectWrapper: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    marginBottom: 20,
  },
  categorySelectIcon: {
    alignSelf: "center",
  },
  popularWrapper: {
    paddingHorizontal: 20,
  },
  popularTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  popularCardWrapper: {
    //   backgroundColor: colors.white,
    //   borderRadius: 25,
    //   paddingTop: 20,
    paddingLeft: 20,
    flexDirection: "row",
    overflow: "hidden",
    //   shadowColor: colors.black,
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.05,
    //   shadowRadius: 10,
    //   elevation: 2,
  },
  popularTopWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  popularTopText: {
    marginLeft: 10,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
  },
  popularTitlesWrapper: {
    marginTop: 20,
  },
  popularTitlesTitle: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 14,
    color: colors.textDark,
  },
  popularTitlesWeight: {
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
    color: colors.textLight,
    marginTop: 5,
  },
  popularCardBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: -20,
  },
  addPizzaButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  rating: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 12,
    color: colors.textDark,
    marginLeft: 5,
  },
  popularCardRight: {
    marginLeft: 40,
  },
  popularCardImage: {
    width: 210,
    height: 125,
    resizeMode: "contain",
  },
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
});

export default AddMenu;
