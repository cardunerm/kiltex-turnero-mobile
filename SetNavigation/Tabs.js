import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//partes
import { MyStack } from "./StackHome";
import { MyStackTurno } from "./StackMisTurnos";
import { MyStackPerfil } from "./StackPerfil";
const Tab = createBottomTabNavigator();
export function MyTabs({ navigation }) {

  return (
    <>
      <Tab.Navigator
        initialRouteName="Court"
        screenOptions={{
          tabBarActiveTintColor: "blue",
          headerTitleAlign: "center",
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