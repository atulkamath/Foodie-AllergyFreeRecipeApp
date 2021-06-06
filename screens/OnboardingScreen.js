import React, { useState } from "react";
import { StyleSheet, Image, View, Button, Text } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import Modal from "react-native-modal";
const OnboardingScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Onboarding
      style={styles.container}
      onSkip={() => navigation.navigate("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "white",
          image: (
            <Image
              style={styles.stretch}
              source={require("../assets/undraw_eating_together_tjhx.png")}
            />
          ),

          title: "Welcome to Foodie",
          subtitle: "Our goal is to help you find healthier recipes easily",
        },
        {
          backgroundColor: "white",
          image: (
            <Image
              style={styles.stretch}
              source={require("../assets/undraw_Search_re_x5gq.png")}
            />
          ),
          title: " Personalised Recipes",
          subtitle:
            "Choose from a variety of cuisines in accordance to your allergies",
        },

        {
          backgroundColor: "white",
          image: (
            <Image
              style={styles.stretch}
              source={require("../assets/undraw_healthy_options_sdo3.png")}
            />
          ),
          title: "Let's Go!",
          subtitle: " ",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  stretch: {
    width: 300,
    height: 200,
    marginBottom: 90,
  },
});

export default OnboardingScreen;
