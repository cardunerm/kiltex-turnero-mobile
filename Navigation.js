import React from "react";
import { Text, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

//Screen
import ProfileScreen from "./Screen/ProfileScreen";
import CourtsScreen from "./Screen/Home";
import MyTurno from "./Screen/MyTurno";
import Login from "./Components/Auth/Login";
//import Home from "./Components/Home";
import Home from "./Screen/Home";

//Stack Canchas
import DetailsCourts from "./Components/Court/DetailsCourts";
import TurnoLibre from "./Components/Court/Turn/TurnoLibre";
import Rules from "./Components/Rules";
//Stack Perfil
import UserAndPassStack from "./StackPerfil/UserAndPassStack";
import ContactStack from "./StackPerfil/ContactStack";
import NotificacionesStack from "./StackPerfil/NotificacionesStack";
import FAQsStack from "./StackPerfil/FAQsStack";

//Respuestas a preguntas frecuentes
import Answer from "./Components/Answer";
//Stack Usuario
import PasswordStack from "./StackUsuario/PasswordStack";
import EmailStack from "./StackUsuario/EmailStack";
import NotExpo from "./Components/NotExpo";
//Metodo de Pago
import Payment from "./Components/Court/Turn/Payment"
//Stack Turnos
import Historial from "./Components/Court/Turn/Historial";
import ViewTurn from "./Components/Court/Turn/ViewTurn";

const Stack = createNativeStackNavigator();

function MyStack() {
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
        }}
      />
      <Stack.Screen
        name="TurnoLibre"
        component={TurnoLibre}
        options={{
          title: "Turnos Libres",
        }}
      />
      <Stack.Screen
        name="payment"
        component={Payment}
        options={{
          title: "Metodo de Pago",
          headerStyle: {
            backgroundColor: "#103a70",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
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
        component={ProfileScreen}
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
          title: "Preguntas Frecuentes",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="answer"
        component={Answer}
        options={{
          title: "Respoesta",
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
function MyStackTurno() {
  return (
    <Stack.Navigator initialRouteName="Turno">
      <Stack.Screen
        name="Turnos"
        component={MyTurno}
        options={{
          title: "Turnos",
          headerTitleAlign: "center",
         
        }}
      />
      <Stack.Screen
      name="Historial"
      component={Historial}
      options={{
        title: "Historial",
        headerTitleAlign: "center",
      }}
      />
      <Stack.Screen
      name="ViewTurn"
      component={ViewTurn}
      options={{
        title: "Turno",
        headerTitleAlign: "center",
      }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function MyTabs({ navigation }) {
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

const Navigation = () => {
  const [visbLogin, setVisbLogin] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
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
