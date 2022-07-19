import React, { useEffect, useState,useRef} from "react";
import { View, Text, Switch, StyleSheet, Pressable, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

//notificacion
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

const NotificacionesStack = () => {
  //Hooks
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
   guardarSwitch(isEnabled)
  }, [isEnabled]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)
    console.log(isEnabled)
    
   
  };
  const guardarSwitch = async (data) => {
    try {
      await  AsyncStorage.setItem('switch', JSON.stringify(data))
    } catch (e) {
      console.log(e)
    }
  } 

  // Notificacion
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
console.log(expoPushToken)
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
    console.log(token);
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


  return (
    <>
      <View style={styles.container}>
        <Text style={styles.question}>¿Desea recibir notificaciones?</Text>
        <View>
          <Text style={styles.questionSwitch}>{isEnabled ? "Si" : "No"}</Text>
          <View style={styles.swit}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "blue" : "red"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            />
          </View>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            Se le enviaran notificaciones 1 hora antes del horario de su turno
            como recordatorio
          </Text>
        </View>
      </View>
    </>
  );
};

export default NotificacionesStack;
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor:'#fff'
  },
  question: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 20,
    marginTop:25,
  },
  questionSwitch: {
    fontSize: 25,
    fontWeight: "600",
    marginLeft: 150,
    marginRight: 40,
    marginVertical: 50,
  },
  swit: {
    position: "absolute",
    left: 220,
    paddingBottom: 80,
    marginTop: 50,
  },
  message: {
    fontSize: 17,
    fontWeight: "400",
    marginHorizontal: 20,
    paddingVertical:22,
  },
  messageContainer:{
    borderBottomColor:'blue',
    borderBottomWidth:2,
    borderTopColor:'blue',
    borderTopWidth:2,
    paddingBottom:20,
  },
});
