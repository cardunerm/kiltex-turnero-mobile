import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../css/CssDetailsCourts";
import { detailsCourtsApi } from "../../Service/ServDetailsCourt";
import BtnTurnFijoLibre from "./btnTurnFijoLibre";

const DetailsCourts = ({ route }) => {
  const navigation = useNavigation();
  const id = route.params;
  //Hooks
  const [detCourts, setDetCourts] = useState({});
  const [solTurno, setSolTurno] = useState(false);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    detailsCourtsApi(setDetCourts, setCargando, id);
  }, []);
  //BODY PRINCIPAL
  return (
    <>
      <ScrollView style={styles.cuerpo}>
        <View>
          <View style={styles.card}>
            <View style={styles.contImg}>
              <Image
                style={styles.img}
                source={require("../../assets/court1.jpg")}
              />
            </View>
            <View>
              <Text style={styles.titulo}>{detCourts.name}</Text>
              <Text style={styles.contDescr}>{detCourts.description}</Text>
            </View>
          </View>
        </View>
        <BtnTurnFijoLibre id={id} />
      </ScrollView>
    </>
  );
};

export default DetailsCourts;
