import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { environment } from "../env/env.develop";
import axios from "axios";

import SolicitarTurno from "./SolicitarTurno";
const DetailsCourts = ({ route }) => {
  const id = route.params;
  console.log(route);
  const [detCourts, setDetCourts] = useState({});
  const [solTurno, setSolTurno] = useState(false);
  const filter = {
    filter: "",
    page: 0,
    pageSize: 10,
  };

  const get = () => {
    const url =
      environment.api.url + "/api/v1/client/Court/get_court_detail?id=" + id;
    axios
      .get(url)
      .then((response) => {
        setDetCourts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    get();
  }, []);

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
              <Text style={styles.titulo}>{detCourts.sport}</Text>
              <Text style={styles.titulo}>{detCourts.description}</Text>
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
