import React, { useEffect, useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


//notificacion
const NotificacionesStack = () => {
  //Hooks
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    guardarSwitch(isEnabled);
  }, [isEnabled]);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    
  };
  const guardarSwitch = async (data) => {
    try {
      await AsyncStorage.setItem("switch", JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };

  // Notificacion
 
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
    backgroundColor: "#fff",
  },
  question: {
    textAlign: "center",
    fontWeight: "900",
    fontSize: 20,
    marginTop: 25,
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
    paddingVertical: 22,
  },
  messageContainer: {
    borderBottomColor: "blue",
    borderBottomWidth: 2,
    borderTopColor: "blue",
    borderTopWidth: 2,
    paddingBottom: 20,
  },
});
