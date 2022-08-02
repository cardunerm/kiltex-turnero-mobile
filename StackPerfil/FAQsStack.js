import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet, FlatList } from "react-native";

const ques = () => {
  return (
    <>
      <View>
        <Text style={styles.question}>¿Pregunta?</Text>
        <Text style={styles.response}>Respuesta</Text>
      </View>
    </>
  );
};

const FAQsStack = () => {
  const [quest, setQuest] = useState([1, 2, 3, 4]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer} >
          <Text style={styles.title}>Preguntas Frecuentes</Text>
        </View>
        <View>
          <FlatList
            data={quest}
            keyExtractor={(item) => item.id}
            renderItem={ques}
          />
        </View>
      </View>
    </>
  );
};

export default FAQsStack;
const styles = StyleSheet.create({
  container: {
    borderColor: "blue",
    borderWidth: 2,
    borderRadius:20,
  },
  titleContainer:{
    marginVertical:20,
  },
  title:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'600',
    paddingBottom:10,    
  },
  question:{
    textAlign:'center',
    fontSize:22,
    fontWeight:'400',
    paddingBottom:10,
  },
  response:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'300',
    paddingVertical:20,
  },
});
