import React, { useState, useEffect } from "react";
import { Text, FlatList } from "react-native";
import Court from "../Components/Court";
import axios from "axios";
import { environment } from "../env/env.develop";

const CourtsScreen = () => {
  //Hooks

  const [courts, setCourts] = useState([]);

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
        console.log(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    get();
  }, []);
  
  return (
    <>
      <FlatList
        data={courts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Court item={item} />;
        }}
      />
    </>
  );
};

export default CourtsScreen;
