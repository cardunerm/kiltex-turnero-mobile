
import axios from "axios";
import { environment } from "../env/env.develop";
import { alert } from "../Components/Alert";
export const registerApi = (user) => {
    const url = environment.api.url + "/api/v1/Auth/register";
    axios
      .post(url, user)
      .then((response) => {})
      .catch((e) => {
        console.log(e.response.data);
        alert("No se pudo registrar",e.response.data);
      });
  };