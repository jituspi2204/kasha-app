import React from 'react';
import {Text , View, StyleSheet, ImageBackground, Image, Dimensions} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../Components/Header';
import call from '../call';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Barcode from 'react-native-barcode-builder';


const BookingDetailsScreen = (props) => {
    const details = props.route.params.details;
    const address = details.hotelDetails.address + " " +
                      details.hotelDetails.area + " " +
                      details.hotelDetails.city + " " + 
                      details.hotelDetails.state +" " + 
                      details.hotelDetails.country;
    const roomsBlock = details.bookingDetails.roomNo.map((el, idx) => {
      return (
        <Text key={idx} style={style.roomsBox}>
          {el}
        </Text>
      );
    });


    return (
        <View style = {{flex : 1}}>
        <Header navigation = {props.navigation} title = "Bookings Details" goBack = {true}/>
      <ScrollView style={style.container} key={"fdd"}>
          <ImageBackground source = {require('../Assets/images/paid.jpg')} style = {{
              width : Dimensions.get('window').width -10,
              height : Dimensions.get("window").height,
              position : "absolute",
              top : 0,
              left: 0,
              opacity : 0.2
          }} />
        <View style={style.header}>
          <Image
            source={require("../Assets/images/logo-d.png")}
            style={{
              width: 80,
              height: 80,
            }}
          />
          <View>
            <Text style={{ textAlign: "center" }}>
              {props.route.params.details._id}
            </Text>
            <Barcode value={details._id} format="CODE128" width={0.7} height={40} />
          </View>
        </View>
        <Text> </Text>
        <View style={style.rooms}>
          {/* <Text style={{ width: "100%", textAlign: "center", fontSize: 18,margin : 10 }}>
            {details.bookingDetails.bookingTime}
          </Text> */}
          {roomsBlock}
        </View>
        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={style.subHeading}>{details.userEmail}</Text>
          <Text style={style.textStyle}>{details.bookingDetails.name}</Text>
          <Text style={[{ width: "40%", textAlign: "right", fontSize: 18 }]}>
            {details.hotelId}
          </Text>
          <Text style={style.subHeading}>Check In</Text>
          <Text style={{ fontSize: 20, marginBottom: 5, marginTop: 5 }}>
            {details.bookingDetails.checkIn}
          </Text>
          <Text style={style.subHeading}>Check Out</Text>
          <Text style={{ fontSize: 20, marginBottom: 5, marginTop: 5 }}>
            {details.bookingDetails.checkOut}
          </Text>
        </View>
       
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 5,
            padding : 5
          }}
        >
          <Text style={style.subHeading}>Hotel Name</Text>
          <Text style={{ fontSize: 18, marginBottom: 5, marginTop: 5 }}>
            {details.hotelDetails.propertyName}
          </Text>
          <Text style={style.subHeading}>Hotel Address</Text>
          <Text style={{ fontSize: 18, marginBottom: 5, marginTop: 5 ,textAlign :"justify"}}>
            {address}
          </Text>
        </View>
          <Text style={{ fontSize: 20, marginBottom: 20, marginTop: 20 }}>
            Payment  Rs {details.bookingDetails.payment}
          </Text>
          
      </ScrollView>
      </View>
    );
  };
  
  const style = StyleSheet.create({
    container: {
      borderWidth: 0,
      padding: 10,
      borderRadius: 10,
      margin: 10,
      flex: 1,
      backgroundColor : "#fff",
      elevation : 5
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: 10,
      borderBottomWidth: 2,
    },
    rooms: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    },
    roomsBox: {
      padding: 5,
      flex: 1,
      fontSize: 20,
      borderWidth: 1,
      borderRadius: 4,
      textAlign: "center",
      marginRight: 5,
    },
    subHeading: {
      width: "100%",
      fontSize: 12,
      margin: 0,
      padding: 0,
      marginTop: 10,
    },
    textStyle: {
      width: "60%",
      fontSize: 25,
      marginBottom: 0,
      marginTop: 0,
      textTransform: "uppercase",
    },
  });


const mapStateToProps = (state) => {
  return {
    ...state
  }
} 

export default connect(mapStateToProps, {

})(BookingDetailsScreen);