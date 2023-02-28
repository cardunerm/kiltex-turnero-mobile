import { environment } from "../env/env.develop";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const ServCalendarioTurno = async (cuerpo,setFecha) => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(tokenn,cuerpo,setFecha);
    } catch (error) {
      console.log(error);
    }
  };
  const get = (token,cuerpo,setFecha) => {    
    const url =
      environment.api.url + "/api/v1/client/PublicTurn/availableTurns";
    axios({
      method: "post",
      url: url,
      data:cuerpo,
      headers: { Authorization: "Bearer " + token},
    })
      .then((response) => {
        setFecha(response.data.data)
      })
      .catch((e) => {
        console.log(e);
      });
  };
