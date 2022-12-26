import React, { useState, useEffect } from "react";
import {
  Text,
  View,
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
  const refresh = () => {
    const [reservationLibre, setReservationLibre] = useState([]);
    turnosApi(setReservationLibre, setCargando, setlistEmpty)
  }
  return (
    <>
      <View style={styles.containerBot}>
        
      </View>
      <Carga
        refresh={refresh}
        reservationLibre={reservationLibre}
        reservationFijo={reservationFijo}
        cargando={cargando}
        listEmpty={listEmpty}
        listEmptyTwo={listEmptyTwo}
        gatillo={gatillo}
        navigationn={navigationn}

        setCargaTurn={setCargaTurn}
      />
      <Button
        onPress={() => navigationn.navigate("Historial")}
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
