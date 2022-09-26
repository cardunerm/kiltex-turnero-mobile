import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { environment } from "../env/env.develop";


export const courtHomeApi = async (setCourts,setCargando) => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(tokenn,setCourts,setCargando);
    } catch (error) {
      console.log(error);
    }
  };
  const get = async (token,setCourts,setCargando) => {
    const url = environment.api.url + "/api/v1/client/Court/list_all_courts";
    await axios({
      method: "post",
      url: url,
      data: filter,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        setCourts(response.data.data);
        setCargando(false);
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };
  const filter = {
    filter: "",
    page: 0,
    pageSize: 10,
  }; //Body
export const newsletterHomeApi = async (setNovedades) => {
    const urlNovedades = environment.api.url + "/api/v1/client/HomeCard/list_home_cards";
    await axios
      .get(urlNovedades)
      .then((response) => {
        setNovedades(response.data);
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
};