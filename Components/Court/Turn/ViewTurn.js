import React,{ useEffect, useState} from "react";
import {
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../css/CssViewTurn";
import { alertBD,alertCancelar } from "../../Alert";
import {CancelarTurnoApi} from "../../../Service/ServCancelarTurno"
import { useNavigation } from "@react-navigation/native";
const ViewTurn = ({ route }) => {
  const navigation = useNavigation();
  //HOOKS
  const { court, turn, id} = route.params;
  const [isNavigation,setIsNavigation] = useState(false);
  useEffect(() => {
    console.log('nav')
    console.log(isNavigation)
    if(isNavigation){
          navigation.navigate("Turnos");
    }
    setIsNavigation(false)
  }, [isNavigation]);
  //BODY PRINCIPAL
  const accionCanelar =()=>{
    CancelarTurnoApi(id,setIsNavigation)
  }
  const NAVEG= () => {
    
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
            <Text style={styles.text}>Fecha: {turn.slice(0, 10)}</Text>
            <Text style={styles.text}>
              Inicio del turno: {turn.slice(11, 13)}:{" "}
              {turn.slice(14, 16)} hs
            </Text>
            <Text style={styles.text}>
              Finalizacion del turno: {turn.slice(28, 30)} :{" "}
              {turn.slice(31, 33)} hs{" "}
            </Text>
          </View>
        </View>
        <View style={styles.containBtn}>
          <Pressable
            style={styles.btnCancel}
            onPress={() => alertCancelar("Cancelar Turno","¿Esta seguro que desea cancelar este turno?",id,setIsNavigation)}
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