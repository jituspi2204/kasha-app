import React, { useState ,useRef} from 'react';
import {View , Text, Image, ImageBackground ,StyleSheet , PermissionsAndroid ,Alert,Animated} from 'react-native';
import {Header} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const Headers = props => {
    const [loading , changeLoading] = useState(false);

    return(
        <Header 
            containerStyle = {style.containerStyle}
            rightComponent = {
                <View style = {{display :"flex",flexDirection :"row",alignItems : "center"}}>
                {props.goBack ?  <Feather name="corner-up-left" size={24} color="#fff" 
                    onPress = {()=> props.navigation.goBack()}
                />: null}
               <Feather name="bell" size={24} color="#fff" style = {{padding : 5,borderWidth : 1,borderRadius : 100, borderColor : "#fff",marginHorizontal : 10}}/>
                </View>
            }
            leftComponent = {
               <Image 
                   source= {require('../Assets/images/logo.png')}
                   style = {{width : 50,height: 50}}
               />
            }
            ViewComponent = {LinearGradient}
            backgroundColor =  "rgba(252, 182, 3, 0.7)"
            linearGradientProps = {{
                colors:["rgba(252, 182, 3, 0.7)"  , "rgba(255, 149, 36,0.9)"],
                start : {x : 0, y : 0},
                end : {x : 1, y : 0}
            }}
            centerContainerStyle = {{alignItems : "flex-start"}}
            centerComponent = {<Text style = {{fontSize : 18, fontWeight : "600",color :"#fff",}}>{props.title}</Text>}
        />
    )
}


const  style = StyleSheet.create({
    logoStyle : {
        height : 75,
        width : 80
    },
    containerStyle : {
        height : 85,
        paddingHorizontal : 10,
        borderBottomWidth : 0,
        paddingTop : 20,
        elevation : 0,
        display: "flex",flexDirection:"row",
        alignItems :"center",
    },
    heading:{
        fontSize : 20,
        color :"#111"
    }
})

const mapStateToProps = (state) => {
    return{
        ...state
    }
}
export default connect(mapStateToProps)(Headers);
