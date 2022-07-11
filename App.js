import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Modal} from 'react-native';
import Navigation from './Navigation';
import Login from './Login/Login';
import { useState } from 'react';



export default function App() {
//Hooks
 const [visbLogin,setVisbLogin]=useState(true)
 const [visbNaveg,setVisbNaveg]=useState(false)

  return (
      <Navigation/> 
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
