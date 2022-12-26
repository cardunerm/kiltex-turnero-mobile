import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { styles } from "../css/CssDetailsCourts";
import { detailsCourtsApi } from "../../Service/ServDetailsCourt";
import BtnTurnFijoLibre from "./btnTurnFijoLibre";

const DetailsCourts = ({ route }) => {
  const {id} = route.params;
  //Hooks
  const [detCourts, setDetCourts] = useState({});
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
                source={{uri: detCourts.imageUrl}}
              />
            </View>
            <View>
              <Text style={styles.titulo}>{detCourts.name}</Text>
              <Text style={styles.contDescr}>{detCourts.description}</Text>
            </View>
          </View>
        </View>
        <BtnTurnFijoLibre id={id} params={route.params}/>
      </ScrollView>
    </>
  );
};

export default DetailsCourts;
