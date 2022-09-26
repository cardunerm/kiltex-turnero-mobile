import { environment } from "../env/env.develop";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


 export const detailsCourtsApi = async (setDetCourts,setCargando,id) => {
    const url = environment.api.url + "/api/v1/client/Court/get_court_detail?id=" + id;
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(tokenn,url,setDetCourts,setCargando);
    } catch (error) {
      console.log(error);
    }
  };

  const get = async (token,url,setDetCourts,setCargando) => {
    await axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setDetCourts(response.data);
        setCargando(false);
        console.log(response.data);
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };