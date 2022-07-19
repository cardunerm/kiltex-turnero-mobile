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
const PasswordStack = ({ route }) => {
  const navigation = useNavigation();
  const { user, password } = route.params;
  // Hooks
  const [pass, setPass] = useState("");
  const [passNew1, setPassNew1] = useState("");
  const [passNew2, setPassNew2] = useState("");
  const [val, setVal] = useState(false);
  const [val2, setVal2] = useState(true);
  //Metodo


  const checkPassword = () => {
    if (password === pass) {
      setVal(true);
      return;
    }
    setVal2(false)
  };
  const samePassword = () => {
    if (passNew1 !== passNew2) {
      let mensaje1="Contraseñas distintas";
      let mensaje2="Las contraseñas no coinciden"
      alertNoSamePass(mensaje1,mensaje2);
      return;
    }

    const userNew = {
      user:user,
      password:passNew1
    }
    alertRedirect ()
    
  };
  const alertNoSamePass = (mensaje1,mensaje2) => {
    Alert.alert(mensaje1, mensaje2, [
      { text: "OK" },
    ]);
  };
  const alertRedirect = () => {
    Alert.alert("¿Esta seguro de cambiar la contraseña?", "Luego de cambiar la contraseña se cerrara sesion", [
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
          <Text style={styles.textInput}>Ingrese su contraseña actual</Text>
          <TextInput
            style={val2 ?styles.input : styles.inputErr}
            placeholder="Contraseña"
            placeholderTextColor={"#B0B0B0"}
            value={pass}
            onChangeText={setPass}
            secureTextEntry={true}
            keyboardType='numeric'
          />
        <Text style={styles.msjErr}>{!val2 ? 'La contraseña no es correcta' : ''}</Text>
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
          <Text style={styles.textInput}>Ingrese la nueva contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor={"#B0B0B0"}
            value={passNew1}
            onChangeText={setPassNew1}
            secureTextEntry={true}
            keyboardType='numeric'
          />
          <Text style={styles.textInput}>Ingrese la nueva contraseña</Text>
          <TextInput
            style={[styles.input,styles.input3]}
            placeholder="Contraseña"
            placeholderTextColor={"#B0B0B0"}
            value={passNew2}
            onChangeText={setPassNew2}
            secureTextEntry={true}
            keyboardType='numeric'
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
};

export default PasswordStack;
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
