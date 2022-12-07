import React, { useEffect, useState} from "react";
import {
  Text,
  FlatList,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../css/CssHistorial";
import { historialApi } from "../../../Service/ServHistorial";

const Historial = ({ navigation }) => {
  const navigationn = useNavigation();
  const [historial,setHistorial] = useState();
  //Data temporal
const cuerpo = {
  filter: "",
  page: 0,
  pageSize: 10
}
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
historialApi(cuerpo,setHistorial)
    });
    return unsubscribe;
  }, [navigation]);

  const TurnPast = [
    {
      Cancha: "Cancha 1",
      Fecha: "04-08-2022",
      InicioTurno: "08:00 hs",
      FinTurno: "09:30 hs",
      Estado: "Cancelado",
    },
    {
      Cancha: "Cancha 2",
      Fecha: "04-08-2022",
      InicioTurno: "08:00 hs",
      FinTurno: "09:30 hs",
      Estado: "Usado",
    },
    {
      Cancha: "Cancha 1",
      Fecha: "04-08-2022",
      InicioTurno: "08:00 hs",
      FinTurno: "09:30 hs",
      Estado: "Cancelado",
    },
    
  ];
//BODY  TURNO PASADO
  const TurnoPasado = ({ item }) => {
    console.log(item)
    return (
      <>
        <View style={styles.listTurno}>
          <View style={styles.contTurno}>
            <Text style={[styles.titulo, styles.horario]}>
              Cancha: {item.court}
            </Text>
            <Text style={[styles.titulo, styles.horario]}>
              Fecha: {item.turn.slice(0,10)}
            </Text>
            <Text style={[styles.titulo, styles.horario]}>
              Inicio del turno: {item.turn.slice(11,16)} hs
            </Text>
            <View>
              <Text
                style={
                  item.reservationStatus == "Cancelada"
                    ? styles.viewTurnoCancelado
                    : styles.viewTurnoUsado
                }
              >
                {item.reservationStatus}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };
  //BODY PRINCIPAL
  return (
    <>
      <FlatList
        data={historial} // Cambiar por array con turnos pasados (turnos del historial)
        enableEmptySections={true}
        renderItem={TurnoPasado}
      />
    </>
  );
};

export default Historial;

