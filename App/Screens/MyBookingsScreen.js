import React from 'react';
import {Text , View, StyleSheet} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../Components/Header';
import call from '../call';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
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
        <TouchableOpacity
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
                    colors = {["rgba(255, 98, 36, 0.3)"  , "rgba(255, 149, 36,0.3)", ]}
                    start = {{x : 0, y : 0}}
                    end = {{x : 1 , y : 1}}
                    style = {style.bookingListContainer}
               >
          <View style = {style.left}>
            <Text style = {[style.text , {fontWeight:"700"}]}>{el._id}</Text>
            <Text style = {style.text}>{el.hotelDetails.propertyName}</Text>

          </View>
          <View style = {style.right}>
          <FontAwesome name="rupee" size={20} color="black">{el.bookingDetails.payment}</FontAwesome>
          </View>
          <View style = {[style.dateContianer, ]}>
            <Feather name="calendar" size={24} color="green" />
            <Text style = {{color: "#fff"}}>{new Date(el.bookingDetails.checkIn).toUTCString()}</Text>
          </View>
          <View style = {style.dateContianer}>
            <Feather name="calendar" size={24} color="red" />
            <Text style = {{color : "#fff"}}>{new Date(el.bookingDetails.checkOut).toUTCString()}</Text>
          </View>
          </LinearGradient>
        </TouchableOpacity>
      )
    })
    return(
      <View style = {style.container}>
        <Header navigation = {this.props.navigation} title = "My Bookings"/>
        {this.state.loading ? <Indicator /> : 
        <ScrollView style = {style.scrollContainer}>
          {bookingList}
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
    padding : 10
  },
  bookingListContainer : {
    width : "96%",
    padding :10,
    display : "flex",
    flexDirection : "row",
    justifyContent : "flex-start",
    alignItems : "center",
    flexWrap : "wrap",
    backgroundColor :"rgba(252, 157, 3, 0.8)",
    elevation : 0,
    margin: "2%",
    borderRadius : 10
  },
  left: {
    width : "70%",

  },
  right :{
    width : "30%",
    alignItems: "flex-end"
  },
  dateContianer : {
    width :"100%",
    display : "flex",
    flexDirection :"row",
    justifyContent: "space-between",
    alignItems : "center",
    padding: 5
  },
  text:{
    fontSize : 16,
    color: "#444",
    padding: 4,
    color : "#fff"
  }
})
const mapStateToProps = (state) => {
  return {
    ...state
  }
} 

export default connect(mapStateToProps, {

})(MyBookingsScreen);