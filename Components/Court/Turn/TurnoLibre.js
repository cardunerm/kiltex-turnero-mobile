import React, { useEffect, useState } from "react";
import { Text, View, Alert, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import CalendarPicker from "react-native-calendar-picker";
import { environment } from "../../../env/env.develop";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Dialog, Portal, Provider } from "react-native-paper";

const TurnoLibre = ({ route }) => {
  const id = route.params;

  //HOOKS
  const [fecha, setFecha] = useState();
  const [cancha, setCancha] = useState();
  const [tiempo, setTiempo] = useState("1");
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    setCancha(id);
  }, [id]);
  //PPETICION A LA API -TUENO LIBRE
  const getDataStorage = async (data) => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(data, tokenn);
      console.log("token : " + tokenn);
    } catch (error) {
      console.log(error);
    }
  };
  const get = async (data, token) => {
    const url =
      environment.api.url + "/api/v1/client/Reservation/new_reservation";
    await axios({
      method: "post",
      url: url,
      data: data,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        console.log(response.data);
        setVisible(true);
      })
      .catch((e) => {
        console.log("ERR" + e);
        console.log(e.response.data);
        mensajeFalloTurno(e.response.data);
      });
  };

  //MANEJO DEL FORMULARIO
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fecha: "",
      tiempo: "",
    },
  });
  //ACCIONES
  const hideDialog = () => {
    setVisible(false);
    navigation.navigate("Courts");
    navigation.navigate("Turno");
  };
  const navigation = useNavigation();
  const SolicitarTurno = () => {
    //body del turno
    const Turno = {
      courtId: cancha,
      scheduleId: tiempo,
      paymentMethodId: 1,
    };
    console.log(tiempo);
    if (fecha == undefined || tiempo == "") {
      alertNoTurno();
      return;
    } else {
      getDataStorage(Turno);
      console.log(Turno);
    }
  };

  const alertNoTurno = () => {
    Alert.alert("No se pudo solicitar turno", "Debe seleccionar fecha y hora", [
      { text: "OK" },
    ]);
  };
  const mensajeFalloTurno = (data) => {
    Alert.alert("No se pudo solicitar turno", data, [{ text: "OK" }]);
  };

  //MANEJO DEL CALENDARIO
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
  //BODY PRINCIPAL
  return (
    <Provider>
      <View style={styles.container}>
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
          {fecha != undefined ? (
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
          ) : (
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
              <Picker.Item label="Debe seleccionar un dia" />
            </Picker>
          )}
        </View>
        <Pressable
          style={styles.btnTurno}
          onPress={() => {
            SolicitarTurno();
          }}
        >
          <Text style={styles.textBtnTurno}>Solicitar Turno</Text>
        </Pressable>
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
      </View>
    </Provider>
  );
};

export default TurnoLibre;
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
  calendarPicker: {
    borderTopColor: "blue",
    borderBottomColor: "blue",
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
  verTurno: {
    color: "#0853b5",
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  verTurnoCont: {
    borderColor: "#0853b5",
    borderWidth: 2,
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10,
  },
});
