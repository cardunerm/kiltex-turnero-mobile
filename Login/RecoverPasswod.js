import React, { useEffect, useState } from "react";
import {
  Text,
  Modal,
  Image,
  View,
  TextInput,
  Button,
  Buttom,
  Alert,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { environment } from "../env/env.develop";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecoverPasswod = ({ visbRecuperarPass, setVisbRecuperarPass }) => {
  //HOOKS
  const [valor, setValor] = useState("");
  const [token, setToken] = useState("");
  const [newPass, setNewPas] = useState("");
  const [reset, setReset] = useState(false);

  //Funciones
  const url = environment.api.url +"/api/v1/Auth/RequestPasswordReset?clientEmailAddress="+valor;
  const urlReset = environment.api.url +"/api/v1/Auth/ResetPassword"
  
  const sendMail = async () => {
    await axios
      .post(url, valor)
      .then((response) => {
        if (
          response.data.str ==
          "Solicitud de Reestablecimiento de Contraseña realizada con éxito"
        ) {
          setReset(true);
          return;
        }
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };

  const body ={
    token: token,
    password: newPass
  }
  const resetPassword = async () => {
    await axios
      .post(urlReset, body)
      .then((response) => {
       
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };

  const onSubmit = () => {
    sendMail();
  };

  const onSubmitReset = () => {
    resetPassword()
    setToken('');
    setNewPas('');
    setReset(false);
  };
  const resetPas = !reset ? (
    <>
      <View style={styles.form}>
        <Text style={styles.label}>Ingresa tu E-mail</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor={"#B0B0B0"}
          value={valor}
          onChangeText={setValor}
          placeholder="E-mail"
        />
        <View>
          <Pressable style={styles.button} color onPress={onSubmit}>
            <Text style={styles.btnText}>Recuperar Contraseña</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.mensajeContainer}>
        <Text style={styles.mensaje}>
          Se te enviara un correo con las indicaciones a seguir para recuperar
          tu contraseña
        </Text>
      </View>
    </>
  ) : (
    <>
      <View style={styles.form}>
        <Text style={styles.label}>Ingresa el codigo</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor={"#B0B0B0"}
          value={token}
          onChangeText={setToken}
          placeholder="Codigo"
        />
        <Text style={styles.label}>nueva contraseña</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor={"#B0B0B0"}
          value={newPass}
          onChangeText={setNewPas}
          placeholder="Nueva contraseña"
          secureTextEntry={true}
          keyboardType="default"
        />
        <View>
          <Pressable style={styles.button} color onPress={onSubmitReset}>
            <Text style={styles.btnText}>Recuperar Contraseña</Text>
          </Pressable>
        </View>
      </View>
    </>
  );

  return (
    <Modal visible={visbRecuperarPass}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.banner}>
            <Pressable
              style={styles.back}
              onPress={() => {
                setVisbRecuperarPass(!visbRecuperarPass);
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#fff"
              />
            </Pressable>
            <Text style={styles.bannerText}>¿Olvidaste tu contraseña?</Text>
          </View>
          <View>{resetPas}</View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default RecoverPasswod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2d",
  },
  banner: {
    backgroundColor: "#399edea8",
    paddingBottom: 50,
    paddingTop: 100,
    marginBottom: 50,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  back: {
    backgroundColor: "#0965a1",
    width: 70,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    paddingTop: 50,
    paddingBottom: 30,
    marginLeft: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderColor: "#399edea8",
    borderWidth: 1,
  },
  bannerText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 30,
  },
  form: {
    marginHorizontal: 20,
    backgroundColor: "#399edea8",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20,
  },
  label: {
    color: "white",
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 20,
    color: "#fff",
    height: 40,
    backgroundColor: "#389ddd",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 2,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  errorText: {
    color: "#960303",
  },
  textRegister: {
    paddingVertical: 10,
    fontSize: 15,
  },
  textRegister2: {
    color: "#fff",
    paddingVertical: 10,
    fontWeight: "700",
    //Recordar subrayar texto
  },
  mensajeContainer: {
    marginVertical: 80,
    marginHorizontal: 35,
  },
  mensaje: {
    color: "#ccc",
    fontSize: 15,
    fontWeight: "600",
  },
});
