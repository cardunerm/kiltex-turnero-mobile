import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {styles} from "./css/CssScreenPerfil";
import { alert, alertBD } from "./Alert";


const Perfil = () => {
  //Hooks
  const [gatillo, setGatillo] = useState(false);
  const [usuario, setUsuario] = useState();
  const navigation = useNavigation();

  //Logout - (Se borra el token)

  const logout = () => {
    alertBD("Cerrar Sesion","¿Esta seguro que quiere Cerrar sesion?" ,"Si",removeToken() )
  };
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("login")
      

    } catch (error) {
      console.log(error);
    }
  };
  
  //BODY PRINCIPAL
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imgPerfilContainer}>
            <Image
              style={styles.imgPerfil}
              source={require("../assets/LogoPadelPrueba.jpg")}
            />
          </View>
          <View style={styles.funcionalidadContainer}>
            <Pressable
              style={[styles.funcionalidad, styles.funcionalidad1]}
              onPress={() => navigation.navigate("Contactanos")}
            >
              <Text style={styles.funcionalidadText}>Contáctanos</Text>
            </Pressable>
            <Pressable
              style={styles.funcionalidad}
              onPress={() => navigation.navigate("Notificaciones")}
            >
              <Text style={styles.funcionalidadText}>Notificaciones</Text>
            </Pressable>
            <Pressable
              style={styles.funcionalidad}
              onPress={() => navigation.navigate("userAndPass")}
            >
              <Text style={styles.funcionalidadText}>Usuario</Text>
            </Pressable>
            <Pressable
              style={styles.funcionalidad}
              onPress={() => navigation.navigate("FAQs")}
            >
              <Text style={styles.funcionalidadText}>Preguntas Frecuentes</Text>
            </Pressable>
            <Pressable style={styles.funcionalidad} onPress={() => logout()}>
              <Text style={styles.textCerrarSesion}>Cerrara sesion</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
      
    </>
  );
};

export default Perfil;

