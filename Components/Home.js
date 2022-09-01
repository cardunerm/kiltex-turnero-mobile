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
  }, [courts]);
  useEffect(() => {
    getNovedades();
  }, [novedades]);
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

  const getNovedades = async () => {
    const urlNovedades =
      environment.api.url + "/api/v1/client/HomeCard/list_home_cards";
    await axios
      .get(urlNovedades)
      .then((response) => {
        setNovedades(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log("ERR" + e);
      });
  };

  //Hooks
  const [novedades, setNovedades] = useState([]);

  //BODY DEL ELEMENTO
  const Novedad = ({ item }) => {
    return (
      <>
        <Pressable style={styles.newsletterContainer}>
          <View style={styles.newsletter}>
            <Text style={styles.TextNewsletterTitle}>{item.title}</Text>
          <Text style={styles.TextNewsletterDesc}>{item.description}</Text>
          </View>
        </Pressable>
      </>
    );
  };

  const flatList = (
    <View style={styles.newsletterCont}>
      <FlatList
      
      enableEmptySections={true}
      data={novedades}
      renderItem={Novedad}
    />
    </View>
    
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
      <Pressable
        style={styles.top}
        onPress={() => navigation.navigate("Informacion")}
      >
        <MaterialCommunityIcons
          style={styles.topIcon}
          name="comment-question"
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
    width: 60,
    position: "absolute",
    right: 5,
    borderRadius: 50,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 5,
    zIndex: 20,
  },
  topIcon: {
    textAlign: "center",
  },
  containSaludo: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  saludo1: {
    fontSize: 25,
    fontWeight: "900",
    paddingLeft: 10,
    zIndex: 10,
  },
  saludo2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555",
    zIndex: 10,
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
  newsletterContainer: {
    marginTop: 10,
    borderTopColor:'#0853b5',
    borderBottomColor:'#0853b5',
    //borderColor: "#0853b5",
   borderTopWidth:2,
   borderBottomWidth:2,
  },
  newsletterCont: {
    marginTop: 5,
    marginBottom:30,
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
  newsletter:{
    marginTop:10,
    marginBottom:15,
    paddingHorizontal:15,
  },
  TextNewsletterTitle:{
    fontSize:20,
  },
  TextNewsletterDesc:{
    fontSize:15,
  },
});
