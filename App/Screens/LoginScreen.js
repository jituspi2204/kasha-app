import React from 'react';
import {View , Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import {Input , Button, CheckBox} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import call from '../call';
import {connect} from 'react-redux';
import {login} from '../Actions';
import AsyncStorage from '@react-native-community/async-storage';
class LoginScreen extends React.Component{

    state = {
        email : "",
        password : "",
        showPassword : false,
        loading : false
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
        }
    }

    loginHandler = () => {
        if(this.state.password.length < 1 && this.state.email.length < 1){
            return;
        }
        this.setState({
            loading :true
        })
        call({
            method : "post",
            url : "/login",
            data : {
              email : this.state.email,
              password : this.state.password
            },
            withCredentials : true
          }).then(res => {    
               AsyncStorage.setItem("jwt" , res.data.jwt).then(() => {
                    this.props.login({jwt :res.data.jwt, userType : res.data.userType});
                    this.props.navigation.navigate('loading')
               }).catch(err =>{
                Alert.alert("Invalid","Invalid email or password")
                    this.setState({
                        loading :false
                    })
               })
          }).catch(err => {
            Alert.alert("Invalid" ,"Invalid email or password")
              this.setState({
                  loading :false
              })
          })
    }

    render(){
        return(
            <View style = {style.container}>
               <LinearGradient
                    colors = {["rgba(255, 98, 36, 0.8)"  , "rgba(255, 149, 36,0.9)", ]}
                    start = {{x : 0, y : 0}}
                    end = {{x : 0 , y : 1}}
                    style = {style.gradientContainer}
               >
               <Text style = {style.heading}> LOGIN</Text>
                <Input 
                    placeholder = "Email"
                    inputStyle = {style.inputStyle}
                    inputContainerStyle = {style.inputContainerStyle}
                    containerStyle = {style.containerStyle}
                    leftIcon = {<Feather name="mail" size={24} color="black" />}
                    onChange = {(event) => {this.inputHandler(event ,"email")} }
                    value = {this.state.email}
                />
                <Input 
                    placeholder = "Password"
                    inputStyle = {style.inputStyle}
                    inputContainerStyle = {style.inputContainerStyle}
                    containerStyle = {style.containerStyle}
                    leftIcon = {<Feather name="unlock" size={24} color="black" />}
                    onChange = {(event) => {this.inputHandler(event ,"password")} }
                    value = {this.state.password}
                    secureTextEntry = {!this.state.showPassword}
                />
                <CheckBox 
                    title = "Show Password"
                    containerStyle = {style.CheckboxContainerStyle}
                    checkedColor = "#fff"
                    uncheckedColor = "#fff"
                    textStyle = {{color : "#fff",fontWeight : "400"}}
                    checked = {this.state.showPassword}
                    onPress = {() => {this.setState({
                        showPassword : !this.state.showPassword
                    })}}
                />
                <Button 
                    title = {this.state.loading ? <ActivityIndicator color = "#fff" size = {30} /> : "Login"}
                    buttonStyle = {style.buttonStyle}
                    containerStyle = {style.buttonContainerStyle}
                    onPress = {this.loginHandler}
                />
                <Text style = {style.linkText} onPress = {()=>this.props.navigation.navigate("register")}>New User | Register</Text>
                <Text style = {style.linkText}  onPress = {()=>this.props.navigation.navigate("forgotPassword")}>Forgot Password</Text>

               </LinearGradient>
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
        padding : 10,
        display : "flex",
        alignItems : "center",
        justifyContent : "center"
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
        marginBottom : "20%"
    },
    buttonStyle :{
        backgroundColor : "rgba(255,255,255,0)",
        borderWidth :1,
        borderColor : "#fff",
        width : "100%",
        height:"100%",
        borderRadius : 30
    },
    buttonContainerStyle : {
        height: 60,
        width: "95%",
        alignSelf : "center",
        borderRadius : 30,
        marginTop : 50,
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