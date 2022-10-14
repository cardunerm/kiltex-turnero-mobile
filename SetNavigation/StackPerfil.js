import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screen
import ProfileScreen from "../Screen/ProfileScreen";
//Stack Perfil
import ContactStack from "../StackPerfil/ContactStack";
import NotificacionesStack from "../StackPerfil/NotificacionesStack";
import FAQsStack from "../StackPerfil/FAQsStack";

//Respuestas a preguntas frecuentes
import Answer from "../Components/Answer";
//Stack Usuario
import NotExpo from "../Components/NotExpo";
//partes
import { MyStackUsuario } from "./StackUsuario";
const Stack = createNativeStackNavigator();
export function MyStackPerfil() {
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