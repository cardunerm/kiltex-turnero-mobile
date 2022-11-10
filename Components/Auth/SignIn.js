import React, { useEffect, useState }  from "react";
import { Text, Modal, View, ScrollView, Pressable,SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../css/CssSignIn";
import FormSignIn from "./FormSignIn";
const SignIn = ({ visbRegister, setVisbRegister }) => {
  const [cargando, setCargando] = useState(false);
  //BODY PRINCIPAL
  return (
    <Modal visible={visbRegister} animationType="slide">
      {(Platform.OS === "android")?(<View></View>):(<SafeAreaView></SafeAreaView>)}
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.banner}>
            <Pressable
              style={styles.back}
              onPress={() => {
                setVisbRegister(!visbRegister);
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#fff"
                onPress={() => {
                  setVisbRegister(!visbRegister);
                }}
              />
            </Pressable>
            <Text style={styles.bannerText}>Registrarse</Text>
          </View>
          <FormSignIn
            visbRegister={visbRegister}
            setVisbRegister={setVisbRegister}
            cargando={cargando}
            setCargando={setCargando}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};
export default SignIn;
