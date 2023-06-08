import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Pressable,
  FlatList,
  RefreshControl,
  SectionList,
  SafeAreaView,
  Animated
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { FlatGrid } from "react-native-super-grid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../Components/css/CssHome";
import { courtHomeApi } from "../Service/ServHome";
import { newsletterHomeApi } from "../Service/ServHome";
import { stylesvar } from "../Components/css/variables_Css";
import Pagination from "../Components/Pagination";
import { Alert } from "react-native";

const Home = ({ navigation }) => {
  const timerRef = useRef(null)
  const [current, setCurrent] = useState(0);
  const [isError, setIsError] = useState(false);

  const alertClosedSession = () =>{
    Alert.alert(
      'La sesión ha caducado',
      'Vuelve a iniciar sesión',
      [{text: "Aceptar", style: "cancel", onPress: () => {navigationn.navigate("login")} }]);
  };
  
  //HOOKS
  const [token, setToken] = useState();
  useEffect(() => {
    getData()
    setTimeout(() => {
      if (token === null) {
        alertClosedSession()
        return
      }
      return
    }, 2500);

  }, [token]);
  const getData = async () => {
    try {
      const token = JSON.parse(await AsyncStorage.getItem("token"));
      setToken(token)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    courtHomeApi(setCourts, setCargando, setIsError);
    setTimeout(() => {
      if (isError == true && token != null) {
        alertClosedSession()
      }
      setCurrent(1)
    }, 3000)
  },[isError])
  useEffect(() => {
    if (current == 0) {
      setCurrent(1)
    }
    if (novedades.length == 0) {
      newsletterHomeApi(setNovedades);
      courtHomeApi(setCourts, setCargando, setIsError);
    }
    if (isCaruselFoun) {
      if (novedades.length != 0) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        if (current > novedades.length) {
          setCurrent(1)
        }
        timerRef.current = setTimeout(() => {
          ref?.current?.scrollToIndex({ index: current - 1 });
          setCurrent(c => c + 1)

        }, 3000);
        return () => clearTimeout(timerRef.current);
      }
    }

  }, [current]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsCaruselFoun(true)
      setCurrent(current)
      newsletterHomeApi(setNovedades);
      courtHomeApi(setCourts, setCargando, setIsError);
    });
    navigation.addListener("blur", () => {
      setIsCaruselFoun(false)
    });
    return unsubscribe;
  }, [navigation]);

  const [courts, setCourts] = useState([]);
  const [isCaruselFoun, setIsCaruselFoun] = useState(true);
  const [cargando, setCargando] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const [novedades, setNovedades] = useState([]);
  const navigationn = useNavigation();
  //BODY DEL ELEMENTO - LA CANCHA
  const ref = useRef();

  const Court = ({ item }) => {
    return (
      <>
        <Pressable
          style={[styles.court, stylesvar.var_border]}
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
        <Pressable style={[styles.newsletterContainer, stylesvar.var_border]}>
          <View style={styles.newsletter}>
            <Text style={styles.TextNewsletterTitle}>{item.title}</Text>
            <Text style={styles.TextNewsletterDesc}>{item.description}</Text>
          </View>
        </Pressable>
      </>
    );
  };

  const scrollX = useRef(new Animated.Value(0)).current;
  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };
  const handleonViewableItemsChanged = useRef(({ viewableItems }) => {
    viewableItems=[];
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const flatList = (

    <View style={styles.newsletterCont}>
      <FlatList
        ref={ref}
        data={novedades}
        renderItem={Novedad}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        enableEmptySections={true}
        onViewableItemsChanged={handleonViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        refreshControl={
          <RefreshControl refreshing={cargando} onRefresh={courtHomeApi} />
        }
      />
      <Pagination data={novedades} scrollX={scrollX} />
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
      {(Platform.OS === "android") ? (<View></View>) : (<SafeAreaView></SafeAreaView>)}
      <Pressable
        style={styles.top}
        onPress={() => navigationn.navigate("Informacion")}
      >
        <MaterialCommunityIcons
          style={styles.topIcon}
          name="comment-question"
          size={30}
          color="#2b2b2d"
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
}

export default Home;
