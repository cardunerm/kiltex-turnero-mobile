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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { environment } from "../env/env.develop";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const Registrarse = ({ visbRegister, setVisbRegister }) => {
  //HOOKS
  const [valor, setValor] = useState("");
  const [valorP, setValorP] = useState("");

  //Funciones
  
  const registerApi = (user) => {
    const url = environment.api.url + "/api/v1/Auth/register";
    axios
      .post(url, user)
      .then((response) => {
       
      })
      .catch((e) => {
        
        console.log(e.response.data);
        alertNoRegister(e.response.data)
      });
  };
 

  const registrarUsuario = async (data) => {
    //Se envia al nuevo usuario y con la informacion de este se envia el token
    try {
      await AsyncStorage.setItem("usuario", JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };
  const alertNoRegister = (data) => {
    Alert.alert('No se pudo registrar',data, [
      { text: "OK" },
    ]);
  };


  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
 
    
    
    registerApi(data)
    
    setVisbRegister(!visbRegister);
    reset();
  };

  return (
    <Modal visible={visbRegister}>
      
        <View style={styles.container}>
          <ScrollView>
          <View style={styles.banner}>
            <Pressable
              style={styles.back}
              onPress={() => {
                setVisbRegister(!visbRegister);
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#fff"
                onPress={() => {
                  setVisbRegister(!visbRegister);
                }}
              />
            </Pressable>
            <Text style={styles.bannerText}>Registrarse</Text>
          </View>
          <View style={styles.form} autoComplete="off">
            <Text style={styles.label}>Nombre</Text>
            <Controller
              control={control}
              rules={{
                required: "Este campo es requerido",
                minLength: {
                  value: 4,
                  message: "La cantidad minima son 4 caracteres",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keepSubmitCount={false}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Nombre"
                  keyboardType="default"
                />
              )}
              name="firstName"
            />
            <Text style={styles.errorText}>{errors.firstName?.message}</Text>

            <Text style={styles.label}>Apellido</Text>
            <Controller
              control={control}
              rules={{
                required: "Este campo es requerido",
                minLength: {
                  value: 4,
                  message: "La cantidad minima son 4 caracteres",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  keepSubmitCount={false}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Apellido"
                  keyboardType="default"
                />
              )}
              name="lastName"
            />
            <Text style={styles.errorText}>{errors.lastName?.message}</Text>

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
                  keepSubmitCount={false}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="E-mail"
                  
                />
              )}
              name="emailAddress"
            />
            <Text style={styles.errorText}>{errors.emailAddress?.message}</Text>
            <Text style={styles.label}>Contraseña</Text>
            <Controller
              control={control}
              rules={{
                required: "Este campo es requerido",
                minLength: {
                  value: 8,
                  message: "La contraseña debe ser alfanumerica y tener 8 caracteres",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                 
                  placeholder="Contraseña"
                />
              )}
              name="password"
            />
            <Text style={styles.errorText}>{errors.password?.message}</Text>

            <Text style={styles.label}>Confirmar Contraseña</Text>
            <Controller
              control={control}
              rules={{
                required: "Este campo es requerido",
                minLength: {
                  value: 8,
                  message: "La contraseña debe ser alfanumerica y tener 8 caracteres",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                  
                  placeholder="Confirmar contraseña"
                />
              )}
              name="confirmPassword"
            />
            <Text style={styles.errorText}>{errors.confirmPassword?.message}</Text>

            <View>
              <Pressable
                style={styles.button}
                color
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.btnText}>Registrar</Text>
              </Pressable>
            </View>
          </View>
          </ScrollView>
        </View>
      
    </Modal>
  );
};

export default Registrarse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2d",
  },
  banner: {
    backgroundColor: "#399edea8",
    paddingBottom: 30,
    paddingTop: 50,
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
    zIndex: 60,
  },
  bannerText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "900",
    position: "relative",
    zIndex: 20,
  },
  form: {
    marginHorizontal: 20,
    backgroundColor: "#399edea8",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 7,
  },
  label: {
    color: "white",
    margin: 10,
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
});
