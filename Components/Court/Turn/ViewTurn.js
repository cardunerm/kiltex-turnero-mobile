import React from "react";
import {
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../css/CssViewTurn";
import { alertBD } from "../../Alert";
const ViewTurn = ({ route }) => {
  //HOOKS
  const { court, schedule } = route.params;
  //ACCIONES
  /*const alertCancelarTurno = () => {
    Alert.alert(
      "Cancelar Turno",
      "¿Esta seguro que desea cancelar este turno?",
      [
        { text: "No", style: "cancel", onPress: () => {} },
        {
          text: "Si",
          onPress: () => {
            console.log("Se elimino el turno");
          },
        },
      ]
    );
  };*/
  //BODY PRINCIPAL
  const accionCanelar =()=>{
    console.log("Se elimino el turno")
  }
  const accionMover =()=>{
    console.log("Se movio el turno")
  }
  return (
    <>
      <ScrollView>
        <View style={styles.card}>
          <View>
            <Text style={styles.text}>{court}</Text>
            <Text style={styles.text}>Fecha: {schedule.slice(0, 10)}</Text>
            <Text style={styles.text}>
              Inicio del turno: {schedule.slice(11, 13)}:{" "}
              {schedule.slice(14, 16)} hs
            </Text>
            <Text style={styles.text}>
              Finalizacion del turno: {schedule.slice(28, 30)} :{" "}
              {schedule.slice(31, 33)} hs{" "}
            </Text>
          </View>
        </View>
        <View style={styles.containBtn}>
          <Pressable
            style={styles.btnCancel}
            onPress={() => alertBD("Cancelar Turno","¿Esta seguro que desea cancelar este turno?","Si",accionCanelar())}
          >
            <Text style={styles.btnCMText}>Cancelar Turno</Text>
          </Pressable>
          <Pressable style={styles.btnMover}onPress={() => alertBD("Mover Turno","¿Esta seguro que desea cancelar este turno?","Si",accionMover())}>
            <Text style={styles.btnCMText}>Mover Turno</Text>
          </Pressable>
        </View>
        <View style={styles.containInfo}>
          <Text>
            <MaterialCommunityIcons
              name="information"
              size={17}
              color="black"
            />{" "}
            Los turnos deberan cancelarse con un plazo de 24 hs, caso contrario
            no se le devolvera la seña
          </Text>
          <Text>
            <MaterialCommunityIcons
              name="information"
              size={17}
              color="black"
            />{" "}
            Al mover un turno se le asignara un bono que le permitira
            seleccionar otro turno libre
          </Text>
        </View>
      </ScrollView>
    </>
  );
};
export default ViewTurn;