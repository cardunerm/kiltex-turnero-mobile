import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Modal} from 'react-native';
import Navigation from './SetNavigation/Navigation';
import { useState, useEffect, useRef} from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default function App() {
//Hooks


  return (
    <SafeAreaProvider>
      <Navigation/> 
    </SafeAreaProvider>
      
     
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
