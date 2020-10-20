import React, { useState ,useRef} from 'react';
import {View , Text, Image, ImageBackground ,StyleSheet , PermissionsAndroid ,Alert,Animated} from 'react-native';
import {Header} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';

const Headers = props => {
    const [loading , changeLoading] = useState(false);

    return(
        <Header 
            containerStyle = {style.containerStyle}
            rightComponent = { 
              
                <AntDesign name="search1" size={24} color="#fff" />
           
            }
            leftComponent = {
                props.goBack ?<AntDesign name="back" size={28} color="#fff" 
                    onPress = {() => props.navigation.goBack()}
                /> : <Feather name="menu" size={28} color= "#fff"  onPress = {() => props.navigation.toggleDrawer()}/>
            }
          
            backgroundColor =  "rgba(255, 98, 36, 0.8)"
            centerContainerStyle = {{alignItems : "flex-start"}}
            centerComponent = {<Text style = {{fontSize : 18, fontWeight : "600",color :"#fff",}}>{props.title}</Text>}
        />
    )
}


const  style = StyleSheet.create({
    logoStyle : {
        height : 55,
        width : 80
    },
    containerStyle : {
        height : 75,
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
