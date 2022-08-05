import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { environment } from "../env/env.develop";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

//Service
import callApiGet from "../Service";

const FAQsStack = () => {
  const navigation = useNavigation();
  //Hooks
  const [token, setToken] = useState();
  const [question, setQuestion] = useState();//setRes - Lugar donde se guardara la respuesta
  const [cargando, setCargando] = useState(true);//setCarga - Lugar donde se guardara el manejador del spin

  //Peticion Api
  useEffect(() => {
    callApiGet(filter, url, setQuestion, setCargando);//Peticion
  }, []);
  const filter = {
    filter: " ",
    page: 0,
    pageSize: 10,
  };//Body
  const url = environment.api.url + "/api/v1/client/FAQ/list";//Url
//Cuerpo de la pregunta
  const ques = ({ item }) => {
    return (
      <>
        <Pressable
          onPress={() =>
            navigation.navigate("answer", {
              answer: item.answer,
              question: item.question,
            })
          }
          style={styles.questionContainer}
        >
          <Text style={styles.question}>{item.question}</Text>
        </Pressable>
      </>
    );
  };
//Manejador del spin de carga
  const carga = cargando ? (
    <View style={styles.carga}>
      <ActivityIndicator size="large" color="#1258B1" />
    </View>
  ) : (
    <FlatList
      data={question}
      keyExtractor={(item) => item.id}
      renderItem={ques}
    />
  );

  //Cuerpo del componente
  return (
    <>
      <View style={styles.container}>
        <View>{carga}</View>
      </View>
    </>
  );
};

export default FAQsStack;
const styles = StyleSheet.create({
  carga: {
    marginVertical: 50,
  },
  questionContainer: {
    borderBottomColor: "#999",
    borderBottomWidth: 1,
  },
  question: {
    fontSize: 20,
    fontWeight: "300",
    marginLeft: 20,
    paddingVertical: 20,
  },
  response: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "300",
    paddingVertical: 20,
  },
});
