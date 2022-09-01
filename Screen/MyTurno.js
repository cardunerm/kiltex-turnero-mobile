import React, { useState, useEffect, ReactDOM } from "react";
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Pressable,
} from "react-native";
import { environment } from "../env/env.develop";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

//Service
import callApiGet from "../Service";

const MyTurno = () => {
  const navigation = useNavigation();
  //Hooks
  const [reservationLibre, setReservationLibre] = useState([]);
  const [reservationFijo, setReservationFijo] = useState([]);

  const [cargando, setCargando] = useState(true); //setCarga - Lugar donde se guardara el manejador del spin
  const [listEmpty, setlistEmpty] = useState(true);
  const [listEmptyTwo, setlistEmptyTwo] = useState(false);

  const [gatillo, setGatillo] = useState(1);

  //Peticion a la api
  useEffect(() => {
    callApiGet();
  }, [carga]);
  useEffect(() => {
    callApiGet();
  }, [reservationLibre]);
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
        setReservationLibre(
          response.data.data.sort((b, a) => a.schedule > b.schedule)
        );
        setCargando(false);

        if (response.data.data[0] == undefined) {
          setlistEmpty(false);
        } else {
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
            <Text style={[styles.titulo, styles.horario]}>
              Fecha: {item.schedule.slice(0, 10)}
            </Text>
            <Text style={[styles.titulo, styles.horario]}>
              Inicio del turno: {item.schedule.slice(11, 13)} :{" "}
              {item.schedule.slice(14, 16)} hs
            </Text>
            <Pressable onPress={() => navigation.navigate("ViewTurn", item)}>
              <Text style={styles.viewTurno}>Ver Turno</Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  };
  //Manejador del spin de carga

  const carga =
    gatillo == 1 ? (
      cargando ? (
        <View>
          <ActivityIndicator size="large" color="#1258B1" />
        </View>
      ) : listEmpty ? (
        <View style={styles.containerTF}>
          <FlatList
            data={reservationLibre}
            keyExtractor={(item) => item.id}
            enableEmptySections={true}
            renderItem={Turno}
            refreshControl={
              <RefreshControl refreshing={cargando} onRefresh={callApiGet} />
            }
          />
        </View>
      ) : (
        <View style={styles.mssgContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={cargando} onRefresh={callApiGet} />
            }
          >
            <Text style={styles.mssg}>No se encuentra ningún turno Libre</Text>
          </ScrollView>
        </View>
      )
    ) : cargando ? (
      <View>
        <ActivityIndicator size="large" color="#1258B1" />
      </View>
    ) : listEmptyTwo ? (
      <View>
        <FlatList
          data={reservationFijo} // Cambiar por array donde se guarden los turnos fijos
          keyExtractor={(item) => item.id}
          enableEmptySections={true}
          renderItem={Turno}
          refreshControl={
            <RefreshControl refreshing={cargando} onRefresh={callApiGet} />
          }
        />
      </View>
    ) : (
      <View style={styles.mssgContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={cargando} onRefresh={callApiGet} />
          }
        >
          <Text style={styles.mssg}>No se encuentra ningún turno Fijo</Text>
        </ScrollView>
      </View>
    );
  //Cuerpo del componente

  return (
    <>
      <View style={styles.containerBot}>
        <Pressable
          onPress={() => setGatillo(1)}
          style={gatillo == 1 ? styles.botonLib2 : styles.botonLib}
        >
          <Text
            style={gatillo == 1 ? styles.botonLibText2 : styles.botonLibText}
          >
            Libres
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setGatillo(2)}
          style={gatillo == 2 ? styles.botonLib2 : styles.botonLib}
        >
          <Text
            style={gatillo == 2 ? styles.botonLibText2 : styles.botonLibText}
          >
            Fijos
          </Text>
        </Pressable>
      </View>

      {carga}

      <Button
        onPress={() => navigation.navigate("Historial")}
        icon="history"
        mode="outlined"
        color="blue"
        style={styles.btnHistorial}
      >
        My Historial
      </Button>
    </>
  );
};

export default MyTurno;
const styles = StyleSheet.create({
  containerBot: {
    flexDirection: "row",
  },
  botonLib: {
    borderBottomColor: "#bbb",
    width: "50%",
    borderBottomWidth: 2,
    paddingVertical: 20,
  },
  botonLibText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#bbb",
  },
  botonLib2: {
    borderBottomColor: "#000",
    width: "50%",
    borderBottomWidth: 2,
    paddingVertical: 20,
  },
  botonLibText2: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 5,
    borderBottomEndRadius: 30,
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
  viewTurno: {
    textAlign: "center",
    backgroundColor: "#12407c",
    marginBottom: -20,
    marginHorizontal: -20,
    paddingVertical: 10,
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    borderBottomRightRadius: 25,
  },
  containerTF: {
    paddingBottom: 128,
  },
  mssgContainer: {
    flex: 1,
  },
  mssg: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 20,
    fontWeight: "500",
  },
  btnHistorial: {
    borderColor: "blue",
    borderWidth: 1,
    bottom: 5,
    position: "absolute",
    width: "100%",
    backgroundColor: "#fff",
  },
});
