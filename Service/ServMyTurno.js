import { environment } from "../env/env.develop";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const turnosApi = async (setReservationLibre,setCargando,setlistEmpty) => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(tokenn,setReservationLibre,setCargando,setlistEmpty);
    } catch (error) {
      console.log(error);
    }
  };
  const get = (token,setReservationLibre,setCargando,setlistEmpty) => {
    const url =
      environment.api.url + "/api/v1/client/Reservation/list_my_reservations";
    axios({
      method: "post",
      url: url,
      data: filter,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        console.log('si')
        setReservationLibre(
          response.data.data.sort((b, a) => a.schedule > b.schedule)
          
        );
        setCargando(false);
        if (response.data.data[0] == undefined) {
          setlistEmpty(false);
        } else {
          setlistEmpty(true);
        }
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };

  const filter = {
    filter: " ",
    page: 0,
    pageSize: 10,
  }; //Body