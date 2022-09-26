import React, {  useState } from "react";
import {
  Text,
  Modal,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { environment } from "../../env/env.develop";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../css/CssRecoverPassword";
const RecoverPassword = ({ visbRecuperarPass, setVisbRecuperarPass }) => {
//IMPORTANTE
    //UNA VES MODIFICADO EL LINK DE RECUPERACION DE CONTRASEÑA Y REALIZADA LA PANTALLA WEB 
    //SE DEBEN MODIFICAR MUCHOS ASPECTOS (el usuario no debe ingresar ningun codigo, la recuperacion de contraseña se hace de forma externa a la apliocacion)

  //HOOKS
  const [valor, setValor] = useState("");
  const [token, setToken] = useState("");
  const [newPass, setNewPas] = useState("");
  const [reset, setReset] = useState(false);

  //PETICION A LA API
  const url =
    environment.api.url +
    "/api/v1/Auth/RequestPasswordReset?clientEmailAddress=" +
    valor;
  const urlReset = environment.api.url + "/api/v1/Auth/ResetPassword";

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

  const body = {
    token: token,
    password: newPass,
  };
  const resetPassword = async () => {
    await axios
      .post(urlReset, body)
      .then((response) => {})
      .catch((e) => {
        console.log("ERR" + e);
      });
  };

  const onSubmit = () => {
    sendMail();
  };

  const onSubmitReset = () => {
    resetPassword();
    setToken("");
    setNewPas("");
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

export default RecoverPassword;