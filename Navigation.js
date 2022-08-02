import React from "react";
import { Text, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screen

import HomeScreen from "./Screen/HomeScreen";
import CourtsScreen from "./Screen/CourtsScreen";
import MyTurno from "./Screen/MyTurno";
import Login from "./Login/Login";
import Home from "./Components/Home";
import DetailsCourts from "./Components/DetailsCourts";
//Stack Perfil
import UserAndPassStack from "./StackPerfil/UserAndPassStack";
import ContactStack from "./StackPerfil/ContactStack";
import NotificacionesStack from "./StackPerfil/NotificacionesStack";
import FAQsStack from "./StackPerfil/FAQsStack";
//Stack Usuario
import PasswordStack from "./StackUsuario/PasswordStack";
import EmailStack from "./StackUsuario/EmailStack";
import NotExpo from "./Components/NotExpo";

const Stack = createNativeStackNavigator();
function MyStack() {
  
  return (
    <Stack.Navigator initialRouteName="Courts">
      <Stack.Screen
        name="Courts"
        component={CourtsScreen}
        
        options={{
          title: "Canchas",
          headerTitleAlign: "center",
          
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsCourts}
        options={{
          title: "Detalles",
        }}
      />
    </Stack.Navigator>
  );
}

function MyStackPerfil() {
  
  return (
    <Stack.Navigator initialRouteName="Perfil1">
      <Stack.Screen
        name="Perfil1"
        component={HomeScreen}
        options={{
          title: "Perfil",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="userAndPass"
        component={MyStackUsuario}
        options={{
          title: "Usuario",
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Contactanos"
        component={ContactStack}
        options={{
          title: "Contacto",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="FAQs"
        component={FAQsStack}
        options={{
          title: "Contacto",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Notificaciones"
        component={NotificacionesStack}
        options={{
          title: "Notificaciones",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="NotTest"
        component={NotExpo}
        options={{
          title: "NotTest",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
function MyStackUsuario() {
  return (
    <Stack.Navigator initialRouteName="usuario">
      <Stack.Screen
        name="usuario"
        component={UserAndPassStack}
        options={{
          title: "Usuario",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Contraseña"
        component={PasswordStack}
        options={{
          title: "Contraseña",
        }}
      />
      <Stack.Screen
        name="E-mail"
        component={EmailStack}
        options={{
          title: "E-mail",
        }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function MyTabs({ navigation }) {
  /*React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        Alert.alert(
          'Cerrar Sesion?',
          '¿',
          [
            { text: "No", style: 'cancel', onPress: () => {} },
            {
              text: 'Si',
              style: 'destructive',
              // Al hacer back lateral se vuelve a la pantalla de login
              // Si se desabilita el back no se puede regresar hacia atras 
              //Momentaneamente se coloco un mensaje de cierre de sesion y la accion del mismo
              onPress: () => {navigation.dispatch(e.data.action)},
            },
          ]
        );
      }),
    [navigation]
  );
*/
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
            }}
          />
          <Tab.Screen
            name="Turno"
            component={MyTurno}
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
            }}
          />
          
        </Tab.Navigator>
     
        
      
    </>
  );
}

const Navigation = () => {
  const [visbLogin, setVisbLogin] = useState(true);

  return (
    
      <NavigationContainer>
      <Stack.Navigator initialRouteName="login" >
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="body"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer> 
   
   
  );
};

export default Navigation;
