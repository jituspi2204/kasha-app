import React from "react";
import { View, Text, StyleSheet, AsyncStorage, Alert, ActivityIndicator } from "react-native";
import { Input, Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import call from "../call";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../Components/Header";

class BookingScreen extends React.Component {
  state = {
    price: 0,
    rooms: 0,
    checkIn: null,
    checkOut: null,
    name: "",
    hotelName: "",
    days: 0,
    roomSelected : [],
    roomSelectedId : [],
    name : '',
    propertyId : '',
    cupon : '',
    loading: false
  };

  componentDidMount() {
    let dateIn = this.props.route.params.checkIn.split("-");
    let dateOut = this.props.route.params.checkOut.split("-");
    dateIn = new Date(dateIn[2], dateIn[1], dateIn[0]);
    dateOut = new Date(dateOut[2], dateOut[1], dateOut[0]);
    let days = dateOut - dateIn;
    days = Math.ceil(days / (1000 * 60 * 60 * 24));
    this.setState({
      rooms: this.props.route.params.rooms,
      checkIn: this.props.route.params.checkIn,
      checkOut: this.props.route.params.checkOut,
      price: this.props.route.params.amount,
      hotelName: this.props.route.params.hotelName,
      days: days,
      roomSelected: this.props.route.params.roomSelected,
      roomSelectedId : this.props.route.params.roomSelectedId,
      payment : this.props.route.params.payment,
      propertyId : this.props.route.params.hotelId,
      cupon : this.props.route.params.cupon
    });
  }
  
  initiateBooking = (jwt) => {
    let dateIn = this.state.checkIn.split("-");
    let dateOut = this.state.checkOut.split("-");
    dateIn = new Date(dateIn[2], dateIn[1], dateIn[0]);
    dateOut = new Date(dateOut[2], dateOut[1], dateOut[0]);
    call({
      method : 'POST',
      url : '/book-hotel/' + this.state.propertyId,
      withCredentials : true,
      data : {
          jwt : jwt ,
          bookingDetails : {
            rooms : this.state.rooms,
            roomType : "",
            checkIn : dateIn,
            checkOut : dateOut,
            name : this.state.name,
            bookingTime : new Date(Date.now()),
            days : this.state.days,
            roomId : this.state.roomSelectedId,
            roomNo : this.state.roomSelected,
            cupon : this.state.cupon
        }
      }
    }).then(res => {
      Alert.alert("Done" , "You booked a new hotel. Bill reciept has been send to your registered email.Note - Receipt is available for 5 minutes only")
      this.props.navigation.goBack();
    })
  }

  bookHotel =  () =>{
    this.setState({
      loading :true
    })
    AsyncStorage.getItem('jwt')
    .then(result => {
      console.log(result);
      this.initiateBooking(result);
    }).catch(err =>{
      console.log(err.message);
    })
  }

  getListOfRooms = () => {
    let temp = this.state.roomsAvailable.map((el, idx) => {
      return (
          <Text
          key={idx}
          style={[{
            flexGrow:1,
            padding:5,
            borderWidth: 1,
            borderRadius: 4,
            fontSize: 14,
            marginRight : 4,textAlign : "center",
            marginBottom : 4,
          }, this.state.booleanSelected[idx] ? style.selectedStyle : null]}
          onPress = {(event) => {this.selectRooms(event ,el.roomNo , el._id ,idx)}}
        >
          {"AC Rooms\n" +"Room No "+el.roomNo + "\n" + "Rs 1000"}
        </Text>
        
      );
    });
    return temp;
  };

  render() {
      console.log(this.state.price);
    return (
      <View style={style.container}>
       <LinearGradient
            colors = {["rgba(255, 98, 36, 0)"  , "rgba(255, 149, 36,0)", ]}
            start = {{x : 0, y : 0}}
            end = {{x : 0 , y : 1}}
            style = {style.gradientContainer}
        >
        <Header navigation = {this.props.navigation} title = "Booking Details" goBack = {true}
        />
        <ScrollView style = {{padding : 10}}>
        <Input
          label="Name"
          placeholder="Name"
          leftIcon={<Feather name="user" size={20} color="#777" />}
          inputStyle={style.inputStyle}
          inputContainerStyle={style.inputContainerStyle}
          value = {this.state.name}
          onChange = {(event) => {
              this.setState({
                ...this.state,
                name : event.nativeEvent.text
              })
          }}
        />
        <Input
          label="Rooms"
          placeholder="Rooms"
          leftIcon={<FontAwesome name="hotel" size={20} color="#777" />}
          inputStyle={style.inputStyle}
          inputContainerStyle={style.inputContainerStyle}
          disabled
          value={this.state.rooms + ""}
        />
        <View style = {{display : "flex", flexDirection : "row",justifyContent : "space-between",alignItems : "center"}}>
        <DatePicker
          placeholder="Check In"
          format="DD-MM-YYYY"
          customStyles={{
            dateInput: {
              borderRadius: 10,
              height: 50,
              backgroundColor : "#fff",
              elevation : 2,
              borderWidth : 0
            },
            dateText: {
              fontSize: 14,
            },
          }}
          style={[style.inputStyle, { width: "50%", marginBottom: 20 }]}
          disabled
          date={this.state.checkIn}
        />

        <DatePicker
          format="DD-MM-YYYY"
          placeholder="Check Out"
          customStyles={{
            dateInput: {
              borderRadius: 10,
              height: 50,
              backgroundColor : "#fff",
              elevation : 2,
              borderWidth: 0,
            },
            dateText: {
              fontSize: 14,
            },
          }}
          style={[style.inputStyle, { width: "50%", marginBottom: 20 }]}
          disabled
          date={this.state.checkOut}
        />
        </View>
        <Input
          label="Total Days"
          placeholder="Rooms"
          leftIcon={<FontAwesome name="calendar" size={20} color="#777" />}
          inputStyle={style.inputStyle}
          inputContainerStyle={style.inputContainerStyle}
          keyboardType="numeric"
          disabled
          value={this.state.days + ""}
        />
        <Input
          label="Amount"
          placeholder="00.00"
          leftIcon={<FontAwesome name="rupee" size={20} color="#777" />}
          inputStyle={style.inputStyle}
          inputContainerStyle={style.inputContainerStyle}
          keyboardType="numeric"
          disabled
          value={this.state.price + ""}
        />
        <Input
          label="Hotel Name"
          placeholder="Hotel Name"
          leftIcon={<Fontisto name="hotel" size={20} color="#777" />}
          inputStyle={style.inputStyle}
          inputContainerStyle={style.inputContainerStyle}
          keyboardType="numeric"
          disabled
          value={this.state.hotelName}
        />
        
        </ScrollView>
        <Button
          title={this.state.loading ? <ActivityIndicator color = "#fff" size = {25} />: "Book Hotel"}
          containerStyle={style.buttonStyle}
          buttonStyle = {{backgroundColor : "rgba(255, 98, 36, 0.8)" }}
          icon={
            <MaterialIcons
              name="payment"
              size={20}
              color="#fff"
              style={style.iconStyle}
            />
          }
          iconRight
          onPress = {this.bookHotel}
        />
        </LinearGradient>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  inputStyle: {
    paddingLeft: 10,
    fontSize: 14,
    color : "#444"
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    borderRadius: 5,
    paddingLeft: 5,
    width: "100%",
    backgroundColor : "#fff",
    elevation : 1.5
  },
  buttonStyle: {
    width: "100%",
    borderRadius: 5,
    backgroundColor : "rgba(255, 98, 36, 0.8)" ,
    width : "94%",
    alignSelf : "center",marginBottom : 10,
  },
  iconStyle: {
    marginLeft: 10,
  },
  gradientContainer : {
    flex: 1,
  }
});

export default BookingScreen;
