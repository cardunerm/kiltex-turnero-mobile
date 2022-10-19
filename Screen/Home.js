import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  FlatList,
  RefreshControl,
  SectionList,
  SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { FlatGrid } from "react-native-super-grid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../Components/css/CssHome";
import { courtHomeApi } from "../Service/ServHome";
import { newsletterHomeApi } from "../Service/ServHome";
const Home = ({ navigation }) => {

  //HOOKS
  const [token, setToken] = useState();
  useEffect(() => {
    getData()
    if(token === null){
      navigation.navigate("login");
      return
    }
  }, [token]);
  const getData = async () => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      setToken(token)
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {

    const unsubscribe = navigation.addListener("focus", () => {
      newsletterHomeApi(setNovedades);
      courtHomeApi(setCourts, setCargando);
    });

    return unsubscribe;
  }, [navigation]);

  const [courts, setCourts] = useState([]);
  const [courtsFilter, setCourtsFilter] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const [novedades, setNovedades] = useState([]);

  const navigationn = useNavigation();
  //BODY DEL ELEMENTO - LA CANCHA
  const Court = ({ item }) => {
    return (
      <>
        <Pressable
          style={styles.court}
          onPress={() => navigationn.navigate("Details", item.id)}
        >
          <MaterialCommunityIcons name="tennis" size={50} color="black" />
          <Text style={styles.textName}>{item.name}</Text>
        </Pressable>
      </>
    );
  };

  //NOVEDADES
  //BODY DEL ELEMENTO - NOVEDADES
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
        refreshControl={
          <RefreshControl refreshing={cargando} onRefresh={courtHomeApi} />
        }
      />
    </View>
  );
  //Lista de canchas
  const flatGrid = (
    <FlatGrid
      itemDimension={100}
      data={courts}
      spacing={5}
      keyExtractor={(item) => item.id}
      renderItem={Court}
    />
  );
  //VISTA DEL LISTADO CANCHAS - NOVEDADES
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
    {(Platform.OS === "android")?(<View></View>):(<SafeAreaView></SafeAreaView>)}
      <Pressable
        style={styles.top}
        onPress={() => navigationn.navigate("Informacion")}
      >
        <MaterialCommunityIcons
          style={styles.topIcon}
          name="comment-question"
          size={30}
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
