import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import Conditional from "../components/Conditional";
import Header from "../components/Header";
import Orders from "../components/Home/Orders";
import { AuthContext } from "../contexts/auth.context";
import { colors, marginHorizontal, spaceVertical } from "../styles/variables";
import Api from "../utility/API";
import { showToast } from "../utility/commonUtility";
import { useIsFocused } from "@react-navigation/native";
import Splash from "../components/Splash";

function Home({ navigation }) {
  const isFocused = useIsFocused();
  const [orders, setorders] = useState([]);
  const [loader, setloader] = useState(false);

  let orderTypes = {
    PENDING: "Pending",
    FINISHED: "Finished",
  };
  let { PENDING, FINISHED } = orderTypes;

  const [activeType, setactiveType] = useState(PENDING);

  //get all orders
  const getAllOrders = () => {
    Api.get(`/foodOrder/getOrder/${activeType}`)
      .then((res) => {
        setorders(res.data.data);
        setloader(true);
      })
      .catch((err) => {
        console.log(err, "this is error");
      });
  };

  useEffect(() => {
    setloader(false);
    getAllOrders();
    return () => {};
  }, [isFocused, activeType]);

  /**
   * @Order_Updated
   */
  const orderFinished = (id) => {
    Api.get(`/foodOrder/updateOrder/${id}`)
      .then((res) => {
        showToast("Order updated");
        getAllOrders();
        console.log(res, "this  is response");
      })
      .catch((err) => {
        console.log(err, "this is err");
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Header navigation={navigation} />

        <View style={{ flexDirection: "row", marginVertical: spaceVertical.extraSmall }}>
          <TouchableOpacity
            onPress={() => setactiveType(PENDING)}
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
                backgroundColor:
                  activeType == PENDING ? colors.secondary : colors.textLight,
              }}
            >
              <Text style={{ color: "#fff" }}>Pending</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setactiveType(FINISHED)}
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
                backgroundColor:
                  activeType == FINISHED ? colors.secondary : colors.textLight,
              }}
            >
              <Text style={{ color: "#fff" }}>Finished</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Conditional condition={loader} elseComponent={<Splash />}>
          <Conditional condition={orders.length} elseComponent={null}>
            <>
              {orders.map((order, index) => {
                return (
                  <Orders
                    order={order}
                    key={index}
                    orderFinished={orderFinished}
                    activeType={activeType}
                    orderTypes={orderTypes}
                  />
                );
              })}
            </>
          </Conditional>
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
  tabbar: {
    backgroundColor: "#3f51b5",
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: "#ffeb3b",
  },
  label: {
    fontWeight: "400",
  },
});

export default Home;
