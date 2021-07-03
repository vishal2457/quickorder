// import * as BarCodeScanner from 'expo-barcode-scanner';
import { BlurView } from 'expo-blur';
// import { throttle } from 'lodash';
// import React, { useState } from 'react';
import {  Platform, StatusBar} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera } from 'expo-camera';
import QRFooterButton from '../components/QRFooterButton';
import QRIndicator from '../components/QrIndicator';
import Api from "../utility/API";
import { showToast } from '../utility/commonUtility';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App(props) {
  const [hasPermission, setHasPermission]:any = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLit, setLit] = React.useState(false);


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const _handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let {orderNo, userid} = JSON.parse(data)
        Api.post("/foodOrder/confirmOrder", {orderNo, userid})
        .then(res => {
          showToast("Order taken successfully");
          props.navigation.navigate("Home")
        })
        .catch(err => console.log(err, "this is err"))
  };

    const onFlashToggle = React.useCallback(() => {
    setLit(isLit => !isLit);
  }, []);


  const onCancel = React.useCallback(() => {
    if (Platform.OS === 'ios') {
      props.navigation.pop();
    } else {
      props.navigation.goBack(null);
    }
  }, []);
  const { top, bottom } = useSafeAreaInsets();


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
 
    <View style={styles.container}>
           {/* {state.isVisible ? ( */}
            <Camera
              barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
              }}
              onBarCodeScanned={_handleBarCodeScanned}
              style={StyleSheet.absoluteFill}
              flashMode={isLit ? 'torch' : 'off'}
            />
       
    
          <View style={[styles.header, { top: 40 + top }]}>
            <Hint>Scan a QR code to take order</Hint>
          </View>
    
          <QRIndicator />
    
          <View style={[styles.footer, { bottom: 30 + bottom }]}>
            <QRFooterButton onPress={onFlashToggle} isActive={isLit} iconName="ios-flashlight" />
            <QRFooterButton onPress={onCancel} iconName="ios-close" iconSize={48} />
          </View>
    
          <StatusBar barStyle="light-content" backgroundColor="#000" />
        </View>
  );
}

function Hint({ children }: { children: string }) {
  return (
    <BlurView style={styles.hint} intensity={100} tint="dark">
      <Text style={styles.headerText}>{children}</Text>
    </BlurView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
  },
});