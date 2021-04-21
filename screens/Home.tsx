import React from "react";
import { Button, Text, View, ToastAndroid, } from "react-native";
import Header from "../components/Header";
import { AuthContext } from "../contexts/auth.context";

function Home({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  const logout = async () => {
    signOut()
  };

  return (
    <View>
      <Header navigation={navigation} />
      <Button title="Logout" onPress={logout} />
    
    </View>
  );
}

export default Home;
