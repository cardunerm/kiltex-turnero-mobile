import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { environment } from "../env/env.develop";
import { alert } from "../Components/Alert";
//PETICION A LA API - VALIDACION DEL USUARIO
export const logApi = (user,setCargando,setToken) => {
  const url = environment.api.url + "/api/v1/Auth/ClientLogin";
  axios
    .post(url, user)
    .then((response) => {
      if (response != null) {
        let Token = response.data.token;
        let fullname = response.data.fullName;
        guardarToken(Token, fullname);
        setToken(Token)
        console.log(response.data)
      } 
    })
    .catch((e) => {
      console.log(e)
      alert("No se pudo iniciar sesion","El usuario o la contraseña son incorrectos");
      setCargando(false);
    });
};
const guardarToken = async (data, fullName) => {
  try {
    await AsyncStorage.setItem("token", JSON.stringify(data));
    await AsyncStorage.setItem("usuario", JSON.stringify(fullName));
  } catch (e) {
    console.log(e);
  }
};