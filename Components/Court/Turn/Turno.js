import React from "react";
import {
  Text,
  FlatList,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Pressable,
} from "react-native";
import { styles } from "../../css/CssMyTurno";
  //Manejador del spin de carga
 export const Carga = ({refresh,reservationLibre,reservationFijo,cargando,listEmpty,listEmptyTwo,gatillo,navigationn})=>{
    const Turno = ({ item }) => {
    
        return (
          <>
            <View style={styles.card}>
              <View style={styles.contTurno}>
                <Text style={[styles.titulo, styles.horario]}>
                  Fecha: {item.schedule.slice(0, 10)}
                </Text>
                <Text style={[styles.titulo, styles.horario]}>
                  Inicio del turno: {item.schedule.slice(11, 13)} :{" "}
                  {item.schedule.slice(14, 16)} hs
                </Text>
                <Pressable onPress={() => navigationn.navigate("ViewTurn", item)}>
                  <Text style={styles.viewTurno}>Ver Turno</Text>
                </Pressable>
              </View>
            </View>
          </>
        );
      };
    
  return(
     gatillo == 1 ? (
      cargando ? (
        <View>
          <ActivityIndicator size="large" color="#1258B1" />
        </View>
      ) : listEmpty ? (
        <View style={styles.containerTF}>
          <FlatList
            data={reservationLibre}
            keyExtractor={(item) => item.id}
            enableEmptySections={true}
            renderItem={Turno}
            refreshControl={
              <RefreshControl refreshing={cargando} onRefresh={refresh} />
            }
          />
        </View>
      ) : (
        <View style={styles.mssgContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={cargando} onRefresh={refresh} />
            }
          >
            <Text style={styles.mssg}>No se encuentra ningún turno Libre</Text>
          </ScrollView>
        </View>
      )
    ) : cargando ? (
      <View>
        <ActivityIndicator size="large" color="#1258B1" />
      </View>
    ) : listEmptyTwo ? (
      <View>
        <FlatList
          data={reservationFijo} // Cambiar por array donde se guarden los turnos fijos
          keyExtractor={(item) => item.id}
          enableEmptySections={true}
          renderItem={Turno}
          refreshControl={
            <RefreshControl refreshing={cargando} onRefresh={refresh} />
          }
        />
      </View>
    ) : (
      <View style={styles.mssgContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={cargando} onRefresh={refresh} />
          }
        >
          <Text style={styles.mssg}>No se encuentra ningún turno Fijo</Text>
        </ScrollView>
      </View>
    )
  )
  }
  
   
