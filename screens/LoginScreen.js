import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";

const LoginScreen = ({ navigation, route }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/nutrition-healthy-food-icon-vector-12208624-removebg-preview.png")}
        style={styles.img}
      />
      <Text style={styles.textStyle}>Foodie</Text>
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
          labelValue={pass}
          onChangeText={(userPass) => setPass(userPass)}
          placeholderText="Password"
          icon="ios-lock"
          secureTextEntry={true}
        />
        <View style={{ marginLeft: 30 }}>
          <FormButton
            backgroundColor="#38798C"
            buttonTitle="Log In"
            onPress={() => login(email, pass)}
            icon="ios-log-in"
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <View style={{ marginLeft: 40 }}>
            <Text style={styles.newDesign}>
              No account? Click here to make one.
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotDesign: {
    fontWeight: "bold",
    color: "#20b2aa",
    marginTop: 30,
    fontSize: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  newDesign: {
    color: "#20b2aa",
    fontWeight: "bold",
    marginTop: 25,
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    marginTop: 5,
    height: 200,
    width: 200,
    resizeMode: "cover",
  },
  container: {
    backgroundColor: "white",
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default LoginScreen;
