import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native';
import Header from '../components/Header';
import { AuthContext } from '../contexts/auth.context';

function Qr({navigation}) {
    const {authState} = useContext(AuthContext);

    useEffect(() => {
       console.log(authState);
       
        return () => {
            
        }
    }, [])

    return (
        <View>
      <Header navigation={navigation} />

            <Text>Qr</Text>
        </View>
    )
}

export default Qr
