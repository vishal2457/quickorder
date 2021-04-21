import AsyncStorage from "@react-native-async-storage/async-storage";
import * as axios from "axios";
import { API_URL, TOKEN_PREFIX } from "./commonUtility";

const fetchClient = () => {

  const defaultOptions = {
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (config) => {
      try {
        const token = await AsyncStorage.getItem(TOKEN_PREFIX);
        config.headers.Authorization = token ? token : null;
      } catch (error) {
          console.log(error);
      }
      return config;
  

  });

  instance.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err?.response?.status === 401) {
        AsyncStorage.removeItem(TOKEN_PREFIX)
      }
    return Promise.reject(err);
    }
  );

  return instance;
};

export default fetchClient();
