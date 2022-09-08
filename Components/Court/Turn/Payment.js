import React from 'react'
import { Text,View,StyleSheet, Pressable } from 'react-native';


const Payment = () => {
    
  return (
    <>
    <View style={styles.montoContainer}>
        <Text  style={styles.montoText}>Monto a pagar</Text>
        <Text style={styles.montoNumber}>$ 2000</Text>
    </View>
    <Pressable style={styles.containerPayment}  >
        <Text style={styles.textPayment}>informacion sobre el metodo de Pago</Text>
    </Pressable>
    
    </>
  )
}

export default Payment
const styles = StyleSheet.create({
    montoContainer:{
        backgroundColor: "#1E66B6",
        
    },
    montoText:{
        fontSize:27,
        color:'#fff',
        textAlign:'center',
        fontWeight:'500',
        marginVertical:40,
    },
    montoNumber:{
        color:'#fff',
        fontSize:25,
        textAlign:'center',
        marginBottom:60,
    },
    containerPayment:{
        backgroundColor:'#eee',
        borderRadius:30,
        marginTop:-30,
        flex:1,
    },
    textPayment:{
        marginTop:40,
        textAlign:'center'
    },
})