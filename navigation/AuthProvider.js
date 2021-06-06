import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";

export const AuthContext = createContext({});
export const AuthProvider = ({ navigation, children }) => {
  const [user, setUser] = useState(null);
  return (
    // user authentication for login, registration & logout
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (name, email, password) => {
          try {
            await auth().signInWithEmailAndPassword(name, email, password);
          } catch (e) {
            alert(e);
            console.log(e);
          }
        },
        register: async (name, email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(name, email, password);
          } catch (e) {
            alert(
              "Please check all the fields and ensure the password is at least 6 characters long"
            );
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
