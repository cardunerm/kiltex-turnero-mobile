import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screen
import Home from "../Screen/Home";
//Stack Canchas
import DetailsCourts from "../Components/Court/DetailsCourts";
import TurnoLibre from "../Components/Court/Turn/TurnoLibre";
import Rules from "../Components/Rules";
//Metodo de Pago
import Payment from "../Components/Court/Turn/Payment";
import TurnoFijo from "../Components/Court/Turn/TurnoFijo";
import {
  headerStyleBack,
  headerTintColor,
} from "../Components/css/variables_Css";
const Stack = createNativeStackNavigator();
export function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Courts">
      <Stack.Screen
        name="Courts"
        component={Home}
        options={{
          title: "Canchas",
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Informacion"
        component={Rules}
        options={{
          title: "Informacion",
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsCourts}
        options={{
          title: "Detalles",
          headerTintColor: headerTintColor,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: headerStyleBack,
          },
        }}
      />
      <Stack.Screen
        name="TurnoLibre"
        component={TurnoLibre}
        options={{
          headerTintColor: headerTintColor,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: headerStyleBack,
          },
          title: "Turnos Libres",
        }}
      />
      <Stack.Screen
        name="TurnoFijo"
        component={TurnoFijo}
        options={{
          headerTintColor: headerTintColor,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: headerStyleBack,
          },
          title: "Turnos Fijos",
        }}
      />
      <Stack.Screen
        name="payment"
        component={Payment}
        options={{
          title: "Metodo de Pago",
          headerStyle: {
            backgroundColor: headerStyleBack,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
