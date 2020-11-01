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
       offers : []
    }

   
    componentDidMount(){
        this.setState({
            offers : this.props.user.cupons
        })
    }

    logout = () => {
              AsyncStorage.multiRemove(["jwt", "user"]).then(() => {
                this.props.route.params.navigation.navigate('login');
              }).catch(err => {
                console.log(err);
              })
            }
    render(){

        let offerBlock = this.state.offers.map((el , idx) => {
            return(
                <View>
                <Image 
                source = {{uri : "https://immense-hollows-05754.herokuapp.com/offers/" + el + ".jpg"}}
                style = {{width : "100%", height : 150 , borderRadius : 4,alignSelf : "center",marginVertical : 1}}
               />
            <View style = {{display : "flex",flexDirection  :"row" ,justifyContent : "space-between",alignItems : "center",backgroundColor : "#fff",elevation : 1,padding : 10}}>
                <Text style = {{color : "red",fontWeight : "300",fontSize : 14}}>Use Code : {el}</Text>
                <Text style = {{color : "red",fontWeight : "300",fontSize : 14}}>Discount Amount : Rs {el.split('-').pop()}</Text>
            </View>
            </View>
            )
        })

        return(
            <View style = {style.container}>
                <Header navigation = {this.props.navigation} title = "My Offers" goBack = {true}/>
            
             
               <ScrollView
                    style = {style.gradientContainer}
               >
               
               {this.state.offers.length === 0 ? <Text style = {{alignItems : "center",textAlign :"center"}}>No Offer </Text>: offerBlock}
            
             
             
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
        padding : 10,
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
        width: "98%",
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
        padding : 10
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