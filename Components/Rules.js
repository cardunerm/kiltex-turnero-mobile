import React from 'react'
import {Text,StyleSheet,View} from 'react-native'
const Rules = () => {
  return (
    <>
    <View>
        <Text style={styles.rulesText}>Reglas a seguir</Text>
    </View>
    </>
  )
}

export default Rules
const styles = StyleSheet.create({
  rulesText:{
    textAlign:'center',
    marginTop:30,
    fontSize:20,
  },
})