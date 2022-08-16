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

const EmailStack = () => {
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
const styles = StyleSheet.create({
  contInput: {
    backgroundColor: "#0965a1",
    marginHorizontal: 20,
    marginTop: 80,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textInput: {
    color: "#fff",
    marginVertical: 10,
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#111",
    borderWidth: 1,
    height: 40,
    backgroundColor: "#eee",
    marginTop: 20,
    paddingHorizontal:10,
  },
  inputErr:{
    borderColor: "#111",
    borderWidth: 1,
    height: 40,
    backgroundColor: "#eee",
    marginTop: 20,
    paddingHorizontal:10,
    borderColor:'#8A0404',
    borderWidth:3,
  },
  input3:{
    marginBottom:30,
  },
  msjErr:{
    color:'#8A0404',
    fontWeight:'600',
    fontSize:15,
    textAlign:"center",
    marginBottom:20,
    marginTop:10,
  },
  btnEnviarContainer: {
    backgroundColor: "#0792E8",
    borderRadius: 5,
  },
  btnEnviar: {
    paddingVertical: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});
