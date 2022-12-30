import React from "react";
import { Text, View, Pressable} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { styles } from "../../css/CssTurnoLibre";

export const Schedule = ({ tiempo, setTiempo,fecha,setHorario,horario}) => {
    const turnos = fecha
  return (
    <>
    {turnos[0] == undefined ? (<View style={styles.containInfo}><Text style={styles.mnsjHorarioNoDisp}>No se encuentran turnos disponibles en esa fecha</Text></View>):(<View>
            <Text style={styles.label}>Turnos Disponibles</Text>
      <FlatGrid
        itemDimension={70}
        data={turnos}
        spacing={15}
        keyExtractor={(item) => item.id}
        renderItem={({item}) =>{return(<>
            <Pressable
              style={tiempo == item.id ? styles.horarioSelect : styles.horario}
              onPress={() => {
                setTiempo(item.id);
                setHorario(item.startTime)
              }}
            >
              <Text
                style={
                  tiempo == item.id ? styles.horarioTextSelect : styles.horarioText
                }
              >
                {item.startTime.slice(10,16)} hs
              </Text>
            </Pressable>
          </>)}}
      />
    </View>)
}
    </>
  );
};
