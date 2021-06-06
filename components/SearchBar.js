import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.background}>
      <Ionicons name="ios-search" size={30} style={styles.iconStyle} />
      <TextInput
        style={styles.textStyle}
        placeholder="Search"
        value={term} //text input knows exact value
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F0EEEE",
    borderRadius: 10,
    height: 40,
    marginHorizontal: 12,
    marginTop:20,
    flexDirection: "row",
  },
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    alignSelf: "center",
  },

  textStyle: {
    flex: 1,
    alignSelf: "stretch",
  },
});
export default SearchBar;
