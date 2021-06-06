import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AllergySelectorScreen from "../screens/AllergySelectorScreen";

const AppStack = createStackNavigator();
// showing onboarding screen depending if user is registered or not.
const AuthStack = () => {
  const [FirstLaunch, setFirstLaunch] = React.useState(null);
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    });
  }, []);

  if (FirstLaunch === null) {
    return null;
  } else if (FirstLaunch === true) {
    routeName = "Onboarding";
  } else {
    routeName = "Login";
  }
  return (
    //stack navigator showing the various screens
    <AppStack.Navigator initialRouteName={routeName}>
      <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AppStack.Screen
        options={{ headerShown: false }}
        name="Allergy"
        component={AllergySelectorScreen}
      />
      <AppStack.Screen name="Login" component={LoginScreen} />
      <AppStack.Screen name="Signup" component={SignUpScreen} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      {/* <Stack.Screen name="Fridge" component={HomeScreen1} /> */}
      {/* <AppStack.Screen name="Home" component={HomeScreen} /> */}
    </AppStack.Navigator>
  );
};
export default AuthStack;
