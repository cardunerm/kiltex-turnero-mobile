import { StyleSheet} from 'react-native';
import Navigation from './SetNavigation/Navigation';
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
