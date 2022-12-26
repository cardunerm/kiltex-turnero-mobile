import { environment } from "../env/env.develop";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {alert} from ".././Components/Alert"
export const TurnoLibreApi = async (data,setVisible,setCarga,tiempo) => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(data, tokenn,setVisible,setCarga);
      //setTurnStatus(tokenn, tiempo)
    } catch (error) {
      console.log(error);
    }
  };
  const get = async (data, token, setVisible,setCarga) => {
    const url =
      environment.api.url + "/api/v1/client/Reservation/new_reservation";
    await axios({
      method: "post",
      url: url,
      data: data,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        setVisible(false);
        setCarga(false);
        //schedulePushNotification();
      })
      .catch((e) => {
        setCarga(false);
        alert("No se pudo solicitar turno",e.response.data);
      });
  };