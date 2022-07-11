import React from "react";
import { Text, Modal } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Screen

import HomeScreen from "./Screen/HomeScreen";
import CourtsScreen from "./Screen/CourtsScreen";
import MyTurno from "./Screen/MyTurno";
import Login from './Login/Login';
import Home from "./Components/Home";
import DetailsCourts from "./Components/DetailsCourts";

const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
    initialRouteName="Courts"
    >
      <Stack.Screen 
      name="Courts" 
      component={CourtsScreen}
      options={{
        title:"Canchas",
        headerTitleAlign:"center"
      }}
       />
      <Stack.Screen 
      name="Details" 
      component={DetailsCourts}
      options={{
        title:"Detalles",
      }}
       />
      
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function MyTabs({setVisbLogin}) {
  return (
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
        }}
      />
      <Tab.Screen
        name="Turno"
        component={MyTurno}
        options={{
          title:"Turnos",
          tabBarLabel: "Turnos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-check"
              size={size}
              color={color}
            />
          ),
        }}
      />
        <Tab.Screen
        name="Perfil"
        
        component={HomeScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


const Navigation = () => {
const [visbLogin,setVisbLogin]=useState(true)
 const [visbNaveg,setVisbNaveg]=useState(false)
  return (
    <NavigationContainer>
      <Login
      visbLogin={visbLogin}
      setVisbLogin={setVisbLogin}
      />
      <MyTabs />
    </NavigationContainer>
  );
};

export default Navigation;
