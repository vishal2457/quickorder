import { ToastAndroid } from "react-native";

export const TOKEN_PREFIX = "QUICK_ORDER";
export const API_URL = "http://expolyst.com:5050"
// export const API_URL = "http://192.168.29.193:5000"
export const PLACE_SLUG = "PLACE_SLUG";
export const WEB_URL = "http://backup.expolyst.com"
// export const API_URL = "https://stormy-brushlands-91278.herokuapp.com";


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

export const getDateDetail = (incomingDate: any) => {
  let date = new Date(incomingDate)
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  //@ts-ignore
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};