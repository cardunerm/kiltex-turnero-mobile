import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  headerStyleBack,
  headerTintColor,
} from "../../../Components/css/variables_Css";

const Payment = ({ route }) => {
  const navigation = useNavigation();

  const { nameCancha, fecha } = route.params;
  const open = () => {
    let url = "https://mpago.la/1YhXGKV";
    Linking.openURL(url).then((Response) => {
      navigation.navigate("Courts");
    });
  };

  return (
    <>
      <View style={styles.montoContainer}>
        <View style={styles.montoNumber}>
          <View style={styles.containerTextSub}>
            <Text style={styles.textSub}>{" "}Cancha: {nameCancha} </Text>
            <Text style={styles.textSub}>{" "}Fecha: {fecha.slice(0, 10)} ~ {fecha.slice(10, 16)} hs  </Text>
          </View>
          <Text style={styles.textPayment}>Total a Pagar : </Text>
          <Text style={styles.monto}>
            <Foundation name="dollar" size={30} color="#fff" />
            {"  "}2.000
          </Text>
        </View>
        <View style={styles.mensajePago}>
          <Text style={styles.mensajeText}> <MaterialCommunityIcons
            name="information"
            size={17}
            color={headerTintColor}
          />{" "} Una ves realizado el pago se le enviara un mail confirmando la recerva</Text>
        </View>
      </View>
      <View style={styles.containerPayment}>
        <View style={styles.containerBtn}>
          <Pressable
            style={[styles.btnAccion, styles.btnAccionPagar]}
            onPress={() => open()}>
            <Text style={styles.textPagar}>Pagar</Text>
          </Pressable>
          <Pressable style={[styles.btnAccion, styles.btnAccionCancelar]} onPress={() => { navigation.navigate("TurnoLibre") }}>
            <Text style={styles.textPagar}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default Payment;
const styles = StyleSheet.create({
  montoContainer: {
    backgroundColor: "#103a70",
  },
  montoNumber: {
    marginTop: 30,
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 30,
  },
  containerPayment: {
    backgroundColor: "#eee",
    borderRadius: 30,
    marginTop: -30,
    flex: 1,
  },
  monto: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
  textPagar: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 15,
    color: "#fff",
  },
  textPayment: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 10,
  },
  viewForText: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnAccion: {
    marginTop: 18,
  },
  containerBtn: {
    marginTop: 40,
  },
  btnAccionPagar: {
    backgroundColor: "#103a70",
  },
  btnAccionCancelar: {
    backgroundColor: "#a60303",
  },
  mensajePago: {
    backgroundColor: headerStyleBack,
    paddingTop: 10,
    paddingBottom: 55,
  },
  mensajeText: {
    textAlign: "center",
    color: '#fff',
    fontSize: 15,
    paddingHorizontal: 20,
  },
  containerTextSub:{
    marginBottom:20,
    
  },
  textSub: {
    textAlign:'center',
    color:headerTintColor,
    fontSize:20,
    marginVertical:8,
  }
});
