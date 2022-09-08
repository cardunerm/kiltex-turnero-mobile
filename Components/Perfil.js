import React, { useState,useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Perfil = () => {
  //Hooks
  const [gatillo, setGatillo]=useState(false)
  const [usuario, setUsuario]=useState()
  const navigation = useNavigation();

  
  //Logout - (Se borra el token)
  const logout = async () => {
    try{
     await AsyncStorage.removeItem("token")
     navigation.navigate("login")
     console.log('token')
    } catch(error){
      console.log(error)
    }
  }
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
            <Pressable
              style={styles.funcionalidad}
              onPress={() =>logout()  }
            >
              <Text style={styles.textCerrarSesion}>Cerrara sesion</Text>
            </Pressable>
            
          </View>
        </ScrollView>
      </View>
      
    </>
  );
};

export default Perfil;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 2,
  },
  imgPerfilContainer: {
    flexDirection: "column",
    alignItems:'center',
    marginTop: 30,
  },
  imgPerfil: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom:20,
  },
  name:{
    fontSize:18,
  },
  funcionalidadContainer: {
    marginVertical: 20,
  },
  funcionalidad1: {
    borderTopColor: "#999",
    borderTopWidth: 1,
  },
  funcionalidad: {
    borderBottomColor: "#999",
    borderBottomWidth: 1,
  },
  funcionalidadText: {
    paddingVertical: 25,
    fontSize: 20,
    fontWeight: "600",
    paddingLeft: 20,
  },
  textCerrarSesion:{
    color:'#e70000',
    paddingVertical: 25,
    fontSize: 20,
    paddingLeft: 20,
  }
});
