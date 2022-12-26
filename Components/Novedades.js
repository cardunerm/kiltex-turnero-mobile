import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';

const Novedades = ({novedades}) => {
    const width = Dimensions.get('window').width;
    return (
        <>
        <View style={{ flex: 1 }}>
           <Text>
            novedades
           </Text>
        </View>
        </>
        
    );
}

export default Novedades
