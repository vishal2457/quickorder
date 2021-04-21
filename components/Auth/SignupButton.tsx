import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { colors } from '../../styles/variables';

function SignupButton({title, onPress}) {
    return (
        <View style={styles.button}>
        <TouchableOpacity
            style={styles.signIn}
            onPress={onPress}
            activeOpacity={0.8}
        >
        <LinearGradient
            colors={[ colors.secondary, colors.secondary]}
            style={styles.signIn}
        >
            <Text style={[styles.textSign, {
                color:'#fff'
            }]}>{title}</Text>
        </LinearGradient>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

export default SignupButton;
