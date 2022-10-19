import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screen
import Login from "../Components/Auth/Login";
//Partes
import { MyTabs } from "./Tabs";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="body">
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
            statusBarColor: "#2b2b2d",
          }}
        />
        <Stack.Screen
          name="body"
          component={MyTabs}
          options={{
            headerShown: false,
            statusBarColor: "#2b2b2d",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
