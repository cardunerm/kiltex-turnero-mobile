import React from "react";
import {
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { styles } from "../../css/CssTurnoLibre";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
const minDate = new Date();
const weekdays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septimbre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const disabledDates = ["2022-08-06T15"]; // Dentro de este array van las fechas que no pueden ser seleccioadas
export const Calendario = ({ setFecha }) => {
  return (
    <>
      <Text style={styles.label}>Fecha</Text>
      <View style={styles.calendarPicker}>
        <CalendarPicker
          disabledDates={disabledDates}
          onDateChange={setFecha}
          selectYearTitle="Seleccionar Año"
          selectedDayColor="blue"
          selectedDayTextColor="#FFFFFF"
          minDate={minDate}
          weekdays={weekdays}
          months={months}
          nextTitle=">"
          previousTitle="<"
          nextTitleStyle={styles.nextTitle}
          previousTitleStyle={styles.previousTitle}
        />
      </View>
    </>
  );
};

export const Boton =({SolicitarTurno,carga}) => {
    return(
    <>
      <Pressable
        style={styles.btnTurno}
        onPress={() => {
          SolicitarTurno();
        }}
      >
        {carga ? (
          <View>
            <ActivityIndicator size="large" color="#1258B1" />
          </View>
        ) : (
          <Text style={styles.textBtnTurno}>Solicitar Turno </Text>
        )}
      </Pressable>
    </>
  )};