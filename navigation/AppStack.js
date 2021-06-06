import React, { useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import HomeScreen1 from "../screens/HomeScreen1";
import ProfileScreen from "../screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ResultsShowScreen from "../screens/ResultsShowScreen";
import { AuthContext } from "../navigation/AuthProvider";
import SmartSearchScreen from "../screens/SmartSearchScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// creating the bottom navigation tabs
function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
        style: {
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size }) => <Ionicons name="ios-home" size={22} />,
        }}
      />

      <Tab.Screen
        name="NutritionSearch"
        component={SmartSearchScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Ionicons name="ios-color-wand" size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="IngredientSearch"
        component={HomeScreen1}
        options={{
          headerShown: true,
          tabBarIcon: ({ size }) => <Ionicons name="ios-pizza" size={22} />,
        }}
      />
    </Tab.Navigator>
  );
}

//creating the navigation stack
const AppStack = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MyTabs}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

          switch (routeName) {
            case "Home": {
              return {
                headerShown: false,
              };
            }

            case "NutritionSearch": {
              return {
                headerShown: false,
                headerTitle: "Nutrition Search",
              };
            }
            case "Ingredient Search":
            default: {
              return {
                headerTitle: "IngredientSearch",
              };
            }
          }
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />

      <Stack.Screen name="ResultsShowScreen" component={ResultsShowScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
