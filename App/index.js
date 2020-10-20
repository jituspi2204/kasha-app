import AsyncStorage from '@react-native-community/async-storage';
import React , {useEffect ,useState}from 'react';
import { View,Text ,StyleSheet, Image ,ActivityIndicator} from 'react-native';
import call from './call';
import {loadUser} from './Actions';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
const App = props => {

    const [loading , chagneLoading] = useState(true);
    useEffect(() => {
        AsyncStorage.getItem('jwt')
        .then(data => {
            if(data){
                call({
                    method : "GET",
                    url : "/me",
                    data : {
                        jwt : data
                    },
                    withCredentials : true
                }).then(res => {
                    console.log("==>",res.data);
                    AsyncStorage.setItem("user" , JSON.stringify(res.data.myInfo))
                    .then(() => {
                        props.loadUser({jwt : data, user : res.data.myInfo});
                        props.navigation.navigate('home');
                    });
                }).catch(error => {
                    props.navigation.navigate("login")
                })
            }else{
                props.navigation.navigate("login")
            }
        }).catch(err => {
            props.navigation.navigate("login")
        })
    }, [])

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
})

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps , {
    loadUser
})(App);