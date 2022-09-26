import React from "react";
import {
  Text,
  FlatList,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../css/CssHistorial";

const Historial = () => {
  const navigation = useNavigation();

  //Data temporal
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
    return (
      <>
        <View style={styles.listTurno}>
          <View style={styles.contTurno}>
            <Text style={[styles.titulo, styles.horario]}>
              Cancha: {item.Cancha}
            </Text>
            <Text style={[styles.titulo, styles.horario]}>
              Fecha: {item.Fecha}
            </Text>
            <Text style={[styles.titulo, styles.horario]}>
              Inicio del turno: {item.InicioTurno}
            </Text>
            <View>
              <Text
                style={
                  item.Estado == "Cancelado"
                    ? styles.viewTurnoCancelado
                    : styles.viewTurnoUsado
                }
              >
                {item.Estado}
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
        data={TurnPast} // Cambiar por array con turnos pasados (turnos del historial)
        enableEmptySections={true}
        renderItem={TurnoPasado}
      />
    </>
  );
};

export default Historial;

