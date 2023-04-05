import React, { useEffect, useState} from "react";
import { Text, Image, View, ScrollView,SafeAreaView , BackHandler} from "react-native";
import SignIn from "./SignIn";
import { useNavigation } from "@react-navigation/native";
import RecoverPassword from "./RecoverPassword";
import FormLogin from "./FormLogin";
import { styles } from "../css/CssLogin";
const Login = ({ navigation }) => {
  //Bloquea la accion de volver atras
  const [text, setText] = React.useState('');
  const hasUnsavedChanges = Boolean(text);
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        BackHandler.exitApp();
      }),
    [navigation, hasUnsavedChanges]
  );


  const navigationn = useNavigation();
  //HOOKS
  const [visbRegister, setVisbRegister] = useState(false);
  const [visbRecuperarPass, setVisbRecuperarPass] = useState(false);
  const [token, setToken] = useState();
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    if (token != null) {
      navigationn.navigate("Court");
      setToken(null);
      setCargando(false);
      return;
    }
  }, [token]);
  //BODY PRINCIPAL
  return (
    <>
    {(Platform.OS === "android")?(<View></View>):(<SafeAreaView></SafeAreaView>)}
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.banner}>
            <Image
              style={styles.imgBanner}
              source={require("../../assets/LogoPadelPrueba.jpg")}
            />
          </View>
          <View style={styles.form}>
            <FormLogin
              setToken={setToken}
              cargando={cargando}
              setCargando={setCargando}
            />

            <Text style={styles.textRegister}>
              ¿No posee una cuenta?{" "}
              <Text
                style={styles.textRegister2}
                onPress={() => {
                  setVisbRegister(!visbRegister);
                }}
              >
                Registrarse
              </Text>
            </Text>
            <Text
              style={styles.textOlvContraseña}
              onPress={() => {
                setVisbRecuperarPass(!visbRecuperarPass);
              }}
            >
              ¿Olvidaste tu contraseña?
            </Text>
          </View>
        </ScrollView>
      </View>
      <SignIn visbRegister={visbRegister} setVisbRegister={setVisbRegister} />
      <RecoverPassword
        visbRecuperarPass={visbRecuperarPass}
        setVisbRecuperarPass={setVisbRecuperarPass}
      />
    </>
  );
};

export default Login;
