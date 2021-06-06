import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  StyleSheet,
  Animated,
} from "react-native";

import Axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
export default ResultsShowScreenSteps = ({ route, navigation, results }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const SPACING = 20;
  const Avatar_Size = 70;
  const ITEM_SIZE = Avatar_Size + SPACING * 3;

  const scrollY = React.useRef(new Animated.Value(0)).current;
  const scrollY2 = React.useRef(new Animated.Value(0)).current;
  var id = route.params.id;

  useEffect(() => {
    Axios.get(
      `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=`
    )
      .then(({ data }) => {
        setData(data.ingredients);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const [data2, setData2] = useState([]);
  useEffect(() => {
    Axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=`)
      .then(({ data }) => {
        setData2(data.analyzedInstructions[0].steps);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  const agregarFavoritos = () => {
    navigation.navigate("Favorite", {
      ingredients: data,
      steps: data2,
    });
    setEstado(!estado);
  };
  return (
    <View style={{ flex: 1, padding: 5, backgroundColor: "#fff" }}>
      <Text style={styles.header}>{route.params.title}</Text>
      <Image
        style={{
          width: 450,
          height: 220,
          alignSelf: "center",
          marginBottom: 20,
        }}
        source={{
          uri: `https://spoonacular.com/recipeImages/${route.params.id}-636x393.jpg`,
        }}
      />

      <TouchableOpacity
        onPress={() => {
          agregarFavoritos();
        }}
      ></TouchableOpacity>
      <Text style={styles.heading}>Ingredients</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Animated.FlatList
          data={data}
          contentContainerStyle={{
            padding: 30,
            paddingTop: 20,
            justifyContent: "space-between",
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={(item, index) => {
            // console.log("index", index)
            return index.toString();
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2),
            ];
            const opacityInputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 1),
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });
            return (
              <Animated.View
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  flexDirection: "row",
                  padding: SPACING,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                  transform: [{ scale }],
                  borderRadius: 12,
                  opacity,
                  marginBottom: 30,
                }}
              >
                <Image
                  source={{
                    uri:
                      `https://spoonacular.com/cdn/ingredients_100x100/` +
                      item.image,
                  }}
                  style={{
                    width: Avatar_Size,
                    height: Avatar_Size,
                    borderRadius: 40,
                    marginRight: 20,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      textTransform: "capitalize",
                      maxWidth: 250,
                    }}
                  >
                    {item.name}
                  </Text>

                  <Text style={{ fontSize: 16 }}>
                    {item.amount.metric.value}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {item.amount.metric.unit}
                  </Text>
                </View>
              </Animated.View>
            );
          }}
        />
      )}

      <Text style={styles.heading2}>Recipe Instructions</Text>

      <Animated.FlatList
        data={data2}
        contentContainerStyle={{
          padding: 30,
          paddingTop: 10,
          justifyContent: "space-between",
          marginBottom: 450,
        }}
        keyExtractor={(item, index) => {
          // console.log("index", index)
          return index.toString();
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const scale = scrollY2.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                backgroundColor: "rgba(255,255,255,0.8)",
                flexDirection: "row",
                padding: SPACING,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                transform: [{ scale }],
                borderRadius: 12,

                marginBottom: 30,
              }}
            >
              <Text
                style={{ fontSize: 24, textAlign: "center", marginRight: 5 }}
              >
                {item.number}{" "}
              </Text>
              <Text style={{ fontSize: 16, textAlign: "left" }}>
                {item.step}
              </Text>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
//  {item.number} {item.step}
const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    margin: 10,

    backgroundColor: "rgba(255,255,255,0.8)",

    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
  },
  header: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
    marginTop: 20,
  },
  heading2: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    paddingBottom: 15,
  },
});
