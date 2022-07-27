import React, { useState } from "react";
import { Text, FlatList, View, StyleSheet, ScrollView } from "react-native";
import Turno from "../Components/Turno";

const MyTurno = () => {
  const turnos = [{ id: 1 }, { id: 2 }, { id: 3 }];

  // Salta un  error , se deberia arreglar una ves que se implementen peticiones a la api
  //con el llamado get de la lista de
  return (
    <>
        <FlatList
          data={turnos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <Turno item={item} />;
          }}
        />
    </>
  );
};

export default MyTurno;
const styles = StyleSheet.create({
  card: {
    paddingBottom: 30,
  },
});
