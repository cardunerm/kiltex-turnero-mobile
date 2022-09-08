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

const FAQsStack = ({ navigation }) => {
  const navigationn = useNavigation();
  //HOOKS
  const [question, setQuestion] = useState([]); //setRes - Lugar donde se guardara la respuesta
  const [cargando, setCargando] = useState(true); //setCarga - Lugar donde se guardara el manejador del spin

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      callApiGet();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    callApiGet(); //Peticion
  }, []);
  //LLAMADO A LA API - PREGUNTAS FRECUENTES
  const filter = {
    filter: " ",
    page: 0,
    pageSize: 10,
  }; //Body

  const callApiGet = async () => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(tokenn);
    } catch (error) {
      console.log(error);
    }
  };
  const get = (token) => {
    const url = environment.api.url + "/api/v1/client/FAQ/list"; //Url
    axios({
      method: "post",
      url: url,
      data: filter,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        setQuestion(response.data.data);
        setCargando(false);
        console.log("funciona");
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };

  //BODY DE LA PREGUNTA
  const ques = ({ item }) => {
    return (
      <>
        <Pressable
          onPress={() =>
            navigationn.navigate("answer", {
              answer: item.answer,
              question: item.question,
            })
          }
          style={styles.questionContainer}
        >
          <Text style={styles.question}>{item.title}</Text>
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

  //BODY GENERAL
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
    borderBottomWidth: 1.5,
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
