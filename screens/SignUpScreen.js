import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
import firebase from "../src/firebase/config";
const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const { user, register } = useContext(AuthContext);
  const [userList, setUserList] = useState();

  const moveData = () => {
    if ((email, firstName, pass == undefined)) {
      alert("please check all the fields.");
    } else if (pass.length < 6) {
      alert("Please enter a stronger password");
    } else {
      navigation.navigate("Allergy", {
        moveMail: email,
        moveName: firstName,
        movePass: pass,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>Register</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email Id"
          icon="ios-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormInput
          labelValue={firstName}
          onChangeText={(name) => setFirstName(name)}
          placeholderText="First Name"
          icon="ios-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormInput
          labelValue={pass}
          onChangeText={(userPass) => setPass(userPass)}
          placeholderText="Password"
          icon="ios-lock"
          secureTextEntry={true}
        />
        <View style={{ marginLeft: 30 }}>
          <FormButton
            backgroundColor="#38798C"
            buttonTitle="Sign Up"
            onPress={() => moveData()}
            icon="ios-log-in"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    paddingBottom: 100,
    fontSize: 40,
  },
  newDesign: {
    color: "#20b2aa",
    fontWeight: "bold",
    marginTop: 30,
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    height: 200,
    width: 200,
    resizeMode: "cover",
  },
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 10,
  },
});

export default SignUpScreen;
