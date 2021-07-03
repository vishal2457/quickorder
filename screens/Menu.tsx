import React, { useEffect, useRef, useState } from "react";
//@ts-ignore
import Header from "../components/Header.tsx";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { colors, marginHorizontal, spaceVertical } from "../styles/variables";
import RBSheet from "react-native-raw-bottom-sheet";
import Api from "../utility/API";
import BottomSheet from "../components/Menu/BottomSheet";
import { showToast } from "../utility/commonUtility";
import MenuItem from "../components/Menu/MenuItem";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Conditional from "../components/Conditional";
import Splash from "../components/Splash";

function Menu({ navigation }) {
  const refRBSheet: any = useRef();

  let BottomSheetTypeObj = {
    ADD_CATEGORY: "ADD_CATEGORY",
    ADD_MENU: "ADD_MENU",
  };

  let formTypeObj = {
    ADD_FORM: "ADD_FORM",
    EDIT_FORM: "EDIT_FORM",
  };
  let { ADD_FORM, EDIT_FORM } = formTypeObj;

  let FoodType = {
    VEG: "Veg",
    NON_VEG: "NonVeg",
  };
  let { VEG, NON_VEG } = FoodType;

  let { ADD_CATEGORY, ADD_MENU } = BottomSheetTypeObj;

  const [BottomSheetType, setBottomSheetType] = useState(ADD_CATEGORY);

  const [categoryForm, setcategoryForm] = useState({
    CategoryName: "",
    Description: "",
  });

  const [formType, setformType] = useState(ADD_FORM);
  const [menu, setmenu] = useState<any[]>([]);
  const [loading, setloading] = useState(false);

  /**
   * @Useeffect
   */
  useEffect(() => {
    getMenu();
    return () => {};
  }, []);

  function getMenu() {
    setloading(true);
    Api.get("/menuItem/getAll")
      .then((result) => {        
        setmenu(result?.data?.data);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
      });
  }

  /**
   * @Handle_Category_Change
   */
  const handleCategoryChange = (val: string, name: any) => {
    setcategoryForm({ ...categoryForm, [name]: val });
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
        getMenu()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * @param type type of sheet to open ADD | CATEGORY
   * opens add form for category and menu item
   */
  const openBottomSheet = (type) => {
    setBottomSheetType(type);
    refRBSheet.current.open();
  };

  const addMenu = () => {
  //  openBottomSheet(ADD_MENU);
   navigation.navigate("AddMenu")
  }



  /**
   * @param index head index of category
   * @param subIndex subindex of menu items in category
   */
  const editMenu = (index, subIndex) => {
    let singleMenu = menu[index]?.Menu_Items[subIndex];
   navigation.navigate("AddMenu",{
    itemId: singleMenu?.ID,
    itemData: singleMenu,
  })

  
   
    
  // seteditID(singleMenu?.ID)    
  //   let { Name, Description, Price, FoodType, Ingredients } = singleMenu;
   
  };

  const NoMenuItem = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 500,
        }}
      >
        <Text>No menu item added</Text>
      </View>
    );
  };

 

  return (
    <View style={styles.container}>
         {/* Header */}
         <Header navigation={navigation} />
  
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
        >
       
          {/* Titles */}
          <View style={styles.titlesWrapper}>
            <Text style={styles.titlesSubtitle}>Menu</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={addMenu}
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
              formTypeObj={formTypeObj}
              formType={formType}
            />
          </RBSheet>

          {/* Popular */}
          <Conditional condition={!loading} elseComponent={<Splash />}>
          <View style={styles.popularWrapper}>
            <Conditional condition={menu.length} elseComponent={<NoMenuItem />}>
              <>
                {menu.map((item, index) => {
                  return (
                    <MenuItem
                      item={item}
                      key={index}
                      editMenu={editMenu}
                      index={index}
                    />
                  );
                })}
              </>
            </Conditional>
          </View>
          </Conditional>
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

export default Menu;
