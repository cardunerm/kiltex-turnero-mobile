import React ,{useState}from 'react';
import { Text,FlatList } from 'react-native';
import Turno from '../Components/Turno';

const MyTurno = () => {
  const [turnos, setTurnos] = useState([1,2,3,4]);
  return (
    <>
      <FlatList
        data={turnos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Turno item={item} />;
        }}
      />
    </>
    
  )
}

export default MyTurno
