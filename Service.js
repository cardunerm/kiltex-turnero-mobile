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

const get = async (data) => {
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

  export default get
 
