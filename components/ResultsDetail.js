import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card } from "native-base";
const ResultsDetail = ({ Result, Results, onDelete }) => {
  return (
    <View style={styles.resultStyle}>
      <Card style={styles.image2}>
        <Image style={styles.image} source={{ uri: Result.image }} />
        <Text style={styles.textStyle}>{Result.title}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 220,
    width: 300,
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  image2: {
    paddingBottom: 25,
    borderRadius: 30,
  },
  resultStyle: {
    paddingBottom: 10,
    alignSelf: "center",
    width: "100%",
    overflow: "hidden",
  },
  textStyle: {
    fontSize: 18,
    maxWidth: 300,
    textAlign: "center",
    marginTop: 10,
  },
});

export default ResultsDetail;
