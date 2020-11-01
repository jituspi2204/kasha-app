import React from 'react';
import {View , Text, StyleSheet,Image } from 'react-native';
import {Input , Button, CheckBox} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import call from '../call';
import {connect} from 'react-redux';
import {login} from '../Actions';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../Components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
class LoginScreen extends React.Component{

    state = {
        email : "",
        password : "",
        showPassword : false,
        name : ''
    }

   
    componentDidMount(){
       
    }

    logout = () => {
              AsyncStorage.multiRemove(["jwt", "user"]).then(() => {
                this.props.route.params.navigation.navigate('login');
              }).catch(err => {
                console.log(err);
              })
            }
    render(){
        return(
            <View style = {style.container}>
                <Header navigation = {this.props.navigation} title = "More" showSearch = {false}/>
                <LinearGradient
                    colors = {["rgba(252, 182, 3, 0.7)"  , "rgba(255, 149, 36,0.9)" ]}
                    start = {{x : 0, y : 0}}
                    end = {{x : 1 , y : 1}}
                    style = {[style.itemStyle, {height : 150,padding : 20}]}
               >
                <Image 
                   source = {{uri : "https://immense-hollows-05754.herokuapp.com/users/user-0.png"}}
                   style = {{width : 60, height : 60 , borderRadius : 60}}
                />
                <Text style = {{color : "#fff" , fontSize : 18,marginLeft : "6%"}}>Hi, { this.props.user.name}</Text>
               </LinearGradient>
            
              
               <ScrollView
                    style = {style.gradientContainer}
               >
                <Button 
                    title = "  Your Message"
                    titleStyle = {style.text}
                    buttonStyle = {style.buttonStyle}
                    containerStyle = {style.buttonContainerStyle}
                    icon = {<AntDesign name="message1" size={24} color="black" />}
                />
                <Button 
                    title = "  Your Offers"
                    titleStyle = {style.text}
                    buttonStyle = {style.buttonStyle}
                    containerStyle = {style.buttonContainerStyle}
                    onPress = {() => this.props.navigation.navigate("offers")}
                    icon = { <MaterialIcons name="local-offer" size={24} color="black" />}
                />
                <Button 
                    title = "  Your Reviews"
                    titleStyle = {style.text}
                    buttonStyle = {style.buttonStyle}
                    containerStyle = {style.buttonContainerStyle}
                    icon = {<AntDesign name="star" size={24} color="black" />}
                    onPress = {() => this.props.navigation.navigate('reviews')}
                />
                <Button 
                    title = "  Help"
                    titleStyle = {style.text}
                    buttonStyle = {style.buttonStyle}
                    containerStyle = {style.buttonContainerStyle}
                    icon = {  <MaterialIcons name="help-outline" size={24} color="black" />}
                />
                <Button 
                    title = "  Feedback"
                    titleStyle = {style.text}
                    buttonStyle = {style.buttonStyle}
                    containerStyle = {style.buttonContainerStyle}
                    icon = { <MaterialIcons name="feedback" size={24} color="black" />}
                />
               
                <View style = {[style.itemStyle, {flexDirection : "column",alignItems :"flex-start",height :"auto",paddingVertical : 10}]}>
                    <Text style = {[style.text,{paddingVertical : 10}]}>   Privacy</Text>
                    <Text style =  {[style.text,{paddingVertical : 10}]}>   Terms & conditions</Text>
                    <Text style = {[style.text,{paddingVertical : 10}]} onPress = {this.logout}>   Sign Out</Text>
                </View>
               <Text style ={{textAlign :"center",fontSize : 16,fontWeight : "700",padding : 20}}>V 1.0.0</Text>
               </ScrollView>            
            </View>
        )
    }
}

const style = StyleSheet.create({
    container : {
        flex : 1
    },
    gradientContainer : {
        flex : 1,
        padding : 5
    },
    inputStyle :{
        color : "#444",
        fontSize : 15
    },
    inputContainerStyle : {
        borderBottomWidth :0,
        backgroundColor : "#fff",
        borderRadius : 10,
        paddingLeft : 10
    },
    containerStyle : {
        width : "100%",
        height : 60,
        marginBottom : 20
    },
    heading : {
        alignSelf: "center",
        fontSize : 22,
        fontWeight : "700",
        color : "#fff",
        marginBottom : "20%",
        margin : 0
    },
    buttonStyle :{
        backgroundColor : "rgba(255,255,255,1)",
        borderWidth :0,
        height : 55,
        width : "100%",
        display : "flex",
        flexDirection : "row",
        justifyContent : "flex-start",
    },
    buttonContainerStyle : {
        height: 55,
        width: "100%",
        alignSelf : "center",
        borderRadius : 1,
        marginVertical : 1
    },
    CheckboxContainerStyle : {
        backgroundColor : "rgba(255,255,255,0)",
        borderWidth : 0,
        alignSelf : "flex-end",
        height : 20,
        padding : 0,
        color : "#fff"
    }
    ,
    linkText:{
        fontSize : 16,
        color : "#fff",
        padding : 5,
        textDecorationLine :"underline",
        marginTop : 10
    },
    itemStyle : {
        display : "flex",
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : "center",
        width : "100%",
        height :60,
        borderBottomWidth : 1,
        borderColor : "#ddd"
    },
    text : {
        color : "#444",
        fontWeight : "200",
        fontSize : 15
    }
})

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps , {
    login : login
})(LoginScreen);