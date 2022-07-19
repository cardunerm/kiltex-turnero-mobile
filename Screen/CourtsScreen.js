import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import Court from "../Components/Court";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { environment } from "../env/env.develop";
import { Searchbar } from 'react-native-paper';

const CourtsScreen = () => {
  //Hooks

  const [courts, setCourts] = useState([]);
  const [courtsFilter, setCourtsFilter] = useState([]);

  //Peticion Api
  const filter = {
    filter: "",
    page: 0,
    pageSize: 10,
  };

  const get = () => {
    const url = environment.api.url + "/api/v1/client/Court/list_all_courts";
    axios
      .post(url, filter)
      .then((response) => {
        setCourts(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const navigation = useNavigation();
  const Court = ({ item }) => {
    return (
      <>
        <Pressable onPress={() => navigation.navigate("Details", item.id)}>
          <View style={styles.card}>
            <Text style={styles.titulo}>{item.name}</Text>

            <View style={styles.contImg}>
              <Image
                style={styles.img}
                source={require("../assets/court1.jpg")}
              />
            </View>
            <View>
              <Text style={styles.titulo}>{item.sport}</Text>
            </View>
          </View>
        </Pressable>
      </>
    );
  };
  useEffect(() => {
    get();
  }, []);

 //Search
 const [searchQuery, setSearchQuery] = React.useState('');

 const onChangeSearch = (query) => {
  setSearchQuery(query)
  FilterSeach(query)
 }
  //const nameCourts = courts.map(it => it.name.toUpperCase())
  

 const FilterSeach = (text)=> {
	const newData = courts.filter(function(item){
   
		const itemData = item.name.toUpperCase()
		const textData = text.toUpperCase()
		return itemData.indexOf(textData) > -1
})
setCourtsFilter(newData)
}

  return (
    <>
    <Searchbar
      iconColor="blue"
      placeholder="Buscar"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
      <FlatList
        data={courtsFilter == '' ? courts : courtsFilter}
        keyExtractor={(item) => item.id}
        renderItem={Court}
      />
    </>
  );
};



export default CourtsScreen;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  titulo: {
    textAlign: "center",
    marginVertical: 20,
  },
  contImg: {
    flexDirection: "row",
    justifyContent: "center",
    borderTopColor: "#d6d3d3ed",
    borderTopWidth: 1,
    borderBottomColor: "#d6d3d3ed",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  img: {
    width: 350,
    height: 300,
  },
});
