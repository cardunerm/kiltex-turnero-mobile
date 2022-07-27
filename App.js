import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Modal} from 'react-native';
import Navigation from './Navigation';
import Login from './Login/Login';
import { useState, useEffect, useRef} from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';



export default function App() {
//Hooks


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
