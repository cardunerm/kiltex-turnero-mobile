import React, { useEffect, useState } from "react";
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
import { environment } from "../env/env.develop";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const TurnoLibre = ({ route }) => {
  const id = route.params;


  //Hooks
  const [fecha, setFecha] = useState();
  const [cancha, setCancha] = useState();
  const [tiempo, setTiempo] = useState('1');

  useEffect(()=>{
    setCancha(id)
  },[id])
  //Peticion a la API
  

    const getDataStorage = async () => {
      try {
        const usuario = await AsyncStorage.getItem("token");
        const tokenn = JSON.parse(usuario);
        get(tokenn);
      } catch (error) {
        console.log(error);
      }
    };
    const get = async (token) => {
      const url =environment.api.url + "/api/v1/client/Reservation/new_reservation";
      await axios({
        method: "post",
        url: url,
        data: Turno,
        headers: { Authorization: "Bearer " + token },
      })
        .then((response) => {
          console.log(response.data)
        })
        .catch((e) => {
          console.log("ERR" + e);
        });
    };

  //Turno
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fecha: "",
      tiempo: "",
    },
  });
  const Turno = {
  courtId: cancha,
  scheduleId: JSON.parse(tiempo),
  paymentMethodId: 1,
  };
  const navigation = useNavigation();
  const SolicitarTurno = () =>{
    console.log(Turno)
    //Se subiria la fech
    
      //setSolTurno(!solTurno);
      //navigation.navigate("payment")
      getDataStorage()
      return
    
    
  }

  const alertNoTurno = () => {
    Alert.alert(
      "No se pudo solicitar turno",
      "Debe seleccionar fecha y hora ",
      [{ text: "OK" }]
    );
  };
//Calendario
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
        <View style={  styles.container}>
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
              <Picker.Item label="08:00hs - 09:30hs" value="1" />
              <Picker.Item label="09:30hs - 11:00hs" value="2" />
              <Picker.Item label="11:00hs - 12:30hs" value="3" />
              <Picker.Item label="12:30hs - 14:00hs" value="4" />
              <Picker.Item label="14:00hs - 15:30hs" value="5" />
              <Picker.Item label="15:30hs - 17:00hs" value="6" />
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

export default TurnoLibre
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
