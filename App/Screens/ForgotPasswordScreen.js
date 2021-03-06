import React from 'react';
import {View , Text, StyleSheet,Switch,Alert,ActivityIndicator} from 'react-native';
import {Input , Button, CheckBox ,} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import call from '../call';
class LoginScreen extends React.Component{

    state = {
        email : "",
        password : "",
        confirmPassword : "",
        name : "",
        showPassword : false,
        userType : false,
        loading :false
    }

    inputHandler = (event , type) => {
        if(type === 'email'){
            this.setState({
                email : event.nativeEvent.text
            })
        }
    }
    forgotPasswordHandler = () => {
        this.setState({
            loading : true
        })
        call({
            method :"POST",
            url : "/forgot-password",
            data : {
                email : this.state.email
            },
            withCredentials : true
        }).then(res => {
            if(res.status === 200){
                Alert.alert("Done" , "Temporary password send to your registered email");
                this.props.navigation.navigate('login');
            }else{
                Alert.alert("Error" , "Something went wrong , try after sometime or Email is not registered");
            this.setState({
                loading :false
            })
            }
        }).catch(err => {
            console.log(err.response);
            Alert.alert("Error" ,err.response.data.message);
            this.setState({
                loading :false
            })
        })
    }

    render(){
        return(
            <View style = {style.container}>
               <LinearGradient
                        colors = {["rgba(252, 182, 3, 0.7)"  , "rgba(255, 149, 36,0.9)"]}
                    
                    start = {{x : 0, y : 0}}
                    end = {{x : 0 , y : 1}}
                    style = {style.gradientContainer}
               >
               <ScrollView style = {{width : "100%"}} showsVerticalScrollIndicator = {false}>
               <Text style = {style.heading}> Forgot Password</Text>
                <Input 
                    placeholder = "Enter registered email"
                    inputStyle = {style.inputStyle}
                    inputContainerStyle = {style.inputContainerStyle}
                    containerStyle = {style.containerStyle}
                    leftIcon = {<Feather name="mail" size={24} color="black" />}
                    onChange = {(event) => {this.inputHandler(event ,"email")} }
                    value = {this.state.email}
                />
                
                <View style = {style.userType}>
                    <Text style = {style.text}>Customer</Text>
                    <Switch 
                        value = {this.state.userType}
                        onValueChange = {()=>{
                            this.setState({
                                userType : !this.state.userType
                            })
                        }}
                    />
                    <Text style = {style.text}>Owner</Text>
                </View>
                <Button 
                    title = {this.state.loading ? <ActivityIndicator color = "#fff" size = {30}/> : "Get Temporary Password"}
                    buttonStyle = {style.buttonStyle}
                    containerStyle = {style.buttonContainerStyle}
                    onPress = {this.forgotPasswordHandler}
                />
                <Text style = {style.linkText} onPress = {()=>this.props.navigation.navigate("register")}>New User | Register</Text>
                <Text style = {style.linkText} onPress = {()=>this.props.navigation.navigate("login")}>Already have account | Login</Text>
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
        marginBottom : "10%",
        marginTop : "30%"
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

export default LoginScreen;