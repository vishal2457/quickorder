import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { colors, marginHorizontal } from "../../styles/variables";
import * as Animatable from "react-native-animatable";

function RegisterForm() {
  return (
    <>
      <Text style={styles.text_footer}>Cafe/Restaurant name</Text>
      <View style={styles.action}>
        <Feather name="coffee" color="#05375a" size={20} />
        <TextInput
          placeholder="cafe/restaurant name"
          style={styles.textInput}
          autoCapitalize="none"
          // onChangeText={(val) => textInputChange(val)}
        />
        {true ? (
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View>
        ) : null}
      </View>
      <Text   style={[
          styles.text_footer,
          {
            marginTop: marginHorizontal.small,
          },
        ]}>Cafe/restaurant slug</Text>
      <View style={styles.action}>
        <FontAwesome name="spoon" color="#05375a" size={20} />
        <TextInput
          placeholder="Unique name for your place"
          style={styles.textInput}
          autoCapitalize="none"
          // onChangeText={(val) => textInputChange(val)}
        />
        {true ? (
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View>
        ) : null}
      </View>

      <Text
        style={[
          styles.text_footer,
          {
            marginTop: marginHorizontal.small,
          },
        ]}
      >
        Password
      </Text>
      <View style={styles.action}>
        <Feather name="lock" color="#05375a" size={20} />
        <TextInput
          placeholder="Your Password"
          // secureTextEntry={data.secureTextEntry ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          // onChangeText={(val) => handlePasswordChange(val)}
        />
        <TouchableOpacity>
          {true ? (
            <Feather name="eye-off" color="grey" size={20} />
          ) : (
            <Feather name="eye" color="grey" size={20} />
          )}
        </TouchableOpacity>
      </View>

      <Text
        style={[
          styles.text_footer,
          {
            marginTop: marginHorizontal.small,
          },
        ]}
      >
        Confirm Password
      </Text>
      <View style={styles.action}>
        <Feather name="lock" color="#05375a" size={20} />
        <TextInput
          placeholder="Confirm Your Password"
          secureTextEntry={true}
          style={styles.textInput}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => {}}>
          {true ? (
            <Feather name="eye-off" color="grey" size={20} />
          ) : (
            <Feather name="eye" color="grey" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By signing up you agree to our
        </Text>
        <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
          {" "}
          Terms of service
        </Text>
        <Text style={styles.color_textPrivate}> and</Text>
        <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
          {" "}
          Privacy policy
        </Text>
      </View>
     
    </>
  );
}

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
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});

export default RegisterForm;
