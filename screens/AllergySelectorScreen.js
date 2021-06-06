import React, { useState, useContext } from "react";
import { View, StyleSheet, Button, Text, StatusBar } from "react-native";
import { List } from "react-native-paper";
import { Dimensions } from "react-native";
import WavyHeader from "../components/WavyHeader";
import { AuthContext } from "../navigation/AuthProvider";
import firebase from "../src/firebase/config";

const AllergySelectorScreen = ({ navigation, route }) => {
  const [status, setStatus] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [status3, setStatus3] = useState(false);
  const [status4, setStatus4] = useState(false);
  const [status5, setStatus5] = useState(false);
  const [status6, setStatus6] = useState(false);

  console.log(route.params);

  const { register } = useContext(AuthContext);
  const addProduct = async () => {
    firebase
      .firestore()
      .collection("userDb")
      .add({
        firstName: route.params.moveName,
        userId: route.params.moveMail,
        Dairy: status,
        Peanut: status2,
        Egg: status3,
        Seafood: status4,
        Gluten: status5,
        Wheat: status6,
      })

      .then(() => {
        register(route.params.moveMail, route.params.movePass);
        alert("Your Preferences have been saved.");
        // setLike(null);
      })
      .catch((error) => {
        console.log("Something went wrong with this.", error);
      });
  };

  return (
    //
    <View style={styles.container}>
      <WavyHeader customStyles={styles.svgCurve} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Hi There! Please select the food items you are allergic to.
        </Text>
      </View>
      <View style={styles.allergy}>
        <List.Section>
          <List.Accordion
            title="Allergy Filters"
            left={(props) => <List.Icon {...props} icon="food-off" />}
          >
            <Button
              onPress={() => setStatus(!status)}
              title={`Prevent Dairy: ${status ? "on  " : "off"}`}
            ></Button>
            <Button
              onPress={() => setStatus2(!status2)}
              title={`Prevent Peanut: ${status2 ? "on  " : "off"}`}
            ></Button>
            <Button
              onPress={() => setStatus3(!status3)}
              title={`Prevent Egg: ${status3 ? "on  " : "off"}`}
            ></Button>
            <Button
              onPress={() => setStatus4(!status4)}
              title={`Prevent Seafood: ${status4 ? "on  " : "off"}`}
            ></Button>
            <Button
              onPress={() => setStatus5(!status5)}
              title={`Prevent Gluten: ${status5 ? "on  " : "off"}`}
            ></Button>
            <Button
              onPress={() => setStatus6(!status6)}
              title={`Prevent Wheat: ${status6 ? "on  " : "off"}`}
            ></Button>
            <Button
              color="#27A380"
              title="Lets Go!"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                addProduct();
              }}
            />
          </List.Accordion>
        </List.Section>
      </View>
    </View>
  );
};

//styling for components
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 10,
  },
  allergy: {
    marginTop: 50,
  },
  svgCurve: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    // change the color property for better output
    color: "white",
    textAlign: "center",
    marginTop: 35,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default AllergySelectorScreen;
