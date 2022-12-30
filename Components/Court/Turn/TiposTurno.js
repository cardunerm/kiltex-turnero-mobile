import React from "react";
import {
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Dialog, Portal} from "react-native-paper";
import { styles } from "../../css/CssTurnoLibre";

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
