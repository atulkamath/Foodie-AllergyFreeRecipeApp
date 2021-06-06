import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../navigation/AuthProvider";
import ResultsDetail from "../components/ResultsDetail";
import firebase from "../src/firebase/config";
const FavoriteScreen = ({ route, navigation, Results }) => {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchFav = async () => {
      try {
        const list = [];
        await firebase
          .firestore()
          .collection("likes")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const { image, title, like } = doc.data();
              list.push({
                id: doc.id,
                image,
                title,
                like,
              });
            });
            console.log("total fav:", list);
          });
        setPosts(list);
      } catch (e) {
        console.log(e);
      }
    };
    fetchFav();
  }, []);

  return (
    <View>
      {/* {posts.like > 0 ? ( */}
        <FlatList
          contentContainerStyle={{ alignSelf: "center" }}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            //  console.log("post",item);
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
      {/* ) : (
        <Text>empty</Text>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default FavoriteScreen;
