import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Stack Perfil
import UserAndPassStack from "../StackPerfil/UserAndPassStack";
//Stack Usuario
import PasswordStack from "../StackUsuario/PasswordStack";
import EmailStack from "../StackUsuario/EmailStack";
const Stack = createNativeStackNavigator();
export function MyStackUsuario() {
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