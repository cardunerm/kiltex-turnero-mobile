import React from 'react'
import { Text,View,StyleSheet} from 'react-native'

const Answer = ({ route }) => {
    const {answer,question }= route.params;
    console.log(route)

    
  return (
    <>
    <View style={styles.container}>
        <Text style={styles.quest}>{question}</Text>
        <Text style={styles.answer}>{answer}</Text>
    </View>
    </>
    
  )
}

export default Answer
const styles = StyleSheet.create({
    container:{
        marginTop:30,
        paddingHorizontal:15,     
    },
    quest:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'600'
    },
    answer:{
        paddingTop:40,
        textAlign:'center',
        fontSize:18,
        fontWeight:'300'
    }
})