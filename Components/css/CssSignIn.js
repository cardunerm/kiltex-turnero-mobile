import {StyleSheet} from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#2b2b2d",
    },
    banner: {
      backgroundColor: "#399edea8",
      paddingBottom: 30,
      paddingTop: 50,
      marginBottom: 20,
      borderBottomEndRadius: 30,
      borderBottomStartRadius: 30,
    },
    back: {
      backgroundColor: "#0965a1",
      width: 70,
      flexDirection: "row",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      paddingTop: 50,
      paddingBottom: 30,
      marginLeft: 5,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
      borderColor: "#399edea8",
      borderWidth: 1,
      zIndex: 60,
    },
    bannerText: {
      color: "#fff",
      textAlign: "center",
      fontSize: 25,
      fontWeight: "900",
      position: "relative",
      zIndex: 20,
    },
    form: {
      marginHorizontal: 20,
      backgroundColor: "#399edea8",
      paddingHorizontal: 10,
      paddingVertical: 20,
      borderRadius: 20,
      marginBottom: 7,
    },
    label: {
      color: "white",
      marginRight:0,
      marginLeft: 0,
      marginBottom:5,
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
      height: 45,
      padding: 10,
      borderRadius: 4,
    },
    errorText: {
      color: "#960303",
    },
    textRegister: {
      paddingVertical: 10,
      fontSize: 15,
    },
    textRegister2: {
      color: "#fff",
      paddingVertical: 10,
      fontWeight: "700",
      //Recordar subrayar texto
    },
  });
  