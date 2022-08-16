import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  TextInput,
  Button,
  Buttom,
  Alert,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import CalendarPicker from "react-native-calendar-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SolicitarTurno = ({ solTurno, setSolTurno, detCourts }) => {
  //Hooks
  const [fecha, setFecha] = useState();
  const [tiempo, setTiempo] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fecha: "",
      telefono: "",
    },
  });
  const cancha = detCourts.name;
  const Turno = {
    cancha,
    fecha,
    tiempo,
  };
  const navigation = useNavigation();
  const SolicitarTurno = () =>{
    console.log(Turno)
    //Se subiria la fech
    if(Turno.fecha != undefined && Turno.tiempo != ""){
      //setSolTurno(!solTurno);
      navigation.navigate("payment")
      return
    }
    
    alertNoTurno()
  }

  const alertNoTurno = () => {
    Alert.alert(
      "No se pudo solicitar turno",
      "Debe seleccionar fecha y hora ",
      [{ text: "OK" }]
    );
  };

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
  const disabledDates =["2022-08-06T15"] // Dentro de este array van las fechas que no pueden ser seleccioadas 

  return (
    <>
      <ScrollView>
        <View style={!solTurno ? styles.container2 : styles.container}>
          <View style={styles.form}>
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
            
            <Text style={styles.label}>Turnos Disponibles</Text>
            <Picker
              style={styles.pickerItem}
              selectedValue={tiempo}
              onValueChange={(tiempo) => setTiempo(tiempo)}
            >
              <Picker.Item
                style={styles.pickerItem}
                label="- Seleccionar -"
                value=""
              />
              <Picker.Item label="08:00hs - 09:30hs" value="08:00-9:30" />
              <Picker.Item label="09:30hs - 11:00hs" value="09:30-11:00" />
              <Picker.Item label="11:00hs - 12:30hs" value="11:00-12:30" />
              <Picker.Item label="12:30hs - 14:00hs" value="12:30-14:00" />
              <Picker.Item label="14:00hs - 15:30hs" value="14:00-15:30" />
              <Picker.Item label="15:30hs - 17:00hs" value="15:30-17:00" />
            </Picker>
          </View>
          <Pressable
            style={styles.btnTurno}
            onPress={() => {
                SolicitarTurno ()
              ;
              //En esta parte se enviaria el turno a la Api
            }}
          >
            <Text style={styles.textBtnTurno}>Solicitar Turno</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default SolicitarTurno;
const styles = StyleSheet.create({
  container2: {
    display: "none",
  },
  container: {
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    borderColor: "blue",
    borderWidth: 1,
  },
  form: {
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    paddingVertical: 20,
  },
  calendarPicker:{
    borderTopColor:'blue',
    borderBottomColor:'blue',
    borderTopWidth:1,
    borderBottomWidth:1,
    marginHorizontal: -10,
  },
  nextTitle: {
    fontSize: 25,
    fontWeight: "600",
    marginRight: 20,
  },
  previousTitle: {
    fontSize: 25,
    fontWeight: "600",
    marginLeft: 20,
  },
  btnTurno: {
    backgroundColor: "blue",
    marginTop: 30,
    paddingVertical: 10,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  textBtnTurno: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    textTransform: "uppercase",
  },
});
