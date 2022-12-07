import React, { useEffect, useState } from "react";
import { Text, View, Pressable, SectionList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Dialog, Portal, Provider } from "react-native-paper";
import { FlatGrid } from "react-native-super-grid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../css/CssTurnoLibre";
import { alert } from "../../Alert";
import { TurnoLibreApi } from "../../../Service/ServSolicitarTurno";
import { Calendario } from "./CalendarioTurno";
import { Boton } from "./CalendarioTurno";
import { set } from "react-hook-form";




export const Schedule = ({ tiempo, setTiempo,fecha}) => {
    const turnos = fecha
   /* const turnos = [
      {
        "startTime": "23/11/2022 08:03:49",
        "endTime": "23/11/2022 09:33:49",
        "id": 97
      },
      {
        "startTime": "23/11/2022 09:33:49",
        "endTime": "23/11/2022 11:03:49",
        "id": 98
      },
      {
        "startTime": "23/11/2022 11:03:49",
        "endTime": "23/11/2022 12:33:49",
        "id": 99
      },
      {
        "startTime": "23/11/2022 12:33:49",
        "endTime": "23/11/2022 14:03:49",
        "id": 100
      },
      {
        "startTime": "23/11/2022 14:03:49",
        "endTime": "23/11/2022 15:33:49",
        "id": 101
      },
    ]
      */
  return (
    <>
      <Text style={styles.label}>Turnos Disponibles</Text>
      <FlatGrid
        itemDimension={60}
        data={turnos}
        spacing={15}
        keyExtractor={(item) => item.id}
        renderItem={({item}) =>{return(<>
            <Pressable
              style={tiempo == item.id ? styles.horarioSelect : styles.horario}
              onPress={() => {
                setTiempo(item.id);
              }}
            >
              <Text
                style={
                  tiempo == item.id ? styles.horarioTextSelect : styles.horarioText
                }
              >
                {item.startTime.slice(10,16)}
              </Text>
            </Pressable>
          </>)}}
      />
    </>
  );
};
