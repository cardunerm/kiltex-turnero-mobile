import React from "react";
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
import { useNavigation } from "@react-navigation/native";

const Historial = () => {
  const navigation = useNavigation();
  const TurnPast = [
    {Cancha:'Cancha 1',Fecha:'04-08-2022', InicioTurno:'08:00 hs', FinTurno:'09:30 hs',Estado:'Cancelado'},
    {Cancha:'Cancha 2',Fecha:'04-08-2022', InicioTurno:'08:00 hs', FinTurno:'09:30 hs',Estado:'Usado'},
    {Cancha:'Cancha 1',Fecha:'04-08-2022', InicioTurno:'08:00 hs', FinTurno:'09:30 hs',Estado:'Cancelado'}

];

  const TurnoPasado = ({ item }) => {
    return (
      <>
        <View style={styles.listTurno}>
          <View style={styles.contTurno}>
          <Text style={[styles.titulo, styles.horario]}>Cancha:{" "}{item.Cancha}</Text>
            <Text style={[styles.titulo, styles.horario]}>Fecha:{" "}{item.Fecha}</Text>
            <Text style={[styles.titulo, styles.horario]}>
              Inicio del turno:{" "}{item.InicioTurno}
            </Text>
            <View>
              <Text style={item.Estado == 'Cancelado'? styles.viewTurnoCancelado : styles.viewTurnoUsado }>{item.Estado}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <>
      <FlatList
        data={TurnPast} // Cambiar por array donde se guarden los turnos fijos
        enableEmptySections={true}
        renderItem={TurnoPasado}
      />
    </>
  );
};

export default Historial;
const styles = StyleSheet.create({
  listTurno: {
    backgroundColor: "#fff",
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
    marginBottom:20,
    borderTopColor:'#999999',
    borderTopWidth:1,
    borderBottomColor:'#999999',
    borderBottomWidth:1,
  },
  contTurno: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 17,
  },
  horario: {
    fontWeight: "500",
    borderBottomColor: "#03408c6e",
    borderBottomWidth: 0.5,
  },
  viewTurnoUsado: {
    textAlign: "center",
    backgroundColor: "#12407c",
    marginBottom: -20,
    marginHorizontal: -20,
    paddingVertical: 10,
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  viewTurnoCancelado: {
    textAlign: "center",
    backgroundColor: "#930000",
    marginBottom: -20,
    marginHorizontal: -20,
    paddingVertical: 10,
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
