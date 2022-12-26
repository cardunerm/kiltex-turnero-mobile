import axios from "axios";
import { environment } from "../env/env.develop";
import { alert } from "../Components/Alert";
export const registerApi = (
  user,
  setVisbRegister,
  visbRegister,
  setCargando,
) => {
  const url = environment.api.url + "/api/v1/Auth/register";
  axios
    .post(url, user)
    .then((response) => {
      setVisbRegister(!visbRegister);
      setCargando(false)
    })
    .catch((e) => {
      alert("No se pudo registrar", e.response.data);
      setCargando(false)
    });
};
