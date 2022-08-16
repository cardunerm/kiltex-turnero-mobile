import React,{useState,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { environment } from "../env/env.develop";
//Service
import callApiGet from "../Service";

const Turno = () => {
  //Hooks
  const [courts, setCourts] = useState([]);
  //Peticion a la api
  useEffect(() => {
    callApiGet(filter, url, setQuestion, setCargando);//Peticion
  }, []);

  const filter = {
    filter: " ",
    page: 0,
    pageSize: 10,
  };//Body

  const url = environment.api.url + "/api/v1/client/Reservation/list_my_reservations";//Url

/*  const alertEliminarTurno = () => {
    Alert.alert(
      "¿Esta seguro de eliminar este turno?",
      "Una vez eliminado no se podra recuperar. Debera solicitar otro turno",
      [
        { text: "No" },
        {
          text: "Si,Eliminar",
          onPress: () => {
            //Se realizaria la peticion a la api para eliminar el turno
            console.log("Se elimino el turno");
          },
        },
      ]
    );
  };

  <Pressable 
          onPress={()=>{
            alertEliminarTurno()
          }}
          style={styles.btnCancelar}>
            <Text style={styles.btnCancelarText}>Cancelar Turno</Text>
          </Pressable>*/
  return (
    <>
      <View style={styles.card}>
        <View style={styles.contTurno}>
          <Text style={[styles.titulo, styles.fecha]}>Fecha del Turno</Text>
          <Text style={[styles.titulo, styles.horario]}>Horario del Turno</Text>
          <Text style={[styles.titulo, styles.horario]}>Tiempo del Turno</Text>
          <Text style={[styles.titulo, styles.cancha]}>Cancha del Turno</Text>
        </View>
      </View>
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
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
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
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 17,
  },
  fecha: {
    fontSize: 20,
    fontWeight: "700",
    borderBottomColor: "#03408c6e",
    borderBottomWidth: 0.5,
  },
  horario: {
    fontWeight: "500",
    borderBottomColor: "#03408c6e",
    borderBottomWidth: 0.5,
  },
  btnCancelar: {
    backgroundColor: "blue",
    paddingVertical: 5,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  btnCancelarText: {
    color: "#fff",
    textAlign: "center",
  },
});
