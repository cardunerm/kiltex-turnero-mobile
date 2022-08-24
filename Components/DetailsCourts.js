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
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Court from "./Court";

const DetailsCourts = ({ route }) => {
  const navigation = useNavigation();

  const id = route.params;
  //Hooks
  const [detCourts, setDetCourts] = useState({});
  const [solTurno, setSolTurno] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getDataStorage();
  }, []);
  // Peticion a la api
  const url =
    environment.api.url + "/api/v1/client/Court/get_court_detail?id=" + id;

  const getDataStorage = async () => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(tokenn);
    } catch (error) {
      console.log(error);
    }
  };

  const get = async (token) => {
    await axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setDetCourts(response.data);
        setCargando(false);
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };

  //Manejador del spin de carga

  return (
    <>
      <ScrollView style={styles.cuerpo}>
        <View>
          <View style={styles.card}>
            <Text style={styles.titulo}>{detCourts.name}</Text>
            <View style={styles.contImg}>
              <Image
                style={styles.img}
                source={require("../assets/court1.jpg")}
              />
            </View>
            <View>
              <Text style={styles.contDescr}>{detCourts.description}</Text>
            </View>
          </View>

          <Pressable
            style={styles.btnAddTurno}
            onPress={() => {
              setSolTurno(!solTurno);
            }}
          >
            <Text style={styles.btnAddTurnoText}>Solicitar Turno</Text>
          </Pressable>
        </View>
        
      </ScrollView>
      {solTurno ? (
        <View style={styles.contModalFic}>
        <Pressable style={styles.conX}  onPress={() => setSolTurno(false)}>
          <MaterialCommunityIcons name="alpha-x" size={140} color="#ffffff91" style={styles.x}/>
        </Pressable>
        <View style={styles.botnTurnos}>
          <Pressable
            style={styles.BTPress}
            onPress={() => navigation.navigate("TurnoLibre")}
          >
            <Text style={styles.BTtext}>Turno Libre</Text>
          </Pressable>
          <Pressable style={styles.BTPress}>
            <Text style={styles.BTtext}>Turno Fijo</Text>
          </Pressable>
        </View>
      </View>
      ):<View></View>}
      
    </>
  );
};
/*
 <SolicitarTurno
            detCourts={detCourts}
            solTurno={solTurno}
            setSolTurno={setSolTurno}
          />
          */
export default DetailsCourts;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingBottom: 10,
    marginTop: 20,
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
  img: {
    width: 350,
    height: 300,
  },
  contDescr: {
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  btnAddTurno: {
    backgroundColor: "#12407c",
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

  contModalFic: {
    width: "100%",
    height: "100%",
    position: "absolute",
    marginVertical: 0,
  },
  conX: {
    backgroundColor: "#2b2b2d7d",
    height: "100%",
  },
  x:{
    textAlign:'center',
   
    marginTop:150,
  },
  botnTurnos: {
    position: "absolute",
    backgroundColor: "#fff",
    height: 311,
    borderTopColor: "#0853b5",
    borderTopWidth: 4,
    borderLeftColor: "#0853b5",
    borderLeftWidth: 3,
    borderRightColor: "#0853b5",
    borderRightWidth: 3,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    bottom: 0,
    paddingTop: 30,
    width: "100%",
  },
  BTPress: {
    borderColor: "#0853b5",
    borderWidth: 2,
    marginTop: 25,
  },
  BTtext: {
    color: "#000",
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: "600",
  },
});
