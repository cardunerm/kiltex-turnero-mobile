import React, { useEffect, useState } from "react";
import { Text, View, Pressable, ActivityIndicator } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { styles } from "../../css/CssTurnoLibre";
import {ServCalendarioTurno} from "../../../Service/ServCalendarioTurno"

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
export const Calendario = ({ setFecha ,id}) => {
  //Hooks
  useEffect(() => {
    setFechaAct();
  }, []);

  const setFechaAct = (data) => {
    if (data !== undefined) {
      let Mes;
      let mes = data._i.month +1
      let day=data._i.day
      let Day;
      if(mes < 10){
        Mes = '0'+mes.toString();
      }
      else{
        Mes=mes;
      }
      if(day < 10){
        Day = '0'+day.toString();
      }
      else{
        Day=day;
      }
      const cuerpo = {
        page: 0,
        pageSize: 10,
        date: data._i.year + "-" +Mes+ "-" + Day,
        idCourt: id,
      };
ServCalendarioTurno(cuerpo,setFecha)
    } else {
    }
  };

  return (
    <>
      <Text style={styles.label}>Fecha</Text>
      <View style={styles.calendarPicker}>
        <CalendarPicker
          disabledDates={disabledDates}
          onDateChange={setFechaAct}
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

export const Boton = ({SolicitarTurno, carga}) => {
  
  return (
    <>
      <Pressable
        style={styles.btnTurno}
        onPress={() => {
          SolicitarTurno(true);
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
  );
};
