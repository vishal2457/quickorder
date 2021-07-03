import React from 'react'
import {StyleSheet, Text, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { spaceVertical } from '../../styles/variables';

function SingleOrder({item}) {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>{item?.Quantity} x {item.Menu_Item.Name}</Text>
            <View style={{flexDirection: 'row'}}>
            <FontAwesome
                name="rupee"
                color="#05375a"
                size={15}
                style={{ marginRight: 3, fontWeight: "200", marginTop: 3 }}
              />
               <Text style={styles.textStyle}>{item.Amount}</Text>
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
   container: {
       flexDirection: "row",
       justifyContent: "space-between",
       marginVertical: spaceVertical.extraSmall -5
   },
   textStyle: {
       fontSize: 18,
       fontWeight: "600"
   }
  });
  

export default SingleOrder
