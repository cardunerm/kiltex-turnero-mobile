import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserAndPassStack = () => {
  const navigation = useNavigation();
  //Hooks
const [usuario,setUsuario]=useState();

  const obtenerDato = async () => {
    try {
      const us = await AsyncStorage.getItem("usuario");
      const usar = JSON.parse(us);
      setUsuario(usar)
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    obtenerDato();
  }, []);
  return (
    <>
      <View style={styles.imgPerfilContainer}>
        <Image
          style={styles.imgPerfil}
          source={require("../assets/LogoPadelPrueba.jpg")}
        />
        <Text style={styles.name}>Usuario 1(Falta decidir si se va a usar name)</Text>
      </View>
      <View style={styles.containerTotal}>
        <Pressable
          style={[styles.container, styles.containerPass]}
          onPress={() => navigation.navigate("Contraseña",usuario)}
        >
          <Text style={styles.text}>Contraseña</Text>
        </Pressable>
        <Pressable
          style={styles.container}
          onPress={() => navigation.navigate("E-mail",usuario)}
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
