import React, { useEffect, useState} from "react";
import {
  Text,
  View,
  Pressable,
  SectionList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Dialog, Portal, Provider } from "react-native-paper";
import { FlatGrid } from "react-native-super-grid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../css/CssTurnoLibre";
import { alert } from "../../Alert";
import { TurnoLibreApi } from "../../../Service/ServSolicitarTurno";
import { Calendario } from "./CalendarioTurno";
import { Boton } from "./CalendarioTurno";
import { Schedule } from "./Schedule";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export const TiposTurnos =({visible,setVisible})=>{
    const navigation = useNavigation();
    const hideDialog = () => {
        //dialogo emergente
        setVisible(false);
        navigation.navigate("Courts");
        navigation.navigate("Turno");
      };
    return(
        <Portal>
          <Dialog visible={visible}>
            <Dialog.Title>El turno se ha solicitado correctamente</Dialog.Title>

            <Dialog.Actions>
              <Pressable style={styles.verTurnoCont} onPress={hideDialog}>
                <Text style={styles.verTurno}>Ver Turno</Text>
              </Pressable>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    )

}
