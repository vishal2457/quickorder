import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, ToastAndroid, Text } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";

import Header from "../components/Header";
import { AuthContext } from "../contexts/auth.context";
import QRCode from "react-native-qrcode-svg";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { colors, marginHorizontal, spaceVertical } from "../styles/variables";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLACE_SLUG, WEB_URL } from "../utility/commonUtility";

function Qr({ navigation }) {
  const { authState } = useContext(AuthContext);
  const [svg, setsvg] = useState("");
  const [slug, setslug] = useState(null)
  useEffect(() => {

    (async () => {
      try {
        const tempSlug:any = await AsyncStorage.getItem(PLACE_SLUG);
        setslug(tempSlug)
      } catch (error) {
          console.log(error);
      }
    })()


  
    return () => {};
  }, []);

  const setdata = (c) => {
    if (!c) return;
    c.toDataURL((data) => {
      setsvg(data);
    });
  };

  function getFileUri() {
    return FileSystem.documentDirectory + `demo.png`;
  }

  const saveQr = async () => {
    const fileUri = getFileUri();

    await FileSystem.writeAsStringAsync(fileUri, svg, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await Sharing.shareAsync(fileUri);
  };

  return (
    <View>
      <Header navigation={navigation} />
    <View
     style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: spaceVertical.small,
      }}
    ><Text>Scan this qr code to view your menu.</Text></View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "75%",
        }}
      >
        <QRCode
          size={300}
          value={`${WEB_URL}`}
          getRef={(c) => setdata(c)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: spaceVertical.small,
        }}
      >
        <TouchableOpacity onPress={saveQr}>
          <View
            style={{
              paddingHorizontal: marginHorizontal.extraSmall,
              paddingVertical: spaceVertical.extraSmall - 4,
              borderRadius: 10,
              backgroundColor: colors.secondary,
            }}
          >
            <Text style={{ color: "#fff" }}>Save QR Code</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Qr;
