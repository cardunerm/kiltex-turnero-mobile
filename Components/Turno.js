import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Turno = () => {
  return (
    <>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.contTurno}>
            <Text style={[styles.titulo,styles.fecha]}>Fecha del Turno</Text>
            <Text style={[styles.titulo,styles.horario]}>Horario del Turno</Text>
            <Text style={[styles.titulo,styles.horario]}>Tiempo del Turno</Text>
            <Text style={[styles.titulo,styles.cancha]}>Cancha del Turno</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Turno;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 5,
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
    paddingVertical:20,
  },
  titulo:{
    paddingLeft:20,
    fontSize:17,
  },
  fecha:{
    fontSize:20,
    fontWeight:'700',
    borderBottomColor:'#03408c6e',
    borderBottomWidth:.5,
  },
  horario:{
    fontWeight:'500',
    borderBottomColor:'#03408c6e',
    borderBottomWidth:.5,
  },
});
