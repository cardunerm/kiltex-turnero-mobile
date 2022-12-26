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
import { Schedule } from "./Schedule";
import { TiposTurnos } from "./TiposTurno";
import {ServCalendarioTurno} from "../../../Service/ServCalendarioTurno"

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const TurnoLibre = ({ route }) => {
  const{ id , name}= route.params;
  const navigation = useNavigation();
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
  const [fecha, setFecha] = useState(null);
  const [turno, setTurno] = useState(null);
  const [cancha, setCancha] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [carga, setCarga] = useState(false);
  const [horario, setHorario] = useState();
 
  useEffect(() => {
    setCancha(id);
  }, [id]);
 
  const SolicitarTurno = () => {
    //body del turno
    const Cuerpo ={
      nameCancha:name,
      fecha:horario,
    } 
    const Turno ={
      courtId:cancha ,
      turnId:tiempo ,
      paymentMethodId: 1
    } 
    if (fecha == undefined || tiempo == "") {
      alert("No se pudo solicitar turno", "Debe seleccionar fecha y hora");
      return;
    } else {
      setCarga(true);
     // TurnoLibreApi(Turno, setVisible, setCarga,tiempo);
    
      navigation.navigate("payment",Cuerpo);
      setCarga(false)
    }
  };

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
  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.form}>
          <SectionList
            sections={[...Fecha, ...Turno, ...BtnSolicitar]}
            renderItem={({ item }) =>
              item.task == "Fecha" ? (
                <View>
                  <Calendario setFecha={setFecha} id={id}/>
                </View>
              ) : item.task == "Turno" ? (
                fecha != undefined ? (
                  <View>
                    <Schedule tiempo={tiempo} setTiempo={setTiempo} fecha={fecha} setHorario={setHorario} horario={horario}/></View>
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
                  <Boton SolicitarTurno={SolicitarTurno} carga={carga}  />
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

        <TiposTurnos  visible={visible} setVisible={setVisible} />
      </View>
    </Provider>
  );
};

export default TurnoLibre;
