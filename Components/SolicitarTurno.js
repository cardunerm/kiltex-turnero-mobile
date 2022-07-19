import React, { useState } from "react";
import {
  Text,
  Modal,
  Image,
  View,
  TextInput,
  Button,
  Buttom,
  Alert,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";

const SolicitarTurno = ({solTurno,setSolTurno,detCourts}) => {
  //Hooks
  const [fecha, setFecha] = useState();
  const [tiempo, setTiempo] = useState();
  

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fecha: "",
      telefono: "",
    },
  });
  const cancha=detCourts.name
  const Turno = {
    cancha,
    fecha,
    tiempo
    
  }

  return (
    < >
    <ScrollView>
      <View style={!solTurno ? styles.container2 : styles.container} >
        <View style={styles.form}>
          <Text style={styles.label}>Fecha</Text>
          <Picker
            style={styles.pickerItem}
            selectedValue={fecha}
            onValueChange={(fecha) => setFecha(fecha)}
          >
            <Picker.Item
              style={styles.pickerItem}
              label="- Seleccionar -"
              value=""
            />
            <Picker.Item  label="Fecha1" value="Fecha1" />
            <Picker.Item  label="Fecha2" value="Fecha2" />
            <Picker.Item  label="Fecha3" value="Fecha3" />
            <Picker.Item  label="Fecha4" value="Fecha4" />
            <Picker.Item  label="Fecha5" value="Fecha5" />
          </Picker>
          <Text style={styles.label}>Tiempo</Text>
          <Picker
            style={styles.pickerItem}
            selectedValue={tiempo}
            onValueChange={(tiempo) => setTiempo(tiempo)}
          >
            <Picker.Item
              style={styles.pickerItem}
              label="- Seleccionar -"
              value=""
            />
            <Picker.Item  label="30 mn" value="0.30" />
            <Picker.Item  label="1 h" value="1" />
            <Picker.Item
              label="1:30 hs"
              value="1.30"
            />
            <Picker.Item  label="2 hs" value="2" />
            <Picker.Item
              label="2:30 hs"
              value="2.30"
            />
          </Picker>
        </View>
        <Pressable 
        style={styles.btnTurno}
        onPress={()=>{
          setSolTurno(!solTurno)
          console.log('Se solicito el turno: Cancha: '+ Turno.cancha+', Fecha: '+Turno.fecha+', Tiempo: '+Turno.tiempo)
          //En esta parte se enviaria el turno a la Api
          
        }}
        >
          <Text style={styles.textBtnTurno}>Solicitar Turno</Text>
        </Pressable>
      </View>
    </ScrollView>
      
    </>
  );
};

export default SolicitarTurno;
const styles = StyleSheet.create({
  container2:{
  display:"none",
  },
  container: {
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    borderColor: "blue",
    borderWidth: 1,
  },
  form: {
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    paddingVertical: 20,
  },
  btnTurno: {
    backgroundColor: "blue",
    marginTop: 30,
    paddingVertical: 10,
    borderBottomLeftRadius:18,
    borderBottomRightRadius:18,
  },
  textBtnTurno: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    textTransform: "uppercase",
  },
});
