import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import Icon from "react-native-vector-icons/Ionicons";
const FormButton = ({ buttonTitle, backgroundColor, color, icon, ...rest }) => {
  let bgColor = backgroundColor; // this receives color from styles on line 8

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: bgColor }]}
      {...rest}
    >
      <View style={styles.iconStyle}>
        <Icon name={icon} color={color} size={25}></Icon>
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignContent: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "90%",
    height: windowHeight / 15,
    flexDirection: "row",
    borderRadius: 25,
  },
  btnTxtWrapper: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    paddingRight: 20,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    marginRight: "15%",
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default FormButton;
