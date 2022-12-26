import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../Components/css/CssMyTurno";
import { turnosApi } from "../Service/ServMyTurno";
import { Carga } from "../Components/Court/Turn/Turno";

const MyTurno = ({ navigation }) => {
  const navigationn = useNavigation();
  //HOOKS
  const [reservationLibre, setReservationLibre] = useState([]);
  const [reservationFijo, setReservationFijo] = useState([1, 2, 3]);

  const [cargando, setCargando] = useState(true); //setCarga - Lugar donde se guardara el manejador del spin
  const [listEmpty, setlistEmpty] = useState(true);
  const [listEmptyTwo, setlistEmptyTwo] = useState();

  const [gatillo, setGatillo] = useState(1);

  const [cargaTurn, setCargaTurn] = useState(false);
  useEffect(() => {
    turnosApi(setReservationLibre, setCargando, setlistEmpty);
    setCargaTurn(false)
  }, [cargaTurn])
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setCargaTurn(true)
      turnosApi(setReservationLibre, setCargando, setlistEmpty)
    });
    return unsubscribe;
  }, [navigation]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    turnosApi(setReservationLibre, setCargando, setlistEmpty)
  }, []);
  const Turno = ({ item }) => {
    return (
      <>
        <View style={styles.card}>
          <View style={styles.contTurno}>
            <Text style={[styles.titulo, styles.horario]}>
              Fecha: {item.turn.slice(0, 10)}
            </Text>
            <Text style={[styles.titulo, styles.horario]}>
              Inicio del turno: {item.turn.slice(11, 13)} :{" "}
              {item.turn.slice(14, 16)} hs
            </Text>
            <Pressable onPress={() => 
              navigationn.navigate("ViewTurn", { item: item })}>
              <Text style={styles.viewTurno}>Ver Turno</Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  };
  return (     
      cargando ? (
        <View>
          <ActivityIndicator size="large" color="#1258B1" />
        </View>
        
      ) : listEmpty ? (
        <View style={styles.contGeneral}>
          <View style={styles.containerTF}>
          <FlatList
            data={reservationLibre}
            keyExtractor={(item) => item.id}
            enableEmptySections={true}
            renderItem={Turno}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        </View>
        <View style={styles.contGeneralHistorial}>
          <Button
            onPress={() => navigationn.navigate("Historial")}
            icon="history"
            mode="outlined"
            color="blue"
            style={styles.btnHistorial}
          >
            My Historial
          </Button>
        </View>
        </View>       
      ) : (
        <View style={styles.mssgContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Text style={styles.mssg}>No se encuentra ningún turno Libre</Text>
          </ScrollView>
          <View style={styles.contGeneralHistorial}>
          <Button
            onPress={() => navigationn.navigate("Historial")}
            icon="history"
            mode="outlined"
            color="blue"
            style={styles.btnHistorial}
          >
            My Historial
          </Button>
        </View>
        </View>
      )
           
    
  );
};

export default MyTurno;
