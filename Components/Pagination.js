import React, { useState, useEffect } from 'react';
import { Text, View, Button, Platform, StyleSheet, Animated, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen')
const Pagination = ({ data, scrollX, index }) => {
    return (
        <>
            <View style={styles.container}>
                {
                    data.map((_, idx) => {
                        const inputRange = [(idx - 1) * width, idx * width,(idx + 1) * width];
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange:[12, 30, 12],
                            extrapolate: 'clamp',
                        });
                        const backgroundColor = scrollX.interpolate({
                            inputRange,
                            outputRange:['#ccc', '#000', '#ccc'],
                            extrapolate: 'clamp',
                        });
                        return <Animated.View key={idx.toString()} style={[styles.point,{width:dotWidth,backgroundColor},
                            idx == index && styles.dotActive
                        ]} />
                    })
                }
            </View>
        </>
    )
}

export default Pagination
export const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginTop: 20,
        flexDirection: 'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    point: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ccc',
        marginHorizontal:5,
    },
    dotActive:{
        backgroundColor:'#000'
    }
})