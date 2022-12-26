import { Alert } from "react-native";
import { CancelarTurnoApi } from '../Service/ServCancelarTurno'

export const alert = (message1, message2) => {
  Alert.alert(
    message1,
    message2,
    [{ text: "OK" }]);
};

export const alertBD = (message1, message2, titl2, accion) => {
  Alert.alert(
    message1,
    message2,
    [
      { text: "No", style: "cancel", onPress: () => { console.log('no') } },
      {
        text: titl2,
        onPress: () => {
          accion
        },
      },
    ]);
};
export const alertCancelar = (message1, message2, id, setIsNavigation) => {
  Alert.alert(
    message1,
    message2,
    [
      { text: "No", style: "cancel", onPress: () => { } },
      {
        text: "Si",
        onPress: () => {
          CancelarTurnoApi(id);
          setIsNavigation(true)
        },
      },
    ]);
};
