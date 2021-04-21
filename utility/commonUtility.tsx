import { ToastAndroid } from "react-native";

export const TOKEN_PREFIX = "QUICK_ORDER";
export const API_URL = "http://192.168.0.107:5000"

export const showToast = (msg: string) => {
return  ToastAndroid.showWithGravityAndOffset(
    msg,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
}

export let FoodType = {
  VEG: "Veg",
  NON_VEG: "NonVeg",
};