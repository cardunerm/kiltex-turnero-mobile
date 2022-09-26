import { Alert } from "react-native";

export const alert = (message1, message2) => {
  Alert.alert(
    message1, 
    message2, 
    [{ text: "OK" }]);
};

export const alertBD = (message1, message2,titl2,accion) => {
  Alert.alert(
    message1, 
    message2, 
    [
    { text: "No", style: "cancel", onPress: () => {} },
    {
      text: titl2,
      onPress: () => {
        accion
      },
    },
  ]);
};
