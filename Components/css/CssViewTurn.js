import {StyleSheet} from "react-native";
import { colorBackSecundario, headerTintColor } from "./variables_Css";
export const styles = StyleSheet.create({
    card: {
      backgroundColor: "#fff",
      marginLeft: 25,
      marginTop: 20,
      shadowColor: "#6b9ae5c4",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
  
      elevation: 24,
      paddingHorizontal: 25,
      paddingRight: 34,
      paddingVertical: 20,
      borderBottomLeftRadius: 20,
      borderTopLeftRadius: 20,
    },
    text: {
      paddingVertical: 20,
      borderBottomColor: "#94abcf",
      borderBottomWidth: 1,
      paddingHorizontal: 20,
      fontSize: 15,
    },
    containBtn: {
      marginLeft: 25,
      marginTop: 30,
      paddingVertical: 20,
    },
    btnCancelNo: {
    display:'none'
    },
    btnCancel: {
      backgroundColor: colorBackSecundario,
      borderBottomLeftRadius: 20,
      borderTopLeftRadius: 20,
    },
    btnCMText: {
      color: headerTintColor,
      fontSize: 22,
      textAlign: "center",
      paddingVertical: 15,
    },
    btnMover: {
      backgroundColor: colorBackSecundario,
      marginTop: 30,
      borderBottomLeftRadius: 20,
      borderTopLeftRadius: 20,
    },
    containInfo: {
      borderColor: "#12407ca6",
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderStyle: "dashed",
      paddingVertical: 15,
      paddingHorizontal: 15,
    },
  });