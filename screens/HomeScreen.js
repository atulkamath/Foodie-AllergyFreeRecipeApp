import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";

import { List, Provider, Portal } from "react-native-paper";
import FormButton from "../components/FormButton";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import SearchBar from "../components/SearchBar";
import spoonacular from "../src/api/spoonacular";
import ResultsList from "../components/ResultsList";
import Modal from "react-native-modal";
import { AuthContext } from "../navigation/AuthProvider";
import firebase from "../src/firebase/config";
import { AppleHeader } from "@freakycoder/react-native-header-view";
import ProfileHeader from "react-native-profile-header";

const HomeScreen = ({ navigation, route }) => {
  const { register, user } = useContext(AuthContext);
  const [posts, setPosts] = useState(false);
  const [term, setTerm] = useState("");
  const [term2, setTerm2] = useState("");
  const [Results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [type, setTypes] = useState([]);
  const [id1, setId1] = useState();
  const [peanutId, setPeanutId] = useState();
  const [eggId, setEggId] = useState();
  const [seafoodId, setSeafoodId] = useState();
  const [glutenId, setGlutenId] = useState();
  const [wheatId, setWheatId] = useState();

  const userid = user.email;

  var val6;
  var peanutAllergy;
  var eggAllergy;
  var seafoodAllergy;
  var glutenAllergy;
  var wheatAllergy;
  useEffect(() => {
    firebase
      .firestore()
      .collection("userDb")
      .where("userId", "==", user.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          val6 = data.Dairy;
          peanutAllergy = data.Peanut;
          eggAllergy = data.Egg;
          seafoodAllergy = data.Seafood;
          glutenAllergy = data.Gluten;
          wheatAllergy = data.Wheat;
          setStatus(val6);
          setStatus2(peanutAllergy);
          setStatus3(eggAllergy);
          setStatus4(seafoodAllergy);
          setStatus5(glutenAllergy);
          setStatus6(wheatAllergy);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }, []);

  useEffect(() => {
    const fetchFav = async () => {
      try {
        const list = [];
        await firebase
          .firestore()
          .collection("userDb")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const { Dairy, Peanut, Egg, Seafood, Gluten, Wheat } = doc.data();
              //  console.log(doc.data());
              list.push({
                userid: doc.id,
                dairy: Dairy,
                peanut: Peanut,
                egg: Egg,
                seafood: Seafood,
                glutten: Gluten,
                wheat: Wheat,
              });
            });
          });
        setPosts(list);
        if (loading) {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    // searchApi(term);
    fetchFav();
  }, []);
  var val;
  const update = () => {
    // ADD SPONNCULAR USER SEARCH FEATURE FIX PROFILE PAGE AND FIX UPDATE
    firebase
      .firestore()
      .collection("userDb")
      .where("userId", "==", user.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          snapshot.docs.map((doc) => ({ id: doc.id }));
          val = doc.id;
          setId1(val);
          setPeanutId(val);
          setEggId(val);
          setSeafoodId(val);
          setGlutenId(val);
          setWheatId(val);
          firebase
            .firestore()
            .collection("userDb")
            .doc(id1)
            .update({
              Dairy: status,
              Peanut: status2,
              Egg: status3,
              Seafood: status4,
              Gluten: status5,
              Wheat: status6,
            })
            .then(alert("success!!"))
            .catch((err) => {
              console.log("Error getting documents", err);
            });
        });
      });
    searchApi(term);
  };
  useEffect(() => {
    searchApi(term);
  }, []);

  const [userDetails, setUserDetails] = useState("");

  const [status, setStatus] = useState(status); //statuss
  //console.log("stts", status);
  const [status2, setStatus2] = useState(posts);
  const [status3, setStatus3] = useState(false);
  const [status4, setStatus4] = useState(false);
  const [status5, setStatus5] = useState(false);
  const [status6, setStatus6] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [expanded, setExpanded] = React.useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  var id;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  var intol = "";
  var intol2 = "";
  var intol3 = "";
  var intol4 = "";
  var intol5 = "";
  var intol6 = "";

  if (status) {
    intol = "Dairy";
    // console.log(status);
  } else {
    intol = "";
  }

  if (status2) {
    intol2 = "Peanut";
    // console.log("s2 " + status2);
  } else {
    intol2 = "";
  }
  if (status3) {
    intol3 = "Egg";
    // console.log("s2 " + status2);
  } else {
    intol3 = "";
  }
  if (status4) {
    intol4 = "Seafood";
    // console.log("s2 " + status2);
  } else {
    intol4 = "";
  }
  if (status5) {
    intol5 = "Gluten";
    // console.log("s2 " + status2);
  } else {
    intol5 = "";
  }
  if (status6) {
    intol6 = "Wheat";
    // console.log("s2 " + status2);
  } else {
    intol6 = "";
  }

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  //api configuration

  const searchApi = async (searchTerm) => {
    try {
      const response = await spoonacular.get(
        `/complexSearch?intolerances=${intol},${intol2},${intol3},${intol4},${intol5},${intol6}&apiKey=&/`,
        {
          params: {
            query: term,
            number: 5,
          },
        }
      );

      setResults(response.data.results);
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
            marginTop: 50,
          }}
        >
          {errorMsg}
        </Text>
      ) : (
        <Text></Text>
      )}
      <ProfileHeader
        titleText="Home Page"
        disableLeftAlignedButton
        disableFirstIcon
        disableSecondIcon
        disableThirdIcon
        profileImageSource={require("../assets/user.png")}
        style={{ marginTop: 50 }}
        onProfilePicPress={() => navigation.navigate("Profile")}
      />
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />

      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          color:
            status || status2 || status3 || status4 || status5 || status6
              ? "green"
              : "red",
        }}
      >{` ${
        status2 || status || status3 || status4 || status5 || status6
          ? "Allergens Applied!"
          : "Warning no allergen selected"
      }`}</Text>

      <Modal isVisible={isModalVisible}>
        <View style={styles.main2}>
          <Text>Hello!</Text>
          <Text
            style={{
              fontSize: 22,
              position: "absolute",
              marginTop: 100,
              color: "white",
            }}
          >
            Select your allergens for allergy free recipes!
          </Text>
          <Image
            style={{
              width: "40%",
              height: "10%",
              marginTop: 140,
            }}
            source={require("../assets/arrow.png")}
          />
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>

      {/* <List.Section></List.Section> */}
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
          title="Apply Filters"
          onPress={() => update()}
        ></Button>
      </List.Accordion>

      <View>
        <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 10 }}>
          {` ${setTerm ? "" : "Meals of the day"}`}
        </Text>
        {loading ? (
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            <SkeletonPlaceholder>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 6,
                    height: 220,
                    width: 300,
                    borderRadius: 10,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                />
              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    height: 220,
                    width: 300,
                    borderRadius: 10,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                />
              </View>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    height: 220,
                    width: 300,
                    borderRadius: 30,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </ScrollView>
        ) : (
          <ResultsList
            navigation={navigation}
            Title="Recipes below"
            Results={Results}
          />
        )}
      </View>
      {Results.length < 1 ? (
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 550,
            position: "absolute",
            marginLeft: 32,
          }}
        >
          No results found, try changing allergy parameters
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
};

//styling for components
const styles = StyleSheet.create({
  main: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    opacity: 0.5,
  },
  main2: {
    height: "100%",
    width: "100%",
  },
  arrow1: {
    maxWidth: 100,
    position: "relative",
  },
  container: {
    flex: 1,
    backgroundColor: "#00ff00",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
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
});

export default HomeScreen;
