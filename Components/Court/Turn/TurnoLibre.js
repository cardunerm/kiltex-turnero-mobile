import React, { useEffect, useState} from "react";
import {
  Text,
  View,
  Pressable,
  SectionList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Provider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../css/CssTurnoLibre";
import { alert } from "../../Alert";
import { TurnoLibreApi } from "../../../Service/ServSolicitarTurno";
import { Calendario } from "./CalendarioTurno";
import { Boton } from "./CalendarioTurno";
import { Schedule } from "./Schedule";
import { TiposTurnos } from "./TiposTurno";

const TurnoLibre = ({ route,navigation }) => {
  const{ id , court}= route.params;
  const navigationn = useNavigation();
  //HOOKS
  const [fecha, setFecha] = useState(null);
  const [cancha, setCancha] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [carga, setCarga] = useState(false);
  const [horario, setHorario] = useState();
  const [recarga, setRecarga] = useState(true);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setCancha(id);
    });
    return unsubscribe;
  }, [navigation]);
 
  const SolicitarTurno = (data) => {
    
    //body del turno
    const Cuerpo ={
      nameCancha:court.name,
      fecha:horario,
    } 
    const Turno ={
      courtId:cancha ,
      turnId:tiempo ,
      paymentMethodId: 1
    } 
    if (fecha == undefined || tiempo == "") {
      alert("No se pudo solicitar turno", "Debe seleccionar fecha y hora");
      return;
    } else {
      setCarga(true);
     TurnoLibreApi(Turno, setVisible, setCarga,tiempo);
      navigationn.navigate("payment",Cuerpo);
      setCarga(false)
    }
    if(data == true){
      setFecha()
      setRecarga(false)
    }
  };
  const Fecha = [
    {
      title: "si",
      data: [
        {
          id: "1",
          task: "Fecha",
        },
      ],
    },
  ];
  const Turno = [
    {
      title: "",
      data: [
        {
          id: "6",
          task: "Turno",
        },
      ],
    },
  ];
  const BtnSolicitar = [
    {
      title: "",
      data: [
        {
          id: "6",
          task: "BtnSolicitar",
        },
      ],
    },
  ];
  //BODY PRINCIPAL
  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.form}>
          <SectionList
            sections={[...Fecha, ...Turno, ...BtnSolicitar]}
            renderItem={({ item }) =>
              item.task == "Fecha" ? (
                <View>
                  <Calendario setFecha={setFecha} id={id}/>
                </View>
              ) : item.task == "Turno" ? (
                fecha != undefined ? (
                  <View>
                    <Schedule tiempo={tiempo} setTiempo={setTiempo} fecha={fecha} setHorario={setHorario} horario={horario}/></View>
                ) : (recarga ? (
                  <View style={styles.containInfo}>
                    <Text>
                      <MaterialCommunityIcons
                        name="information"
                        size={17}
                        color="black"
                      />{" "}
                      Se debe seleccionar una fecha para visualizar los turnos
                      disponibles
                    </Text>
                  </View>
                ) : (<View style={styles.containInfo}>
                  <Text>
                    <MaterialCommunityIcons
                      name="information"
                      size={17}
                      color="black"
                    />{" "}
                    Seleccione una fecha nuevamente
                  </Text>
                </View>))
              ) : tiempo != "" ? (
                <View>
                  <Boton SolicitarTurno={SolicitarTurno} carga={carga}  />
                </View>
              ) : (
                <View>
                  <Pressable style={styles.btnTurno2}>
                    <Text style={styles.textBtnTurno2}>Solicitar Turno </Text>
                  </Pressable>
                </View>
              )
            }
            keyExtractor={(item) => item.id}
            stickySectionHeadersEnabled
          />
        </View>
        <TiposTurnos  visible={visible} setVisible={setVisible} />
      </View>
    </Provider>
  );
};

export default TurnoLibre;
