import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { environment } from "../../env/env.develop";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheet, Button, ListItem } from "@rneui/themed";

const DetailsCourts = ({ route }) => {
  const navigation = useNavigation();
  const id = route.params;
  //Hooks
  const [detCourts, setDetCourts] = useState({});
  const [solTurno, setSolTurno] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getDataStorage();
  }, []);
  // PETICION A LA API - DETALLES DE LA CANCHA
  const url =
    environment.api.url + "/api/v1/client/Court/get_court_detail?id=" + id;

  const getDataStorage = async () => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(tokenn);
    } catch (error) {
      console.log(error);
    }
  };

  const get = async (token) => {
    await axios
      .get(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setDetCourts(response.data);
        setCargando(false);
        console.log(response.data);
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };
  //ACCIONES
  const [isVisible, setIsVisible] = useState(false);

  //Sub menu de turno fijo / turno libre
  const list = [
    {
      title: "Turno Libre",
      containerStyle: { borderColor: "#0853b5", borderWidth: 2, marginTop: 50 },
      titleStyle: { color: "#000", fontSize: 25 },
      onPress: () => {
        navigation.navigate("TurnoLibre", id), setIsVisible(false);
      },
    },
    {
      title: "Turno Fijo",
      containerStyle: {
        borderColor: "#0853b5",
        borderWidth: 2,
        marginTop: 20,
        marginBottom: 20,
      },
      titleStyle: { color: "#000", fontSize: 25, fontWeight: "600" },
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "#0853b5" },
      titleStyle: {
        color: "white",
        fontSize: 25,
        fontWeight: "600",
        textAlign: "center",
        paddingHorizontal: "36.76%",
      },
      onPress: () => setIsVisible(false),
    },
  ];
  //BODY PRINCIPAL
  return (
    <>
      <ScrollView style={styles.cuerpo}>
        <View>
          <View style={styles.card}>
            <Text style={styles.titulo}>{detCourts.name}</Text>
            <View style={styles.contImg}>
              <Image
                style={styles.img}
                source={require("../../assets/court1.jpg")}
              />
            </View>
            <View>
              <Text style={styles.contDescr}>{detCourts.description}</Text>
            </View>
          </View>
        </View>

        <SafeAreaProvider>
          <Button
            title="Solicitar Turno"
            onPress={() => setIsVisible(true)}
            buttonStyle={styles.btnAddTurno}
          />
          <BottomSheet modalProps={{}} isVisible={isVisible}>
            <View style={styles.cu}>
              {list.map((l, i) => (
                <ListItem
                  key={i}
                  containerStyle={l.containerStyle}
                  onPress={l.onPress}
                >
                  <ListItem.Content>
                    <ListItem.Title style={l.titleStyle}>
                      {l.title}
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
          </BottomSheet>
        </SafeAreaProvider>
      </ScrollView>
    </>
  );
};

export default DetailsCourts;
const styles = StyleSheet.create({
  textListTT: {
    textAlign: "center",
  },
  cu: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopColor: "#0853b5",
    borderRightColor: "#0853b5",
    borderLeftColor: "#0853b5",
    borderWidth: 3,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingBottom: 10,
    marginTop: 20,
    borderRadius: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  titulo: {
    textAlign: "center",
    marginVertical: 20,
  },
  contImg: {
    flexDirection: "row",
    justifyContent: "center",
    borderTopColor: "#d6d3d3ed",
    borderTopWidth: 1,
    borderBottomColor: "#d6d3d3ed",
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginHorizontal: 15,
  },
  img: {
    width: 350,
    height: 300,
  },
  contDescr: {
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  btnAddTurno: {
    backgroundColor: "#12407c",
    marginHorizontal: 20,
    marginTop: 40,
  },
  btnAddTurnoText: {
    color: "#fff",
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },

  contModalFic: {
    width: "100%",
    height: "100%",
    position: "absolute",
    marginVertical: 0,
  },
  conX: {
    backgroundColor: "#2b2b2d7d",
    height: "100%",
  },
  x: {
    textAlign: "center",

    marginTop: 150,
  },
  botnTurnos: {
    position: "absolute",
    backgroundColor: "#fff",
    height: 311,
    borderTopColor: "#0853b5",
    borderTopWidth: 4,
    borderLeftColor: "#0853b5",
    borderLeftWidth: 3,
    borderRightColor: "#0853b5",
    borderRightWidth: 3,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    bottom: 0,
    paddingTop: 30,
    width: "100%",
  },
  BTPress: {
    borderColor: "#0853b5",
    borderWidth: 2,
    marginTop: 25,
  },
  BTtext: {
    color: "#000",
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: "600",
  },
});
