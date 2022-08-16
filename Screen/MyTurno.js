import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import Turno from "../Components/Turno";
import { environment } from "../env/env.develop";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Service
import callApiGet from "../Service";

const MyTurno = () => {
  //Hooks
  const [reservation, setReservation] = useState([]);
  const [cargando, setCargando] = useState(true); //setCarga - Lugar donde se guardara el manejador del spin
  const [listEmpty, setlistEmpty] = useState(true);

  //Peticion a la api
  useEffect(() => {
    callApiGet();
  }, [cargando]);
  const callApiGet = async () => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(tokenn);
    } catch (error) {
      console.log(error);
    }
  };

  const get = async (token) => {
    const url =
      environment.api.url + "/api/v1/client/Reservation/list_my_reservations";
    await axios({
      method: "post",
      url: url,
      data: filter,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        setReservation(
          response.data.data.sort((b, a) => a.schedule > b.schedule)
        );

        setCargando(false);
        console.log(response.data.data);
        if (response.data.data[0] == undefined) {
          setlistEmpty(false);
        }
        else{
          setlistEmpty(true);
        }
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };

  const filter = {
    filter: " ",
    page: 0,
    pageSize: 10,
  }; //Body

  // Cuerpo de las tarjetas de los turnos
  const Turno = ({ item }) => {
    return (
      <>
        <View style={styles.card}>
          <View style={styles.contTurno}>
            <Text style={[styles.titulo, styles.fecha]}>{item.court}</Text>
            <Text style={[styles.titulo, styles.horario]}>
              Fecha: {item.schedule.slice(0, 10)}
            </Text>
            <Text style={[styles.titulo, styles.horario]}>
              Inicio del turno: {item.schedule.slice(11, 13)} :{" "}
              {item.schedule.slice(14, 16)} hs
            </Text>
            <Text style={[styles.titulo, styles.cancha]}>
              finalizacion del turno: {item.schedule.slice(28, 30)} :{" "}
              {item.schedule.slice(31, 33)} hs{" "}
            </Text>
          </View>
        </View>
      </>
    );
  };
  //Manejador del spin de carga

  const carga = cargando ? (
    <View style={styles.carga}>
      <ActivityIndicator size="large" color="#1258B1" />
    </View>
  ) : listEmpty ? (
    <View>
      <View style={styles.containerCard}>
        <FlatList
          data={reservation}
          keyExtractor={(item) => item.id}
          enableEmptySections={true}
          renderItem={Turno}
          refreshControl={
            <RefreshControl refreshing={cargando} onRefresh={callApiGet} />
          }
        />
      </View>
    </View>
  ) : (
    <View style={styles.mssgContainer}>
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={cargando} onRefresh={callApiGet} />
    }
    >
      <Text style={styles.mssg}>No se encuentra ningún turno</Text>
    </ScrollView>
    </View>
  );
  //Cuerpo del componente
  return <>{carga}</>;
};

export default MyTurno;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 5,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  contTurno: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 17,
  },
  fecha: {
    fontSize: 20,
    fontWeight: "700",
    borderBottomColor: "#03408c6e",
    borderBottomWidth: 0.5,
  },
  horario: {
    fontWeight: "500",
    borderBottomColor: "#03408c6e",
    borderBottomWidth: 0.5,
  },
  btnCancelar: {
    backgroundColor: "blue",
    paddingVertical: 5,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  btnCancelarText: {
    color: "#fff",
    textAlign: "center",
  },
  mssgContainer:{
    flex:1,
    
  },
  mssg: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 20,
    fontWeight: "500",
  },
});
