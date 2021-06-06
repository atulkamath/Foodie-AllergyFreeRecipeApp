import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import { AuthContext } from "../navigation/AuthProvider";
import FormButton from "../components/FormButton";
import firebase from "../src/firebase/config";

const ProfileScreen = ({ route }) => {
  const { user, logout } = useContext(AuthContext);
  const [data, setData] = useState();
  const [data2, setData2] = useState();

  useEffect(() => {
    firebase
      .firestore()
      .collection("userDb")
      .where("userId", "==", user.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          setData(data.firstName);
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }, []);

  useEffect(() => {
    fetch("https://api.spoonacular.com/food/trivia/random?apiKey=&/")
      .then((response) => response.json())
      .then((json) => setData2(json.text))
      .catch((error) => console.error(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          width: 80,
          height: 80,
          marginTop: 100,
        }}
        source={require("../assets/user.png")}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.text,
              { fontWeight: "200", fontSize: 36, textAlign: "center" },
            ]}
          >
            Hi {data} !
          </Text>

          <Text style={[{ textAlign: "center", fontSize: 26, marginTop: 30 }]}>
            Fun Food fact!
          </Text>
          <Text
            style={[
              styles.text,
              {
                fontWeight: "200",
                marginTop: 20,
                fontSize: 20,
                textAlign: "center",
                textAlign: "justify",
                maxWidth: 300,
                marginLeft: 15,
              },
            ]}
          >
            {data2}
          </Text>
        </View>

        <View
          style={{
            maxWidth: 400,
            textAlign: "center",
            marginTop: "50%",
            marginLeft: "10%",
          }}
        >
          <FormButton
            backgroundColor="#38798C"
            buttonTitle="Log Out"
            onPress={() => logout()}
            icon="ios-log-out"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
//styling for components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,

    backgroundColor: "white",
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },

  infoContainer: {
    width: "100%",
    height: "30%",
    marginTop: 70,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  btn: {
    backgroundColor: "blue",
    textAlign: "center",
    alignSelf: "center",
    width: "50%",
    height: "30%",
    margin: 40,
    borderRadius: 40,
  },
});

export default ProfileScreen;
