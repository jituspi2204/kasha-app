import React from 'react';
import {Text , View, StyleSheet, } from 'react-native';
import {Button} from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../Components/Header';
import call from '../call';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Indicator from '../Components/Indicator';
class MyBookingsScreen extends React.Component{
  state = {
    myBookings : [],
    loading : true
  }

  componentDidMount(){
    AsyncStorage.getItem("jwt").then(data => {
      console.log("->",data);
      call({
        method : "GET",
        url : "/me",
        withCredentials : true,
        data : {
          "jwt" : data
        }
      }).then(res => {
        this.setState({
          myBookings : res.data.myBookings,
          loading :false
        })
      })
    }).catch(err => {
      console.log(err);
      this.setState({
        loading :false
      })
    })
  
  } 

  render(){
    console.log(this.state.myBookings);
    const bookingList = this.state.myBookings.map((el, idx) => {
      return (
        <View
          onPress = {() => {
            this.props.navigation.navigate({
              name : "bookingDetails",
              params : {
                details : el
              }
            })
          }}
         
        >
         <LinearGradient
                    colors = {["rgba(255, 98, 36, 0)"  , "rgba(255, 149, 36,0)", ]}
                    start = {{x : 0, y : 0}}
                    end = {{x : 1 , y : 1}}
                    style = {style.bookingListContainer}
               >
          <View style = {style.left}>
            <Text style = {[style.text , {fontWeight:"700"}]}>{el._id}</Text>
            <Text style = {style.text}>{el.hotelDetails.propertyName}</Text>

          </View>
          <View style = {style.right}>
          <FontAwesome5 name="ticket-alt" size={24} color="orange" style = {{marginVertical : 10}} onPress = {() => this.props.navigation.navigate('bookingDetails', {
            details : el
          })}/>
          <FontAwesome name="rupee" size={20} color="black">{el.bookingDetails.payment}</FontAwesome>
          </View>
          <View style = {[style.dateContianer, ]}>
          <MaterialCommunityIcons name="login" size={25} color="green" ></MaterialCommunityIcons>
            {/* <Text style = {{fontSize : 16, color : "green"}}>Check In</Text> */}
            <Text style = {{color: "#333"}}>{new Date(el.bookingDetails.checkIn).toDateString()}</Text>
          </View>
          <View style = {style.dateContianer}>
          <MaterialCommunityIcons name="logout" size={25} color="red"></MaterialCommunityIcons>
          {/* <Text style = {{fontSize : 16, color : "red"}}>Check Out</Text> */}
            <Text style = {{color : "#333"}}>{new Date(el.bookingDetails.checkOut).toDateString()}</Text>
          </View>
          <Text style = {{fontSize : 10}}>* Booking Time : {new Date(el.bookingDetails.bookingTime).toDateString()}</Text>
          <View style = {{width : "100%" , display : "flex",flexDirection : "row",justifyContent : "space-between",alignItems : "center",padding : 10}}>
            <Button 
              title = "Cancel Booking"
              titleStyle = {{color : "#fff"}}
              buttonStyle = {style.buttonStyle}
              containerStyle = {style.buttonContainerStyle}
              ViewComponent = {LinearGradient}
              linearGradientProps = {{
                colors:["rgba(252, 182, 3, 0.7)"  , "rgba(255, 149, 36,0.9)"],
                start : {x : 0, y : 0},
                end : {x : 1, y : 0}
              }}
            />
            {
              new Date(el.bookingDetails.checkOut).getTime() < Date.now()
              ?  el.reviewed ? <Button 
              title = "View Feedback"
              titleStyle = {{color : "#fff"}}
              buttonStyle = {style.buttonStyle}
              containerStyle = {style.buttonContainerStyle}
              ViewComponent = {LinearGradient}
              onPress = {() => this.props.navigation.navigate("review",{
                details : el
              })}
              linearGradientProps = {{
                colors:["rgba(252, 182, 3, 0.7)"  , "rgba(255, 149, 36,0.9)"],
                start : {x : 0, y : 0},
                end : {x : 1, y : 0}
              }}
            />:<Button 
              title = "Give Feedback"
              titleStyle = {{color : "#fff"}}
              buttonStyle = {style.buttonStyle}
              containerStyle = {style.buttonContainerStyle}
              ViewComponent = {LinearGradient}
              onPress = {() => this.props.navigation.navigate("review",{
                details : el
              })}
              linearGradientProps = {{
                colors:["rgba(252, 182, 3, 0.7)"  , "rgba(255, 149, 36,0.9)"],
                start : {x : 0, y : 0},
                end : {x : 1, y : 0}
              }}
            /> : null
            }
          </View>
          </LinearGradient>
        </View>
      )
    })
    return(
      <View style = {style.container}>
        <Header navigation = {this.props.navigation} title = "My Bookings"/>
        {this.state.loading ? <Indicator /> : 
        <ScrollView style = {style.scrollContainer}>
          {bookingList}
          <View style = {{width : "100%" , height : 20}}>

          </View>
        </ScrollView>}
      </View>
    )
  }

}


const style = StyleSheet.create({
  container : {
    flex : 1
  },
  scrollContainer : {
    width : "100%",
    padding : 10,
  },
  bookingListContainer : {
    width : "100%",
    padding :10,
    display : "flex",
    flexDirection : "row",
    justifyContent : "flex-start",
    alignItems : "center",
    flexWrap : "wrap",
    backgroundColor :"#fff",
    elevation : 0,
    marginHorizontal: "0%",
    marginVertical : 1,
    borderRadius : 2
  },
  left: {
    width : "70%",
  },
  right :{
    width : "30%",
    alignItems: "flex-end"
  },
  dateContianer : {
    width :"50%",
    display : "flex",
    flexDirection :"row",
    justifyContent: "space-between",
    alignItems : "center",
    padding: 10,
    borderTopWidth : 0,
    borderColor : "#ddd"
  },
  text:{
    fontSize : 16,
    color: "#444",
    padding: 4,
  },
  buttonStyle : {
    backgroundColor : "#fff"
  },
  buttonContainerStyle : {
    width :"45%",

  }
})
const mapStateToProps = (state) => {
  return {
    ...state
  }
} 

export default connect(mapStateToProps, {

})(MyBookingsScreen);