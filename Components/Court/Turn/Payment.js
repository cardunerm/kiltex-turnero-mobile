import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import { Foundation } from "@expo/vector-icons";

const Payment = () => {
  const open = () => {
    let url = "https://mpago.la/1YhXGKV";
    Linking.openURL(url).then((Response) => {
      console.log(Response);
    });
  };

  return (
    <>
      <View style={styles.montoContainer}>
        <View style={styles.montoNumber}>
          <Text style={styles.monto}>
            <Foundation name="dollar" size={30} color="#fff" />
            {"  "}2.000
          </Text>
        </View>
      </View>
      <View style={styles.containerPayment}>
        <View style={styles.containerBtn}>
          <Pressable
            style={[styles.btnAccion, styles.btnAccionPagar]}
            onPress={() => open()}
          >
            <Text style={styles.textPayment}>Pagar</Text>
          </Pressable>
          <Pressable style={[styles.btnAccion, styles.btnAccionCancelar]}>
            <Text style={styles.textPayment}>Cancelar</Text>
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
    marginBottom: 60,
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
    marginBottom: 60,
  },
  textPayment: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 15,
    color: "#fff",
  },
  viewForText: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnAccion: {
    marginTop: 30,
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
});
