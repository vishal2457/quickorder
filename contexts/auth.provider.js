import React, {useState, useEffect} from "react";
import { TOKEN_PREFIX } from "../utility/commonUtility";
import { AuthContext } from "./auth.context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = () => {
    setAuthenticated(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem(TOKEN_PREFIX);
        if (token) {
          setAuthenticated(true);
        } else if (token === null) {
          setAuthenticated(false);
        }
      } catch (error) {
        setAuthenticated(false);
      }
    })();
    return () => {};
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
};
