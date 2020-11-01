import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {View , Text, StyleSheet,Switch,Image} from 'react-native';
import {Input , Button, CheckBox ,} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../Components/Header';
import call from '../call';
import {connect} from 'react-redux'
class LoginScreen extends React.Component{

    state = {
        email : "",
        password : "",
        confirmPassword : "",
        name : "",
        oldPassword : "",
        showPassword : false,
        userType : false
    }

    componentDidMount(){

    }
    updateDetails = () => {
       AsyncStorage.getItem("jwt").then(data => {
           call({
               method : "POST",
               url : "/update-details",
               data : {
                   jwt : data,
                   name : this.state.name,
                   email : this.state.email 
               },
               withCredentials : true
           }).then(res => {
               console.log(res.data);
            
           })
       })
    }
    updatePassword  = () => {
        AsyncStorage.getItem("jwt").then(data => {
            call({
                method : "POST",
                url : "/update-password",
                data : {
                    jwt : data,
                    password : this.state.oldPassword,
                    newPassword : this.state.password 
                },
                withCredentials : true
            }).then(res => {
                console.log(res.data);
             
            }).catch(err => {
                console.log(err.response);
            })
        })
    }

    inputHandler = (event , type) => {
        if(type === 'email'){
            this.setState({
                email : event.nativeEvent.text
            })
        }else if(type === 'password'){
            this.setState({
                password : event.nativeEvent.text
            })
        }else if(type === 'name'){
            this.setState({
                name : event.nativeEvent.text
            })
        }else if(type === 'confirmPassword'){
            this.setState({
                confirmPassword : event.nativeEvent.text
            })
        }else if(type === 'oldPassword'){
            this.setState({
                oldPassword : event.nativeEvent.text
            })
        }
    }


    render(){
        return(
            <View style = {style.container}>
            <Header  navigation = {this.props.navigation} title = "My Details"/>
               <LinearGradient
                    colors = {["rgba(255, 98, 36, 0)"  , "rgba(255, 149, 36,0)", ]}
                    start = {{x : 0, y : 0}}
                    end = {{x : 0 , y : 1}}
                    style = {style.gradientContainer}
               >
               <ScrollView style = {{width : "100%"}} showsVerticalScrollIndicator = {false}>
             <View style = {{height : 20 , width :"100%"}}>

             </View>
             <Text style = {style.heading}>My Details</Text>

                <Input 
                    placeholder = {this.props.user.name}
                    inputStyle = {style.inputStyle}
                    inputContainerStyle = {style.inputContainerStyle}
                    containerStyle = {style.containerStyle}
                    leftIcon = {<Feather name="user" size={16} color="black"  style = {{alignItems : "center"}}>  Name</Feather>}
                    onChange = {(event) => {this.inputHandler(event ,"name")} }
                    value = {this.state.name}
                />
                <Input 
                    placeholder = {this.props.user.email}
                    inputStyle = {style.inputStyle}
                    inputContainerStyle = {style.inputContainerStyle}
                    containerStyle = {style.containerStyle}
                    leftIcon = {<Feather name="mail" size={16} color="black">  Email</Feather>}
                    onChange = {(event) => {this.inputHandler(event ,"email")} }
                    value = {this.state.email}
                />
                  <Button 
                    title = "Update Details"
                    buttonStyle = {style.buttonStyle}
                    containerStyle = {style.buttonContainerStyle}
                    onPress = {this.updateDetails}
                />
                {/* <Text style = {style.heading}> Password</Text> */}
                <Text style = {style.heading}>Update Password</Text>

                <Input
                    placeholder = "Old Password"
                    inputStyle = {style.inputStyle}
                    inputContainerStyle = {style.inputContainerStyle}
                    containerStyle = {style.containerStyle}
                    leftIcon = {<Feather name="unlock" size={16} color="black">  Old Password</Feather>}
                    onChange = {(event) => {this.inputHandler(event ,"oldPassword")} }
                    value = {this.state.oldPassword}
                    secureTextEntry = {!this.state.showPassword}
                />
                <Input
                    placeholder = "New Password"
                    inputStyle = {style.inputStyle}
                    inputContainerStyle = {style.inputContainerStyle}
                    containerStyle = {style.containerStyle}
                    leftIcon = {<Feather name="unlock" size={16} color="black">  New Password</Feather>}
                    onChange = {(event) => {this.inputHandler(event ,"password")} }
                    value = {this.state.password}
                    secureTextEntry = {!this.state.showPassword}
                />
                 <Input 
                    placeholder = "Confirm Password"
                    inputStyle = {style.inputStyle}
                    inputContainerStyle = {style.inputContainerStyle}
                    containerStyle = {style.containerStyle}
                    leftIcon = {<Feather name="unlock" size={16} color="black">  Confirm Password</Feather>}
                    onChange = {(event) => {this.inputHandler(event ,"confirmPassword")} }
                    value = {this.state.confirmPassword}
                    secureTextEntry = {!this.state.showPassword}
                />
                <Button 
                    title = "Update Password"
                    buttonStyle = {style.buttonStyle}
                    containerStyle = {style.buttonContainerStyle}
                    onPress = {this.updatePassword}
                />
                </ScrollView>
               </LinearGradient>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container : {
        flex : 1,
       
    },
    gradientContainer : {
        flex : 1,
        padding : 0,
        display : "flex",
        alignItems : "center",
        justifyContent : "center"
    },
    inputStyle :{
        color : "#444",
        fontSize : 15,
        height : 50,
        textAlign : "right"
    },
    inputContainerStyle : {
        borderBottomWidth :0,
        backgroundColor : "#fff",
        borderRadius : 4,
        paddingLeft : 10,
        height : 50
    },
    containerStyle : {
        width : "100%",
        height : 50,
        marginBottom : 4
    },
    heading : {
        fontSize : 18,
        fontWeight : "600",
        color : "#444",
        paddingLeft : 10,
        paddingVertical : 10
    },
    buttonStyle :{
        backgroundColor : "rgba(255, 149, 36,0.9)",
        borderWidth :0,
        borderColor : "#fff",
        width : "100%",
        height:"100%",
        borderRadius : 40
    },
    buttonContainerStyle : {
        height: 50,
        width: "95%",
        alignSelf : "center",
        borderRadius : 40,
        marginTop : 10,
        marginBottom : 10
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
        marginTop : 10,
        textAlign :"center"
    },
    userType : {
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        width : "100%",
        paddingHorizontal : "10%"
    },
    text : {
        fontSize : 16,
        color : "#fff",
        padding :10
    }
})

const mapStateToProps = (state) => {
    return{
        ...state
    }
}

export default connect(mapStateToProps)(LoginScreen);