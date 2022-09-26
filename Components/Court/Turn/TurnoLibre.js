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

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

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
  //MANEJO DEL FORMULARIO
 
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
      alert("No se pudo solicitar turno", "Debe seleccionar fecha y hora");
      return;
    } else {
      setCarga(true);
      TurnoLibreApi(Turno, setVisible, setCarga);
      //navigation.navigate("payment");
    }
  };
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
                <View>
                  <Calendario setFecha={setFecha} />
                </View>
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
                <View>
                  <Boton SolicitarTurno={SolicitarTurno} carga={carga} />
                </View>
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
