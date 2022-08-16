import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { environment } from "../env/env.develop";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SolicitarTurno from "./SolicitarTurno";
const DetailsCourts = ({ route }) => {
  const id = route.params;
//Hooks
  const [detCourts, setDetCourts] = useState({});
  const [solTurno, setSolTurno] = useState(false);
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    getDataStorage();
  }, []);
  // Peticion a la api
  const url =environment.api.url + "/api/v1/client/Court/get_court_detail?id=" + id;

  const getDataStorage = async () => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(tokenn)
    } catch (error) {
      console.log(error);
    }
  };
 
  const get = async (token) => {
      await axios.get(url,{
        headers: { Authorization: "Bearer " + token }
      })
        .then((response) => {
          setDetCourts(response.data);
          setCargando(false)
        })
        .catch((e) => {
          console.log("ERR" + e);
        });
    };

    //Manejador del spin de carga
  const carga = cargando ? (
    <View style={styles.carga}>
      <ActivityIndicator size="large" color="#1258B1" />
    </View>
  ) : (
    <View >
      
      <Text style={styles.contDescr}>{detCourts.description}</Text>
      
    </View>
  );

  return (
    <>
      <ScrollView>
        <View>
          <View style={styles.card}>
            <Text style={styles.titulo}>{detCourts.name}</Text>
            <View style={styles.contImg}>
              <Image
                style={!solTurno ? styles.img : styles.img2}
                source={require("../assets/court1.jpg")}
              />
            </View>
            <View style={!solTurno ? styles.card2 : styles.card1}>
              {carga}
            </View>
          </View>

          <Pressable
            style={styles.btnAddTurno}
            onPress={() => {
              setSolTurno(!solTurno);
            }}
          >
            <Text style={styles.btnAddTurnoText}>
              {solTurno ? "Cancelar Turno" : "Solicitar Turno"}
            </Text>
          </Pressable>
          <SolicitarTurno
            detCourts={detCourts}
            solTurno={solTurno}
            setSolTurno={setSolTurno}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default DetailsCourts;
const styles = StyleSheet.create({
  carga:{
    marginTop:20,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingBottom: 10,
    marginVertical: 20,
    borderRadius: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  card2: {},
  card1: {
    /*backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,*/
    backgroundColor: "red",
    height: 0,
  },
  titulo: {
    textAlign: "center",
    marginVertical: 20,
  },
  contImg: {
    flexDirection: "row",
    justifyContent: "center",
    borderTopColor: "#d6d3d3ed",
    borderTopWidth: 1,
    borderBottomColor: "#d6d3d3ed",
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginHorizontal: 15,
  },
  contDescr:{
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal:10,
  },
  img: {
    width: 350,
    height: 300,
  },
  img2: {
    width: 350,
    height: 300,
  },
  btnAddTurno: {
    backgroundColor: "blue",
    marginHorizontal: 20,
    marginTop: 40,
  },
  btnAddTurnoText: {
    color: "#fff",
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
