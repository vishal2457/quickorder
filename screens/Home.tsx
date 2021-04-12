import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../contexts/auth.context";
import { TOKEN_PREFIX } from "../utility/commonUtility";

function Home({ navigation }) {
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    navigation.addListener('focus', () => {        
      
      });
    return () => {};
  }, [authState.isAuthenticated]);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_PREFIX);
      navigation.navigate('Auth')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Home</Text>
      {authState.isAuthenticated ?   <Button title="Logout" onPress={logout} /> :  <Button title="Login" onPress={logout} /> }
    
    </View>
  );
}

export default Home;
