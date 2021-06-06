import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { List, Provider, Portal } from "react-native-paper";
import SearchBar from "../components/SearchBar";
import spoonacular from "../src/api/spoonacular";
import ResultsList from "../components/ResultsList";

const HomeScreen1 = ({ navigation, route }) => {

  const [term, setTerm] = useState("");
  const [Results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const searchApi = async (searchTerm) => {
    try {
      const response = await spoonacular.get(
        `/findByIngredients?ingredients=${term}&apiKey=&/`,
        {
          params: {
            number: 5,
            // intolerances: ter,
          },
        }
      );

      setResults(response.data);
    } catch (err) {
      console.log(err);
      setErrorMsg("error smtg wrong");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          backgroundColor: "yellow",
          color: "black",
        }}
      >
        Experimental Feature, Allergens may appear!
      </Text>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Enter ingredients from your fridge and get recipes!
        </Text>
        <Text style={styles.headerText2}>
          Please seperate the ingredients by a comma ( , )
        </Text>
      </View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />

      <Text>{errorMsg}</Text>

      <ResultsList
        navigation={navigation}
        Title="Recipes below"
        Results={Results}
      />
    </View>
  );
};

//styling for components
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "blue",
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
    marginTop: 10,
  },
  headerText2: {
    fontSize: 15,
    // change the color property for better output
    color: "black",
    borderColor: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default HomeScreen1;
