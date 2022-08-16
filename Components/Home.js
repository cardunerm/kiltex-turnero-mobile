import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import Court from "../Components/Court";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { environment } from "../env/env.develop";
import { Searchbar } from "react-native-paper";

//Service
import callApiGet from "../Service";

const Home = () => {
  //Hooks

  const [courts, setCourts] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [courtsFilter, setCourtsFilter] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [refreshing, setRefreshing] = useState(true);

  /* useEffect(() => {
    callApiGet();
  }, []);
  const callApiGet = async () => {
    try {
      const usuario = await AsyncStorage.getItem("token");
      const tokenn = JSON.parse(usuario);
      get(tokenn);
    } catch (error) {
      console.log(error);
    }
  };

  const get = async (token) => {
    const url = environment.api.url + "/api/v1/client/Court/list_all_courts";
    await axios({
      method: "post",
      url: url,
      data: filter,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        setCourts(response.data.data);
        setCargando(false);
        console.log(response.data.data);
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };
  const filter = {
    filter: "",
    page: 0,
    pageSize: 10,
  }; //Body
*/
  const navigation = useNavigation();

  const Court = ({ item }) => {
    return (
      <>
        <Pressable>
          <View style={styles.Card}></View>
        </Pressable>
      </>
    );
  };

  return (
    <>
      <View>
        <View style={styles.container}>
          <View style={styles.containerCard}>
            <FlatList
            style={styles.list}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={courts}
              keyExtractor={(item) => item.id}
              enableEmptySections={true}
              renderItem={Court}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  Card: {
    backgroundColor: "red",
    width: 116.6,
    height: 116.6,
    borderColor: "blue",
    borderWidth: 1,
    textAlign: "start",
  },
  containerCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 10,
    justifyContent: "flex-start",
    backgroundColor: "blue",
    width: 350,
    height:200,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "green",
    marginTop: 20,
  },
  list:{
    width: 350,
    flexWrap: "wrap",
  }
});
