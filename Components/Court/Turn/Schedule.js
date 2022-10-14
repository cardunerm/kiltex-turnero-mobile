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




export const Schedule = ({ tiempo, setTiempo}) => {
    const turnos = [
        {
          id: "1",
          horarioInicio: "08:00 ",
          horrioFin: "09:30 ",
        },
        {
          id: "2",
          horarioInicio: "09:30 ",
          horrioFin: "11:00 ",
        },
        {
          id: "3",
          horarioInicio: "11:00 ",
          horrioFin: "12:30 ",
        },
        {
          id: "4",
          horarioInicio: "12:30 ",
          horrioFin: "14:00 ",
        },
        {
          id: "5",
          horarioInicio: "14:00 ",
          horrioFin: "15:30 ",
        },
      ];
    
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
                {item.horarioInicio}
              </Text>
            </Pressable>
          </>)}}
      />
    </>
  );
};
