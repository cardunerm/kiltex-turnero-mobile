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
  SectionList,
} from "react-native";
import Court from "../Components/Court";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { environment } from "../env/env.develop";
import { Searchbar } from "react-native-paper";
import { FlatGrid } from "react-native-super-grid";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Service
import callApiGet from "../Service";

const Home = () => {
  //CANCHAS

  //Hooks
  const [courts, setCourts] = useState([]);
  const [courtsFilter, setCourtsFilter] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  //Ll amado a la API
  useEffect(() => {
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

  const navigation = useNavigation();
  //BODY DEL ELEMENTO
  const Court = ({ item }) => {
    return (
      <>
        <Pressable
          style={styles.court}
          onPress={() => navigation.navigate("Details", item.id)}
        >
          <MaterialCommunityIcons name="tennis" size={50} color="black" />
          <Text style={styles.textName}>{item.name}</Text>
        </Pressable>
      </>
    );
  };

  //NOVEDADES

  //Hooks
  const [novedades, setNovedades] = useState([{ id: "1" }, { id: "2" }]);

  //BODY DEL ELEMENTO
  const Novedad = ({ item }) => {
    return (
      <>
        <Pressable
          style={styles.novedad}
          onPress={() => navigation.navigate("Details", item.id)}
        ></Pressable>
      </>
    );
  };

  const flatList = (
    <FlatList
      style={styles.novedadCont}
      keyExtractor={(item) => item.id}
      enableEmptySections={true}
      data={novedades}
      renderItem={Novedad}
    />
  );
  const flatGrid = (
    <FlatGrid
      itemDimension={100}
      data={courts}
      spacing={5}
      keyExtractor={(item) => item.id}
      renderItem={Court}
    />
  );

  const newTaskData = [
    {
      title: "Canchas",
      data: [
        {
          id: "1",
          task: "cancha",
        },
      ],
    },
  ];
  const completedTaskData = [
    {
      title: "Novedades",
      data: [
        {
          id: "6",
          task: "Novedad",
        },
      ],
    },
  ];

  //BODY GENERAL
  return (
    <>
      <Pressable style={styles.top}
      onPress={() => navigation.navigate("Informacion")}
      >
        <MaterialCommunityIcons
        style={styles.topIcon}
          name="cellphone-information"
          size={35}
          color="#fff"
        />
      </Pressable>
      <View style={styles.containSaludo}>
        <Text style={styles.saludo1}> Hola!!!</Text>
        <Text style={styles.saludo2}>¿Listo para jugar?</Text>
      </View>
      <SectionList
        sections={[...newTaskData, ...completedTaskData]}
        renderItem={({ item }) =>
          item.task == "cancha" ? (
            <View>{flatGrid}</View>
          ) : (
            <View>{flatList}</View>
          )
        }
        renderSectionHeader={({ section }) => (
          <Text style={styles.taskTitle1}>{section.title}</Text>
        )}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled
      />
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  top: {
    backgroundColor: "#2b2b2d",
    height: 60,
    width:60,
    position:'absolute',
    right:5,
    borderRadius:50,
    flexDirection: "column",
    justifyContent: "center",
    marginTop:5,
    zIndex:20,
  },
  topIcon:{
    textAlign:"center",
  },
  containSaludo: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  saludo1: {
    fontSize: 25,
    fontWeight: "900",
    paddingLeft: 10,
    zIndex:10,
  },
  saludo2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555",
    zIndex:10,
  },
  court: {
    borderColor: "#0853b5",
    borderWidth: 3,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
  },
  textName: {
    fontSize: 20,
    textAlign: "center",
  },
  novedad: {
    marginTop: 10,
    borderColor: "#0853b5",
    borderWidth: 2,
    height: 100,
  },
  novedadCont: {
    marginTop: 20,
  },
  taskTitle1: {
    backgroundColor: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    elevation: 4,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 10,
  },
});
