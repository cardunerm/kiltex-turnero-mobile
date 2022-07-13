import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

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
          <Pressable style={styles.btnCancelar}>
            <Text style={styles.btnCancelarText}>Cancelar Turno</Text>
          </Pressable>
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
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
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
    paddingHorizontal:20,
  },
  titulo:{
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
  btnCancelar:{
    backgroundColor:'blue',
    paddingVertical:5,
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
  },
  btnCancelarText:{
    color:'#fff',
    textAlign:'center',
  },
});
