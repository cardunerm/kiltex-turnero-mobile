import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image,Pressable } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { environment } from "../env/env.develop";
const Court = ({ item }) => {
  const { name, description, id, sport } = item;
  const navigation = useNavigation();
  //Hooks

  const [courts, setCourts] = useState([]);
  return (
    <>
      <Pressable
        
        onPress={() => navigation.navigate("Details",id)}
      >

        <View style={styles.card}>
          <Text style={styles.titulo}>{name}</Text>

          <View style={styles.contImg}>
            <Image
              style={styles.img}
              source={require("../assets/court1.jpg")}
            />
          </View>
          <View>
            <Text style={styles.titulo}>{sport}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default Court;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 20,
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
  },
  img: {
    width: 350,
    height: 300,
  },
});
