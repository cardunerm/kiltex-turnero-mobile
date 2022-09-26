import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../Components/css/CssMyTurno";
import { turnosApi } from "../Service/ServMyTurno";
import { Carga } from "../Components/Court/Turn/Turno";

const MyTurno = ({ navigation }) => {
  const navigationn = useNavigation();
  //HOOKS
  const [reservationLibre, setReservationLibre] = useState([]);
  const [reservationFijo, setReservationFijo] = useState([]);

  const [cargando, setCargando] = useState(true); //setCarga - Lugar donde se guardara el manejador del spin
  const [listEmpty, setlistEmpty] = useState(true);
  const [listEmptyTwo, setlistEmptyTwo] = useState(false);

  const [gatillo, setGatillo] = useState(1);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      turnosApi(setReservationLibre,setCargando,setlistEmpty)
    });

    return unsubscribe;
  }, [navigation]);
  const refresh =() =>{
    turnosApi(setReservationLibre,setCargando,setlistEmpty)
  }
  return (
    <>
      <View style={styles.containerBot}>
        <Pressable
          onPress={() => setGatillo(1)}
          style={gatillo == 1 ? styles.botonLib2 : styles.botonLib}
        >
          <Text
            style={gatillo == 1 ? styles.botonLibText2 : styles.botonLibText}
          >
            Libres
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setGatillo(2)}
          style={gatillo == 2 ? styles.botonLib2 : styles.botonLib}
        >
          <Text
            style={gatillo == 2 ? styles.botonLibText2 : styles.botonLibText}
          >
            Fijos
          </Text>
        </Pressable>
      </View>
      <Carga
      refresh={refresh}
      reservationLibre={reservationLibre}
      reservationFijo={reservationFijo}
      cargando={cargando}
      listEmpty={listEmpty}
      listEmptyTwo={listEmptyTwo}
      gatillo={gatillo}
      navigationn={navigationn}
      />
      <Button
        onPress={() => navigationn.navigate("Historial")}
        icon="history"
        mode="outlined"
        color="blue"
        style={styles.btnHistorial}
      >
        My Historial
      </Button>
    </>
  );
};

export default MyTurno;
