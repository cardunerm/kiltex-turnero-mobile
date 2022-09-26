import React from "react";
import {  Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

//partes
import { MyStack } from "./StackHome";
import { MyStackTurno } from "./StackMisTurnos";
import { MyStackPerfil } from "./StackPerfil";
const Tab = createBottomTabNavigator();
export function MyTabs({ navigation }) {
  const navigat = useNavigation();
  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        Alert.alert("Cerrar Sesion", "¿Esta seguro que quiere Cerrar sesion?", [
          { text: "No", style: "cancel", onPress: () => {} },
          {
            text: "Si",
            style: "destructive",
            // Al hacer back lateral se vuelve a la pantalla de login
            // Si se desabilita el back no se puede regresar hacia atras
            //Momentaneamente se coloco un mensaje de cierre de sesion y la accion del mismo
            onPress: () => {
              navigation.dispatch(e.data.action);
            },
          },
        ]);
      }),
    [navigation]
  );
  const [gatillo, setGatillo]=useState(true)

  return (
    <>
      <Tab.Navigator
        initialRouteName="Court"
        screenOptions={{
          tabBarActiveTintColor: "blue",
          headerTitleAlign: "center",
          //tabBarStyle: {
          // backgroundColor: '#000',
          //}, Modifica el color del tabBar
        }}
      >
        <Tab.Screen
          name="Court"
          component={MyStack}
          options={{
            tabBarLabel: "Canchas",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="tennis-ball"
                size={size}
                color={color}
              />
            ),
            headerShown: false,
            tabBarActiveBackgroundColor: "#ddd",
          }}
        />
        <Tab.Screen
          name="Turno"
          component={MyStackTurno}
          options={{
            title: "Turnos",
            tabBarLabel: "Turnos",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calendar-check"
                size={size}
                color={color}
              />
            ),
            tabBarActiveBackgroundColor: "#ddd",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={MyStackPerfil}
          options={{
            tabBarLabel: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            ),
            headerShown: false,
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            tabBarActiveBackgroundColor: "#ddd",
          }}
        />
      </Tab.Navigator>
    </>
  );
}