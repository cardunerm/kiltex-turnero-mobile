import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../css/CssViewTurn";
import { alertCancelar } from "../../Alert";
import { CancelarTurnoApi } from "../../../Service/ServCancelarTurno"
import { useNavigation } from "@react-navigation/native";
const ViewTurn = ({ route }) => {
  const navigation = useNavigation();
  //HOOKS
  const { item } = route.params;
  const [isNavigation, setIsNavigation] = useState(false);
  useEffect(() => {
    if (isNavigation) {
      navigation.navigate("Turnos");
    }
    setIsNavigation(false)
  }, [isNavigation]);
  //BODY PRINCIPAL
  const accionCanelar = () => {
    CancelarTurnoApi(id, setIsNavigation)
  }
  return (
    <>
      <ScrollView>
        <View style={styles.card}>
          <View>
            <Text style={styles.text}>{item.court}</Text>
            <Text style={styles.text}>Fecha: {item.turn.slice(0, 10)}</Text>
            <Text style={styles.text}>
              Inicio del turno: {item.turn.slice(11, 13)}:{" "}
              {item.turn.slice(14, 16)} hs
            </Text>
            <Text style={styles.text}>
              Finalizacion del turno: {item.turn.slice(28, 30)} :{" "}
              {item.turn.slice(31, 33)} hs{" "}
            </Text>
          </View>
        </View>
        <View style={styles.containBtn}>
          <Pressable
            style={styles.btnCancel}
            onPress={() => alertCancelar("Cancelar Turno", "¿Esta seguro que desea cancelar este turno?", item.id, setIsNavigation)}
          >
            <Text style={styles.btnCMText}>Cancelar Turno</Text>
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