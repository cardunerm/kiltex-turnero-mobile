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
import get from "../Service";

const FAQsStack = () => {
  const navigation = useNavigation();
  useEffect(() => {
    obtenerDatos();
  }, []);
  const [token, setToken] = useState();
  const [question, setQuestion] = useState();
  const [cargando, setCargando] = useState(true);

  const obtenerDatos = async () => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      setToken(tokenn);
      getFAQs(tokenn);
    } catch (error) {
      console.log(error);
    }
  };
  //Peticion Api
  const filter = {
    filter: " ",
    page: 0,
    pageSize: 10,
  };

  const getFAQs = async (data) => {
    const url = environment.api.url + "/api/v1/client/FAQ/list";
    await axios({
      method: "post",
      url: url,
      data: filter,
      headers: { Authorization: "Bearer " + data },
    })
      .then((response) => {
        setQuestion(response.data.data);
        setCargando(false);
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };

  const ques = ({ item }) => {
    
    return (
      <>
        <Pressable
          onPress={() => navigation.navigate("answer",{answer:item.answer,question:item.question})}
          style={styles.questionContainer}
        >
          <Text style={styles.question}>{item.question}</Text>
        </Pressable>
      </>
    );
  };

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
    marginVertical: 20,
  },
  questionContainer: {
    borderBottomColor: "#999",
    borderBottomWidth: 1,
    
  },
  question: {
    fontSize: 20,
    fontWeight: "300",
    marginLeft: 20,
    paddingVertical:20,
  },
  response: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "300",
    paddingVertical: 20,
  },
});
