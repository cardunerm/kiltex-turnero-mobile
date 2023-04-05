import React, {  useState } from "react";
import {
  Text,
  Modal,
  View,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { environment } from "../../env/env.develop";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../css/CssRecoverPassword";
import {alert} from "../Alert"
const RecoverPassword = ({ visbRecuperarPass, setVisbRecuperarPass }) => {
//IMPORTANTE
    //UNA VES MODIFICADO EL LINK DE RECUPERACION DE CONTRASEÑA Y REALIZADA LA PANTALLA WEB 
    //SE DEBEN MODIFICAR MUCHOS ASPECTOS (el usuario no debe ingresar ningun codigo, la recuperacion de contraseña se hace de forma externa a la apliocacion)

  //HOOKS
  const [valor, setValor] = useState("");
  const [token, setToken] = useState("");
  const [newPass, setNewPas] = useState("");
  const [cargando, setCargando] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailAddress: "",
    },
  });
  //PETICION A LA API
  const url =
    environment.api.url +
    "/api/v1/Auth/RequestPasswordReset?clientEmailAddress=" +
    valor;
  const urlReset = environment.api.url + "/api/v1/Auth/ResetPassword";

  const sendMail = async (data) => {
    const url =
    environment.api.url +
    "/api/v1/Auth/RequestPasswordReset?clientEmailAddress=" +
    data;
    await axios
      .post(url, valor)
      .then((response) => {
        setCargando(false)
       alert("","Solicitud realizada con exito")
        
      })
      .catch((e) => {
        console.log("ERR" + e);
        alert("A ocurrido un error","Verifique que el E-mail sea el correcto")
        setCargando(false)
      });
  };

  const body = {
    token: token,
    password: newPass,
  };
  const onSubmit = (data) => {
    setCargando(true);
    sendMail(data.emailAddress)
  };

  const carga = cargando ? (
    <ActivityIndicator size="large" color="#fff" />
  ) : (
    <Text>Recuperar Contraseña</Text>
  );

  return (
    <Modal visible={visbRecuperarPass} animationType="slide">
      {(Platform.OS === "android")?(<View></View>):(<SafeAreaView></SafeAreaView>)}
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
          <View style={styles.form}>
        <Text style={styles.label}>Ingresa tu E-mail</Text>

        <Controller
        control={control}
        rules={{
          required: "Este campo es requerido",
          minLength: {
            value: 11,
            message: "La cantidad minima son 11 caracteres",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="E-mail"
            keyboardType="email-address"
          />
        )}
        name="emailAddress"
      />
      <Text style={styles.errorText}>{errors.emailAddress?.message}</Text>
        <View>
          <Pressable style={styles.button} color onPress={handleSubmit(onSubmit)}>
            <Text style={styles.btnText}>{carga}</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.mensajeContainer}>
        <Text style={styles.mensaje}>
          Se te enviara un correo con las indicaciones a seguir para recuperar
          tu contraseña
        </Text>
      </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default RecoverPassword;