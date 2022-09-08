import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  View,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import SignIn from "./SignIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import RecoverPassword from "./RecoverPassword";
import axios from "axios";
import { environment } from "../../env/env.develop";
const Login = () => {
  const navigation = useNavigation();
  //HOOKS
  const [visbRegister, setVisbRegister] = useState(false);
  const [visbRecuperarPass, setVisbRecuperarPass] = useState(false);
  const [usuario, setUsuario] = useState();
  const [token, setToken] = useState();
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    if (token != null) {
      navigation.navigate("body");
      setToken(null);
      setCargando(false);
      return;
    }
  }, [token]);

  //MANEJO DE INFORMACION - AsyncStorage
  const obtenerDatos = async () => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const us = JSON.parse(usuario);
      setToken(usuario);
    } catch (error) {
      console.log(error);
    }
  };

  const guardarToken = async (data, fullName) => {
    try {
      await AsyncStorage.setItem("token", JSON.stringify(data));
      await AsyncStorage.setItem("usuario", JSON.stringify(fullName));
    } catch (e) {
      console.log(e);
    }
  };
  //PETICION A LA API - VALIDACION DEL USUARIO
  const logApi = (user) => {
    const url = environment.api.url + "/api/v1/Auth/ClientLogin";
    axios
      .post(url, user)
      .then((response) => {
        if (response != null) {
          let Token = response.data.token;
          let fullname = response.data.fullName;
          guardarToken(Token, fullname);
          obtenerDatos();
        } else {
          alertNoSesion();
        }
      })
      .catch((e) => {
        alertNoSesion();
        setCargando(false);
      });
  };
  //MANEJO DEL FORMULARIO
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  //ACCIONES
  const alertNoSesion = () => {
    Alert.alert(
      "No se pudo iniciar sesion",
      "El usuario o la contraseña son incorrectos",
      [{ text: "OK" }]
    );
  };

  const onSubmit = (data) => {
    setCargando(true);
    logApi(data);
    reset();
  };

  const carga = cargando ? (
    <ActivityIndicator size="large" color="#fff" />
  ) : (
    <Text>Iniciar Sesion</Text>
  );
  //BODY PRINCIPAL
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.banner}>
            <Image
              style={styles.imgBanner}
              source={require("../../assets/LogoPadelPrueba.jpg")}
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
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
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              rules={{
                required: "Este campo es requerido",
                minLength: {
                  value: 1,
                  message:
                    "La contraseña debe ser alfanumerica y tener 8 caracteres",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  placeholder="contraseña"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                  keyboardType="default"
                />
              )}
              name="password"
            />
            <Text style={styles.errorText}>{errors.password?.message}</Text>

            <View>
              <Pressable
                style={styles.button}
                color
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.btnText}>{carga}</Text>
              </Pressable>
            </View>
            <Text style={styles.textRegister}>
              ¿No posee una cuenta?{" "}
              <Text
                style={styles.textRegister2}
                onPress={() => {
                  setVisbRegister(!visbRegister);
                }}
              >
                Registrarse
              </Text>
            </Text>
            <Text
              style={styles.textOlvContraseña}
              onPress={() => {
                setVisbRecuperarPass(!visbRecuperarPass);
              }}
            >
              ¿Olvidaste tu contraseña?
            </Text>
          </View>
        </ScrollView>
      </View>
      <SignIn visbRegister={visbRegister} setVisbRegister={setVisbRegister} />
      <RecoverPassword
        visbRecuperarPass={visbRecuperarPass}
        setVisbRecuperarPass={setVisbRecuperarPass}
      />
    </>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#2b2b2d",
  },
  banner: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imgBanner: {
    marginTop: 50,
    width: 450,
    height: 300,
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
    textAlign: "center",
  },
  textRegister2: {
    color: "#fff",
    paddingVertical: 10,
    fontWeight: "700",
    //Recordar subrayar texto
  },
  textOlvContraseña: {
    textAlign: "center",
    color: "#eee",
  },
});
