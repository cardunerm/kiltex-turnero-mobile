import React,{useState} from "react";
import { ScrollView, Text, View, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Login from "../Login/Login";
import { useNavigation } from "@react-navigation/native";

const Perfil = () => {
  const navigation = useNavigation();
  const [logout,setLogout ]=useState();
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Text>Perfil</Text>
          <Pressable style={styles.logout}
           onPress={() => navigation.navigate("login")}
          >
            <MaterialCommunityIcons name="logout" size={34} color="black" />
          </Pressable>
        </ScrollView>
      </View>
      
    </>
  );
};

export default Perfil;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 2,
  },
  logout: {
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 10,
    borderRadius: 50,
    paddingVertical: 10,
    width: 60,
  },
});
