import React from "react";
import { Text, View, StyleSheet, Pressable , ScrollView,Alert} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
const ViewTurn = ({ route }) => {
    const { court, schedule } = route.params;
  console.log(route.params);


  const alertCancelarTurno = () => {
    Alert.alert("Cancelar Turno", "¿Esta seguro que desea cancelar este turno?", [
    { text: "No", style: "cancel", onPress: () => {} },
    {
      text: "Si",
      onPress: () => {
        console.log('Se elimino el turno')
      },
    },
  ])
  };
  return (
    <>
    <ScrollView>
      <View style={styles.card}>
        <View>
          <Text style={styles.text}>{court}</Text>
          <Text style={styles.text}>Fecha: {schedule.slice(0, 10)}</Text>
          <Text style={styles.text}>
            Inicio del turno: {schedule.slice(11, 13)} :{" "}
            {schedule.slice(14, 16)} hs
          </Text>
          <Text style={styles.text}>
            Finalizacion del turno: {schedule.slice(28, 30)} :{" "}
            {schedule.slice(31, 33)} hs{" "}
          </Text>
        </View>
      </View>
      <View style={styles.containBtn}>
        <Pressable style={styles.btnCancel}  onPress={() => alertCancelarTurno()}>
          <Text style={styles.btnCMText}>Cancelar Turno</Text>
        </Pressable>
        <Pressable style={styles.btnMover}>
          <Text style={styles.btnCMText}>Mover Turno</Text>
        </Pressable>
      </View>
      <View style={styles.containInfo}>
        <Text>
        <MaterialCommunityIcons name="information" size={17} color="black" /> Los turnos deberan cancelarse con un plazo de 24 hs, caso contrario
          no se le devolvera la seña
        </Text>
        <Text>
        <MaterialCommunityIcons name="information" size={17} color="black" /> Al mover un turno se le asignara un bono que le permitira
          seleccionar otro turno libre
        </Text>
      </View>
    </ScrollView>
    </>
  )
}

export default ViewTurn
const styles = StyleSheet.create({
    card: {
      backgroundColor: "#fff",
      marginLeft: 25,
      marginTop: 20,
      shadowColor: "#6b9ae5c4",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
  
      elevation: 24,
      paddingHorizontal: 25,
      paddingRight: 34,
      paddingVertical: 20,
      borderBottomLeftRadius: 20,
      borderTopLeftRadius: 20,
    },
    text: {
      paddingVertical: 20,
      borderBottomColor: "#94abcf",
      borderBottomWidth: 1,
      paddingHorizontal: 20,
      fontSize: 15,
    },
    containBtn: {
      marginLeft: 25,
      marginTop: 30,
      paddingVertical: 20,
    },
    btnCancel: {
      backgroundColor: "#12407c",
      borderBottomLeftRadius: 20,
      borderTopLeftRadius: 20,
    },
    btnCMText: {
      color: "#fff",
      fontSize: 22,
      textAlign: "center",
      paddingVertical: 15,
    },
    btnMover: {
      backgroundColor: "#12407c",
      marginTop: 30,
      borderBottomLeftRadius: 20,
      borderTopLeftRadius: 20,
    },
    containInfo:{
      borderColor:"#12407ca6",
      borderTopWidth:2,
      borderBottomWidth:2,
      borderStyle :'dashed',
      paddingVertical:15,
      paddingHorizontal:15,
    }
  });
  