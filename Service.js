import React from 'react'
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Pressable,
  } from "react-native";
import { environment } from './env/env.develop';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

  export default async function  callApiGet(body,url,setRes,setCarga){
  try {
    const usuario = await AsyncStorage.getItem("token");
    const tokenn = JSON.parse(usuario);
    get(body,url,setRes,setCarga,tokenn)
  } catch (error) {
    console.log(error);
  }
};
const get = async (body,url,setRes,setCarga,token) => {
    await axios({
      method: "post",
      url: url,
      data: body,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        setRes(response.data.data);
        setCarga(false);
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };

 


 
