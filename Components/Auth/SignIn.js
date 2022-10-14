import React from "react";
import { Text, Modal, View, ScrollView, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../css/CssSignIn";
import FormSignIn from "./FormSignIn";
const SignIn = ({ visbRegister, setVisbRegister }) => {
  //BODY PRINCIPAL
  return (
    <Modal visible={visbRegister}>
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
          />
        </ScrollView>
      </View>
    </Modal>
  );
};
export default SignIn;
