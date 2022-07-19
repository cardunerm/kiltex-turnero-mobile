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
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Registrarse from "./Registrarse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import RecoverPasswod from "./RecoverPasswod";
const Login = ({ visbLogin, setVisbLogin, logout, setLogout }) => {
  const navigation = useNavigation();

  //Hooks
  const [visbRegister, setVisbRegister] = useState(false);
  const [visbRecuperarPass, setVisbRecuperarPass] = useState(false);
  const [usuario, setUsuario] = useState();
  const [token, setToken] = useState();

  /*
const obtenerDatos = async () => {
  try{
   const usuario =	await AsyncStorage.getItem('usuario')
   const us=JSON.parse(usuario)
   console.log('el usuar: ')
   setUsuario(usuario)
  } catch(error){
    console.log(error)
  }
}
useEffect(() => {
  obtenerDatos();
}, []);
*/
  useEffect(() => {
    obtenerDato();
  }, [visbRegister]);

  const obtenerDato = async () => {
    try {
      const us = await AsyncStorage.getItem("usuario");
      const usar = JSON.parse(us);
      setUsuario(usar);
      
    } catch (er) {
      console.log(er);
    }
  };

  const {reset,control,handleSubmit,formState: { errors },
  } = useForm({
    defaultValues: {
      user: "",
      password: "",
    },
  });
  const alertNoSesion = ()=> {
    Alert.alert(
      'No se pudo iniciar sesion',
      'El usuario o la contraseña son incorrectos',
      [
        {text:'OK'},
      ]
    )
  }

  const onSubmit = (data) => {
    //setVisbLogin(!visbLogin);
    if (usuario.user === data.user && usuario.password === data.password) {
      navigation.navigate("body")
      
      reset();
    } else {
      alertNoSesion()
      
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.banner}>
            <Image
              style={styles.imgBanner}
              source={require("../assets/LogoPadelPrueba.jpg")}
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              rules={{
                required: "Este campo es requerido",
                minLength: {
                  value: 7,
                  message: "La cantidad minima son 7 caracteres",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="E-mail"
                  keyboardType='email-address'
                />
              )}
              name="user"
            />
            <Text style={styles.errorText}>{errors.user?.message}</Text>
            <Text style={styles.label}>Password</Text>
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
                  style={styles.input}
                  onBlur={onBlur}
                  placeholder="contraseña"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                  keyboardType="numeric"
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
                <Text style={styles.btnText}>Iniciar Sesion</Text>
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
      <Registrarse
        visbRegister={visbRegister}
        setVisbRegister={setVisbRegister}
      />
      <RecoverPasswod
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
  textOlvContraseña:{
    textAlign:'center',
    color:'#eee'
  }
});
