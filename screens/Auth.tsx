import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { colors, fontSize } from "../styles/variables";
import RegisterForm from "../components/Auth/RegisterForm";
import LoginForm from "../components/Auth/LoginForm";
import SignupButton from "../components/Auth/SignupButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_PREFIX } from "../utility/commonUtility";

const Auth = ({ navigation }) => {
  let formTypeObj = { LOGIN: "LOGIN", REGISTER: "REGISTER" };
  const [formType, setformType] = useState(formTypeObj.LOGIN);

  const onLogin = async () => {
 await AsyncStorage.setItem(TOKEN_PREFIX, "Token");
navigation.navigate("Qr")
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.header}>
        {formType == formTypeObj.LOGIN ? (
          <Text style={styles.text_header}>Login Now!</Text>
        ) : (
          <Text style={styles.text_header}>Register Now!</Text>
        )}

        <Text style={styles.subHeader}>Make Food Ordering Contact Less.</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {formType == formTypeObj.LOGIN ? <LoginForm /> : <RegisterForm />}

          {formType == formTypeObj.LOGIN ? (
            <SignupButton title={`LOGIN`} onPress={onLogin} />
          ) : (
            <SignupButton title={`REGISTER`} onPress={() => {}} />
          )}
          <View>
            <Text>OR</Text>
          </View>
          {formType == formTypeObj.LOGIN ? (
            <SignupButton title={`REGISTER`} onPress={() => setformType(formTypeObj.REGISTER)} />
          ) : (
            <SignupButton title={`LOGIN`} onPress={() => setformType(formTypeObj.LOGIN)} />
          )}
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  subHeader: {
    fontSize: fontSize.extraSmall,
    color: "#fff",
  },
});
