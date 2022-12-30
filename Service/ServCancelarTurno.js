import { environment } from "../env/env.develop";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const CancelarTurnoApi = async (data) => {
    try {
        const usuario = await AsyncStorage.getItem("token");
        const tokenn = JSON.parse(usuario);
        get(data, tokenn);
    } catch (error) {
        console.log(error);
    }
};
const get = async (data, token) => {
    const url =
        environment.api.url + "/api/v1/client/Reservation/cancel_my_reservation?id=" + data;
    await axios({
            method: "put",
            url: url,
            headers: { Authorization: "Bearer " + token},
          })
            .then((response) => {
            })
            .catch((e) => {
              console.log(e);
            });
};
