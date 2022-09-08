import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserAndPassStack = () => {


  //iMPORTANTE
  //SE DEBE CAMBIAR LOGICA Y POR  EL COMPONENTE
  
  const navigation = useNavigation();
  //Hooks
  const [usuario, setUsuario]=useState()
  useEffect(() => {
    getData()
  }, []);
  // fun
  const getData = async () => {
    try {
      const usuario = JSON.parse(await AsyncStorage.getItem("usuario"));
      setUsuario(usuario)
    } catch (error) {
      console.log(error);
    }
  };

  //<Text style={styles.name}>{usuario}</Text>

  return (
    <>
      <View style={styles.imgPerfilContainer}>
        <Image
          style={styles.imgPerfil}
          source={require("../assets/LogoPadelPrueba.jpg")}
        />
        
      </View>
      <View style={styles.containerTotal}>
        <Pressable
          style={[styles.container, styles.containerPass]}
          onPress={() => navigation.navigate("Contraseña")}
        >
          <Text style={styles.text}>Contraseña</Text>
        </Pressable>
        <Pressable
          style={styles.container}
          onPress={() => navigation.navigate("E-mail")}
        >
          <Text style={styles.text}>E-mail</Text>
        </Pressable>
      </View>
    </>
  );
};

export default UserAndPassStack;
const styles = StyleSheet.create({
  containerTotal: {
    marginTop: 40,
  },
  container: {
    borderBottomColor: "#999",
    borderBottomWidth: 1,
  },
  containerPass: {
    borderTopColor: "#999",
    borderTopWidth: 1,
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
    paddingVertical: 20,
    fontWeight: "600",
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
});
