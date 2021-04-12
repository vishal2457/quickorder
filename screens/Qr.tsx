import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native';
import { AuthContext } from '../contexts/auth.context';

function Qr() {
    const {authState} = useContext(AuthContext);

    useEffect(() => {
       console.log(authState);
       
        return () => {
            
        }
    }, [])

    return (
        <View>
            <Text>Qr</Text>
        </View>
    )
}

export default Qr
