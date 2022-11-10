import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screen
import MyTurno from "../Screen/MyTurno";
//Stack Turnos
import Historial from "../Components/Court/Turn/Historial";
import ViewTurn from "../Components/Court/Turn/ViewTurn";
import {
  headerStyleBack,
  headerTintColor,
} from "../Components/css/variables_Css";
const Stack = createNativeStackNavigator();
export function MyStackTurno() {
  return (
    <Stack.Navigator initialRouteName="Turno">
      <Stack.Screen
        name="Turnos"
        component={MyTurno}
        options={{
          title: "Turnos",
          headerTintColor: headerTintColor,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: headerStyleBack,
          },
        }}
      />
      <Stack.Screen
        name="Historial"
        component={Historial}
        options={{
          title: "Historial",
          headerTitleAlign: "center",
          headerTintColor: headerTintColor,
          headerStyle: {
            backgroundColor: headerStyleBack,
          },
        }}
      />
      <Stack.Screen
        name="ViewTurn"
        component={ViewTurn}
        options={{
          title: "Turno",
          headerTitleAlign: "center",
          headerTintColor: headerTintColor,
          headerStyle: {
            backgroundColor: headerStyleBack,
          },
        }}
      />
    </Stack.Navigator>
  );
}
