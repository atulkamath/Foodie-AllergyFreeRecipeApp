import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import SearchBar from "../components/SearchBar";
import { Dimensions } from "react-native";
import WavyHeader from "../components/WavyHeader";
import spoonacular from "../src/api/spoonacular";

const SmartSearchScreen = ({ navigation, route }) => {
  const [term, setTerm] = useState("");
  const [Results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const searchApi = async (searchTerm) => {
    try {
      const response = await spoonacular.get(
        `/quickAnswer?q=${term}&apiKey=&/`,
        {
          params: {
            number: 5,
          },
        }
      );

      setResults(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      setErrorMsg("Technical error please restart the app.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {errorMsg ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            backgroundColor: "red",
            color: "white",
          }}
        >
          {errorMsg}
        </Text>
      ) : (
        <></>
      )}

      <View style={styles.container}>
        <WavyHeader customStyles={styles.svgCurve} />
        <Text style={styles.headerText}>
          Ask any nutrition related query's!
        </Text>
        <Text style={{ marginLeft: 5, marginTop: 5 }}>
          Example: Sugar in a cup of coffee
        </Text>
        <SearchBar
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => searchApi(term)}
        />

        {Results.answer != null ? (
          <View style={styles.container2}>
            <View style={styles.card}>
              <Image
                style={styles.profileImg}
                source={{ uri: Results.image }}
              />

              <Text
                style={{ color: "gray", fontSize: 20, textAlign: "center" }}
              >
                {Results.answer}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.headerText2}>No Results found</Text>
        )}
        <Image />
      </View>
    </View>
  );
};

//styling for components
const styles = StyleSheet.create({
  headerContainer: {},
  allergy: {
    marginTop: 50,
  },
  svgCurve: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },

  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    alignItems: "center",
  },

  card: {
    marginTop: 150,
    height: 300,
    width: "80%",
    backgroundColor: "#ecf0f1",
    borderRadius: 15,
    elevation: 10,
    padding: 10,
  },
  profileImg: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: "5%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    position: "absolute",
  },
  resultStyle: {
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 50,
  },
  button: {
    borderColor: "black",
    borderWidth: 1,
    width: 50,
    height: 50,
  },
  btn: {
    backgroundColor: "blue",
  },
  text: {
    fontSize: 20,
    color: "#333333",
  },
  headerContainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    // change the color property for better output
    color: "black",
    textAlign: "center",
    marginTop: 60,
  },
  headerText2: {
    fontSize: 20,
    fontWeight: "bold",
    // change the color property for better output
    color: "black",
    textAlign: "center",
    marginTop: 150,
  },
});

export default SmartSearchScreen;
