import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import ResultsDetail from "../components/ResultsDetail";

const ResultsList = ({ Title, Results, dta, navigation }) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={{ alignSelf: "center", paddingBottom: 400 }}
        data={Results}
        keyExtractor={(Result) => Result.id.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ResultsShowScreen", {
                    id: item.id,
                    image: item.image,
                    title: item.title,
                  });
                }}
              >
                <ResultsDetail Result={item} />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  container: {
    backgroundColor: "white",
  },
});

export default ResultsList;
