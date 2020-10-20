import React from 'react';
import {View , Text , StyleSheet,ActivityIndicator, Image ,ImageBackground,Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Splash = props => {
    return(
        <View style = {style.contaner}>
                      <LinearGradient
                        colors = {["rgba(255, 98, 36, 0.7)"  , "rgba(255, 149, 36,0.9)"]}
                        start = {{x : 0, y : 0}}
                        end = {{x : 0 , y : 1}}
                        style = {style.gradientContainer}
                      >
                        <View>
                            <Image 
                                source = {require('./Assets/images/logo.png')}
                                style = {style.logoStyle}
                            />
                        </View>
                        <Text>
                            <ActivityIndicator 
                                color =  "rgba(255,255,255,1)"
                                size = {50}
                            /> 
                        </Text>
                    </LinearGradient>
            </View>
    )
}


const style = StyleSheet.create({
    contaner : {
        flex : 1,
        position : "relative"
    },
    backgroundContainer : {
        width : "100%",
        height : "100%"
    },
    gradientContainer : {
        width : "100%",
        height : "100%",
        display : "flex",
        flexDirection :"column",
        justifyContent : "space-evenly",
        alignItems : "center",
        padding : 20,
    },  
    logoStyle : {
        width : 140, 
        height :150,
        alignSelf : "center"
    }
});

export default Splash;