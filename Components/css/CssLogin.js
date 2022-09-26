import {StyleSheet} from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      backgroundColor: "#2b2b2d",
    },
    banner: {
      flexDirection: "row",
      justifyContent: "center",
    },
    imgBanner: {
      marginTop: 50,
      width: 450,
      height: 300,
    },
    form: {
      marginHorizontal: 20,
      backgroundColor: "#399edea8",
      paddingHorizontal: 10,
      paddingVertical: 20,
      borderRadius: 20,
    },
    label: {
      color: "white",
      margin: 20,
      marginLeft: 0,
    },
    button: {
      marginTop: 20,
      color: "#fff",
      height: 40,
      backgroundColor: "#389ddd",
      borderRadius: 4,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    btnText: {
      color: "#fff",
    },
    input: {
      backgroundColor: "#fff",
      borderWidth: 2,
      height: 40,
      padding: 10,
      borderRadius: 4,
    },
    errorText: {
      color: "#960303",
    },
    textRegister: {
      paddingVertical: 10,
      fontSize: 15,
      textAlign: "center",
    },
    textRegister2: {
      color: "#fff",
      paddingVertical: 10,
      fontWeight: "700",
      //Recordar subrayar texto
    },
    textOlvContraseña: {
      textAlign: "center",
      color: "#eee",
    },
  });