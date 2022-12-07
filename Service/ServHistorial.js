import { environment } from "../env/env.develop";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


 export const historialApi = async (cuerpo,setHistorial) => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(tokenn,cuerpo,setHistorial);
    } catch (error) {
      console.log(error);
    }
  };

  const get = (token,cuerpo,setHistorial) => {
    const url =
      environment.api.url + "/api/v1/client/Reservation/list_my_reservationsHistory";
    axios({
      method: "post",
      url: url,
      data:cuerpo,
      headers: { Authorization: "Bearer " + token},
    })
      .then((response) => {
        setHistorial(response.data.data)
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };

