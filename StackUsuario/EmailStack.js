import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../Components/css/CssEmailStack";

const EmailStack = () => {
  //IMPORTANTE
  //VER SI ESTE COMPONENTE SE VA A UTILIZAR
  const navigation = useNavigation();
  // Hooks
  const [email, setEmail] = useState("");
  const [emailNew1, setEmailNew1] = useState("");
  const [emailNew2, setEmailNew2] = useState("");
  const [val, setVal] = useState(false);
  const [val2, setVal2] = useState(true);
  //Metodo


  const checkPassword = () => {
    if (user === email) {
      setVal(true);
      return;
    }
    setVal2(false)
  };
  const samePassword = () => {
    if (emailNew1 !== emailNew2) {
      let mensaje1="Correos distintos";
      let mensaje2="Los correos deben coincidir"
      alertNoSamePass(mensaje1,mensaje2);
      return;
    }

    const userNew = {
      user:emailNew1,
      password:password
    }
    alertRedirect ()
    
  };
  const alertNoSamePass = (mensaje1,mensaje2) => {
    Alert.alert(mensaje1, mensaje2, [
      { text: "OK" },
    ]);
  };
  const alertRedirect = (mensaje,mensaje2) => {
    Alert.alert("¿Esta seguro de cambiar el correo?", "Luego de cambiar el correo se cerrara sesion", [
      {text:'Cancelar'},
      {text:'Si,Cambiar', onPress:() => {
        //Se realizaria la peticion a la api con la nueva contraseña
        navigation.navigate("login")
      }}
    ]);
  };
  return !val ? (
    <>
      <ScrollView>
        <View style={styles.contInput}>
          <Text style={styles.textInput}>Ingrese su correo actual</Text>
          <TextInput
            style={val2 ?styles.input : styles.inputErr}
            placeholder="E-mail"
            placeholderTextColor={"#B0B0B0"}
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
          />
        <Text style={styles.msjErr}>{!val2 ? 'El correo no es correcto' : ''}</Text>
          <Pressable
            style={styles.btnEnviarContainer}
            onPress={() => {
              checkPassword();
            }}
          >
            <Text style={styles.btnEnviar}>Enviar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  ) : (
    <>
      <ScrollView>
        <View style={styles.contInput}>
          <Text style={styles.textInput}>Ingrese el nuevo correo</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor={"#B0B0B0"}
            value={emailNew1}
            onChangeText={setEmailNew1}
            keyboardType='email-address'
          />
          <Text style={styles.textInput}>Ingrese el nuevo correo</Text>
          <TextInput
            style={[styles.input,styles.input3]}
            placeholder="E-mail"
            placeholderTextColor={"#B0B0B0"}
            value={emailNew2}
            onChangeText={setEmailNew2}
            keyboardType='email-address'
          />
          <Pressable
            style={styles.btnEnviarContainer}
            onPress={() => {
              samePassword();
            }}
          >
            <Text style={styles.btnEnviar}>Enviar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

export default EmailStack

