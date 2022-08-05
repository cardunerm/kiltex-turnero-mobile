import React from 'react'
import { Text, View ,StyleSheet} from 'react-native'

const ContactStack = () => {
  const telefono = '2634967139'
  const correo = 'soportePadel22@gmail.com'
  const ubicacion='Direccion del lugar'
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.textPrincipal}>En caso de problemas comunicarse a : </Text>
    <View style={styles.containerText}>
      <Text style={styles.text}>Telefono{' '}:</Text><Text style={styles.text2}>{'  '}{telefono}</Text>
    </View>
    <View style={styles.containerText}>
    <Text style={styles.text}>Correo{' '}:</Text><Text style={styles.text2}>{'  '}{correo}</Text>
    </View>
    <View style={styles.containerText}>
    <Text style={styles.text}>Direccion{' '}:</Text><Text style={styles.text2}>{'  '}{ubicacion}</Text>
    </View>
    </View>
    
    </>
  )
}

export default ContactStack
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    marginTop:30,
    borderBottomColor:'blue',
    borderBottomWidth:2,
    borderTopColor:'blue',
    borderTopWidth:2,
    paddingBottom:20,
  },
  textPrincipal:{
    fontSize:20,
    fontWeight:'800',
    marginTop:30,
    marginBottom:20,
    textAlign:'center'
  },
  containerText:{
    marginVertical:15,
    paddingLeft:15,
  },
  text:{
    fontWeight:'700',
    fontSize:18,
  },
  text2:{
    fontSize:15,
    fontWeight:'600',
    paddingTop:10,
    paddingBottom:15,
    paddingLeft:20,
  }
})