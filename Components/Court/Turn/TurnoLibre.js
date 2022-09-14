import React, { useEffect, useState,useRef  } from "react";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  SectionList,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import CalendarPicker from "react-native-calendar-picker";
import { environment } from "../../../env/env.develop";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Dialog, Portal, Provider } from "react-native-paper";
import { FlatGrid } from "react-native-super-grid";
import { MaterialCommunityIcons } from "@expo/vector-icons";


import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const TurnoLibre = ({ route }) => {
  const id = route.params;
//Se Probaron las notificaciones, La notificacion se envia una ves llega la respuesta de que el turno se ha solicitado correctamente
  /*const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
// Accion encargada de enviar la notificacion
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  async function schedulePushNotification() {
    
    await Notifications.scheduleNotificationAsync({
      content: {
          
        title: "Turno Padel",
        body: 'Queda 1h para su turno !!!',
        
      },
      trigger: { seconds: 2 },
    });
  }

*/
  //HOOKS
  const [fecha, setFecha] = useState();
  const [cancha, setCancha] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [carga, setCarga] = useState(false);
  useEffect(() => {
    setCancha(id);
  }, [id]);
  //PPETICION A LA API -TUENO LIBRE
  const getDataStorage = async (data) => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(data, tokenn);
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
        setCarga(false);
        schedulePushNotification()
      })
      .catch((e) => {
        console.log("ERR" + e);
        setCarga(false);
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
    //dialogo emergente
    setVisible(false);
    navigation.navigate("Courts");
    navigation.navigate("Turno");
  };
  const navigation = useNavigation();
  //Función que realiza la reserva
  const SolicitarTurno = () => {
    //body del turno
    const Turno = {
      courtId: cancha,
      scheduleId: tiempo,
      paymentMethodId: 1,
    };
    if (fecha == undefined || tiempo == "") {
      alertNoTurno();
      return;
    } else {
      setCarga(true);
      getDataStorage(Turno);
      //navigation.navigate("payment");
      
    }
  };
  //Mensajes de error
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

  /*
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
            </Picker>)}
  */
  //Body de horarios de turno
  const turnoDisponible = ({ item }) => {
    return (
      <>
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
      </>
    );
  };

  //body del calendario
  const calendario = (
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

  //body del boton
  const Boton = (
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
  );

  const flatGrid = (
    <>
      <Text style={styles.label}>Turnos Disponibles</Text>
      <FlatGrid
        itemDimension={60}
        data={turnos}
        spacing={15}
        keyExtractor={(item) => item.id}
        renderItem={turnoDisponible}
      />
    </>
  );
  const Fecha = [
    {
      title: "si",
      data: [
        {
          id: "1",
          task: "Fecha",
        },
      ],
    },
  ];
  const Turno = [
    {
      title: "",
      data: [
        {
          id: "6",
          task: "Turno",
        },
      ],
    },
  ];
  const BtnSolicitar = [
    {
      title: "",
      data: [
        {
          id: "6",
          task: "BtnSolicitar",
        },
      ],
    },
  ];
  //BODY PRINCIPAL
  console.log(tiempo);
  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.form}>
          <SectionList
            sections={[...Fecha, ...Turno, ...BtnSolicitar]}
            renderItem={({ item }) =>
              item.task == "Fecha" ? (
                <View>{calendario}</View>
              ) : item.task == "Turno" ? (
                fecha != undefined ? (
                  <View>{flatGrid}</View>
                ) : (
                  <View style={styles.containInfo}>
                    <Text>
                      <MaterialCommunityIcons
                        name="information"
                        size={17}
                        color="black"
                      />{" "}
                      Se debe seleccionar una fecha para visualizar los turnos
                      disponibles
                    </Text>
                  </View>
                )
              ) : tiempo != "" ? (
                <View>{Boton}</View>
              ) : (
                <View>
                  <Pressable style={styles.btnTurno2}>
                    <Text style={styles.textBtnTurno2}>Solicitar Turno </Text>
                  </Pressable>
                </View>
              )
            }
            keyExtractor={(item) => item.id}
            stickySectionHeadersEnabled
          />
        </View>

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
    marginHorizontal: 10,
    marginBottom: 20,
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
    backgroundColor: "#103a70",
    marginTop: 10,
    paddingVertical: 10,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  btnTurno2:{
    backgroundColor: "#b3b3b3",
    marginTop: 10,
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
  textBtnTurno2:{
    textAlign: "center",
    color: "#d9d9d9",
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
  horario: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  horarioText: {
    textAlign: "center",
    paddingVertical: 10,
  },
  horarioSelect: {
    backgroundColor: "#103a70",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  horarioTextSelect: {
    textAlign: "center",
    paddingVertical: 10,
    color: "#fff",
  },
  containInfo: {
    borderColor: "#12407ca6",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderStyle: "dashed",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 40,
  },
});
