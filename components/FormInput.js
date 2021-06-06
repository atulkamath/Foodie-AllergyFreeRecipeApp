import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, TextInput, View } from "react-native";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import Icon from "react-native-vector-icons/Ionicons";
const FormInput = ({ labelValue, placeholderText, icon, ...rest }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <Icon name={icon} size={25}></Icon>
      </View>
      <TextInput
        style={styles.input}
        value={labelValue}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    height: windowHeight / 15,
    borderColor: "#ccc",
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  iconStyle: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FormInput;
