import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, StyleSheet, FlatList } from "react-native";
import { environment } from "../env/env.develop";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAQsStack = () => {

  

useEffect(() => {
  get();
  obtenerDatos();
}, []);
const [token, setToken] = useState();
  

  const obtenerDatos = async () => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const us = JSON.parse(usuario);
      setToken(usuario);
    } catch (error) {
      console.log(error);
    }
  };
  //Peticion Api
  const filter = {
    filter: {token},
    page: 0,
    pageSize: 10
  }

/*
  const get = async () => {
    setStatus('loading');
    const url = environment.api.url + "/api/v1/client/FAQ/list";
      await axiosContext.authAxios.post(url, filter)
      .then((response) => {
        //setQuest(response.data.data);
        console.log(response)
      })
      .catch((e) => {
        console.log(e);
      });
  };



  const get = () => {
    const url = environment.api.url + "/api/v1/client/FAQ/list";
    axios
      .post(url, filter)
      .then((response) => {
        //setQuest(response.data.data);
        console.log(response)
      })
      .catch((e) => {
        console.log(e);
      });
  };*/
  const ques = ({item}) => {
    return (
      <>
        <View>
          <Text style={styles.question}>¿Pregunta?</Text>
          <Text style={styles.response}>Respuesta</Text>
        </View>
      </>
    );
  };
  const [quest, setQuest] = useState([]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer} >
          <Text style={styles.title}>Preguntas Frecuentes</Text>
        </View>
        <View>
          <FlatList
            data={quest}
            keyExtractor={(item) => item.id}
            renderItem={ques}
          />
        </View>
      </View>
    </>
  );
};

export default FAQsStack;
const styles = StyleSheet.create({
  container: {
    borderColor: "blue",
    borderWidth: 2,
    borderRadius:20,
  },
  titleContainer:{
    marginVertical:20,
  },
  title:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'600',
    paddingBottom:10,    
  },
  question:{
    textAlign:'center',
    fontSize:22,
    fontWeight:'400',
    paddingBottom:10,
  },
  response:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'300',
    paddingVertical:20,
  },
});
