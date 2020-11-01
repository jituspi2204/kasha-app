import React from 'react';
import {View ,Text, StyleSheet , ActivityIndicator} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const Indicator = props => {
    return(
        <LinearGradient
          colors = {["rgba(255, 98, 36, 0)"  , "rgba(255, 149, 36,0)", ]}
                    start = {{x : 0, y : 0}}
                    end = {{x : 0 , y : 1}}
         style = {style.container}>
            <ActivityIndicator 
                color = "rgba(255, 98, 36, 1)"
                size = {50}
            />
        </LinearGradient>
    )
}


const style = StyleSheet.create({
    container : {
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center",
        width : "100%",
        height: "100%",
        // position : "absolute",
        // top: 0,
        // left: 0,
        backgroundColor : "rgba(255,255,255,0)"
    }
})

export default Indicator;