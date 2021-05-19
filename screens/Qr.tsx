import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import Header from "../components/Header";
import { AuthContext } from "../contexts/auth.context";
import QRCode from 'react-native-qrcode-svg';

function Qr({ navigation }) {
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    console.log(authState);

    return () => {};
  }, []);

  return (
    <View>
      <Header navigation={navigation} />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
            height: "90%"
        }}
      >
    
          <QRCode
           size={300}
      value="http://192.168.0.110:3002/teapost"
    
    />
      </View>
    </View>
  );
}

export default Qr;
