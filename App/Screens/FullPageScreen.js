import React from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Input, Button } from "react-native-elements";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RatingCard from "../Components/RatingCard";
import DatePicker from "react-native-datepicker";
import RatingBox from "../Components/RatingBox";
import call from "../call";
import RatingContainer from '../Components/RatingContainer';
import Header from "../Components/Header";
import Indicator from "../Components/Indicator";

class FullPageScreen extends React.Component {
  state = {
    hotel: null,
    checkIn: null,
    checkOut: null,
    room: null,
    cupon : '',
    vaccant: false,
    roomAvailable: false,
    roomsAvailable: [],
    roomSelected : [],
    roomSelectedId : [],
    booleanSelected : [],
    payment : 0,
    isValidCupon : null,
    days : 0,
    reviews : [],
    loading :true
  }
    componentDidMount() {
    call({
      method : "get",
      url : "/api/v1/" + this.props.route.params.hotel.propertyId
    }).then(res => {
      this.setState({
        ...this.state,
        hotel: this.props.route.params.hotel,
        reviews : res.data.result[0].reviews,
        loading : false
      });
    }).catch(err => {
      this.setState({
        ...this.state,
        hotel: this.props.route.params.hotel,
        reviews :[],
        loading: false
      });
    })

  }

  getAvailableRooms = () => {
    call({
      method: "GET",
      url: "/api/v1/check/" + this.state.hotel.propertyId,
      withCredentials: true,
    })
      .then((res) => {
        const rooms = res.data.rooms;
        let booleanSelected = [];
        res.data.rooms.forEach((el, idx) => {
          booleanSelected.push(false);
        });
        let checkInDate = new Date(this.state.checkIn);
        let checkOutDate = new Date(this.state.checkOut);
        let roomsAvailable = rooms.filter((el) => {
          let status = true;
          if (el.date.length !== 0) {
            for (let i = 0; i < el.date.length; i++) {
              let dt = new Date(el.date[i]);
              if (dt > checkInDate && dt < checkOutDate) {
                status = false;
                break;
              }
            }
          }
          return status;
        });
        // console.log(roomsAvailable);
        let dateIn = this.state.checkIn.split("-");
    let dateOut = this.state.checkOut.split("-");
    dateIn = new Date(dateIn[2], dateIn[1], dateIn[0]);
    dateOut = new Date(dateOut[2], dateOut[1], dateOut[0]);
    let days = dateOut - dateIn;
    days = Math.ceil(days / (1000 * 60 * 60 * 24));
        if (roomsAvailable.length >= parseInt(this.state.room)) {
          console.log(roomsAvailable);
          this.setState({
            ...this.state,
            roomAvailable: true,
            roomsAvailable,
            vaccant: true,
            booleanSelected ,
            days
          });
        } else {
          this.setState({
            ...this.state,
            roomAvailable: false,
            roomsAvailable: [],
            vaccant: false,
            booleanSelected,
            days
          });
        }
      })
      .catch((err) => {});
  };

  getListOfRooms = () => {
    let temp = this.state.roomsAvailable.map((el, idx) => {
      return (
          <Text
          key={idx}
          style={[{
            flexGrow:1,
            padding:5,
            borderRadius: 4,
            fontSize: 14,
            backgroundColor : "#fff",
            elevation : 2,
            marginRight : 10,textAlign : "center",
            marginBottom : 10,
          }, this.state.booleanSelected[idx] ? style.selectedStyle : null]}
          onPress = {(event) => {this.selectRooms(event ,el.roomNo , el._id ,idx ,el)}}
        >
          {"AC Rooms\n" +"Room No "+el.roomNo + "\n" + "Rs 1000"}
        </Text>
        
      );
    });
    return temp;
  };
  selectRooms = (event, val, id ,idx ,el) => {
    if(this.state.roomSelected.length <= parseInt(this.state.room)){
      let selectedRooms = this.state.roomSelected;
      let selectedRoomsId  = this.state.roomSelectedId;
      let booleanSelected = this.state.booleanSelected;
      let index = selectedRooms.indexOf(val);
      let payment = this.state.payment;
      if(selectedRooms.length < parseInt(this.state.room) && index === -1 ){
        selectedRooms.push(val);
        selectedRoomsId.push(id);
        booleanSelected[idx] = true;
        payment += (parseInt(el.price) - parseInt(el.discount)) * parseInt(this.state.days); 
      }else if(index !== -1){
        selectedRooms.splice(index , 1);
        selectedRoomsId.splice(index , 1);
        booleanSelected[idx] = false;
        payment -= (parseInt(el.price) - parseInt(el.discount)) * parseInt(this.state.days); 
      }
      this.setState({
        ...this.state,
          roomSelected : selectedRooms,
          roomSelectedId : selectedRoomsId,
          booleanSelected,
          payment
      })
  }
  }
  getPriceBlock = (price, color, strike) => {
    return (
      <View style={style.priceBlock}>
        <FontAwesome name="rupee" size={25} color={color} />
        <Text
          style={{
            marginLeft: 5,
            fontSize: 20,
            color,
            textDecorationLine: strike ? "line-through" : "none",
          }}
        >
          {price}
        </Text>
      </View>
    );
  };
  removeCupon = ()=>{
    let payment = this.state.payment + parseInt(this.state.cupon.split('-').pop());
    this.setState({
      ...this.state,
        isValidCupon :null,
        cupon : '',
        payment
      
    })
  }

  checkAvailability = () => {
    if (this.state.roomAvailable && this.state.roomSelected.length === this.state.room) {
      this.props.navigation.navigate({
        name: "payment",
        params: {
          rooms: this.state.room,
          checkIn: this.state.checkIn,
          checkOut: this.state.checkOut,
          amount: this.state.payment,
          hotelName: this.state.hotel.propertyName,
          roomSelected : this.state.roomSelected,
          roomSelectedId : this.state.roomSelectedId,
          hotelId : this.state.hotel.propertyId,
          cupon : this.state.cupon
        },
      });
    } else {
      let dOne = this.state.checkIn.split('-');
      let dTwo = this.state.checkOut.split('-');
      if(new Date(dOne[2] , dOne[1] , dOne[0]).getTime() < new Date(dTwo[2] , dTwo[1] , dTwo[0]).getTime()){
        if(this.state.room <= 10 && this.state.room > 0){
          this.getAvailableRooms();
        }else{
          Alert.alert("Invalid Details" , "Room limit is 10")
        }
        
      }else{
        Alert.alert("Invalid Details" , "Check out date should be greater than check in date");
      }
    }
  };
  validateCupon = () => {
    console.log(this.state.cupon);
    if(this.state.cupon !== ''){
    call({
      method: "GET",
      url: "/validate-cupon/" + this.state.cupon.toUpperCase(),
      withCredentials: true,
    }).then((res) => {
      if (res.data.status === "success" && this.state.roomSelected.length !== 0) {
        let payment = this.state.payment - parseInt(this.state.cupon.split('-').pop());
        this.setState({
          ...this.state,
            isValidCupon: true,
            payment
        });
      } else {
        this.setState({
          ...this.state,
            isValidCupon: false,
        });
      }
    });
  }
  };


  render() {
    const address =
      this.state.hotel === null
        ? null
        : this.state.hotel.location.address +
          " , " +
          this.state.hotel.location.area +
          " , " +
          this.state.hotel.location.city +
          " , " +
          this.state.hotel.location.state +
          " , " +
          this.state.hotel.location.country;
    const images =
      this.state.hotel === null ? null : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.state.hotel.coverImage}
          keyExtractor={(item, idx) => idx}
          renderItem={({ item }) => {
            return (
              <Image
                source={{ uri: item }}
                style={{
                  height: 300,
                  width: 500,
                  marginTop: 4,
                }}
                resizeMode="cover"
              />
            );
          }}
        />
      );
    const roomServices =
      this.state.hotel === null
        ? null
        : this.state.hotel.roomFacilitiesArray.map((el, idx) => {
            if (el.length <= 40 && idx < 10)
              return (
                <View style={[style.services]}>
                  <Text style={[style.servicesText]}>{el}</Text>
                </View>
              );
          });
    const hotelServices =
      this.state.hotel === null
        ? null
        : this.state.hotel.hotelFacilitiesArray.map((el, idx) => {
            if (el.length <= 40 && idx < 10)
              return (
                <View style={style.services}>
                  <Text style={style.servicesText}>{el}</Text>
                </View>
              );
          });
    const block =
      this.state.hotel === null ?  <Indicator /> : (
          <View>
              <Header  navigation = {this.props.navigation} title = {this.state.hotel.propertyName} goBack = {true}/>

          {this.state.loading ? <Indicator /> :
        <ScrollView style={style.container}>
          <View>
            {images}
            <View style={style.imageIcon}>
              <Feather name="image" size={25} color="#fff" />
              <Text style={{ color: "#fff", fontSize: 16 }}>
                {" " + this.state.hotel.coverImage.length}
              </Text>
            </View>
          </View>
          <View style={style.hotelMenuBar}>
            <RatingCard rating={this.state.hotel.rating} />
            <View style={style.menuBlock}>
              <Text style={style.colorWhite}>
                {this.state.hotel.hotelStarRating.toUpperCase()}
              </Text>
              <FontAwesome
                name="hotel"
                size={25}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
            </View>
          </View>
          <Text style={style.headingTwo}>{address}</Text>
          <View style={style.priceContainer}>
            {this.getPriceBlock(
              this.state.hotel.amount - this.state.hotel.discount,
              "rgb(18, 176, 0)",
              false
            )}
            {this.getPriceBlock(
              this.state.hotel.amount,
              "rgb(255, 179, 0)",
              true
            )}
          </View>
          <Text style={style.headingOne}>Room Facilities</Text>
          <View style={style.serviceContainer}>{roomServices}</View>
          <Text style={style.headingOne}>Hotel Facilities</Text>
          <View style={style.serviceContainer}>{hotelServices}</View>
          <Text style={style.headingOne}>About Hotel</Text>
          <Text style={style.desc}>{this.state.hotel.hotelDescription}</Text>
          <View style = {{backgroundColor : "rgba(255, 149, 36,0.3)", padding : 10}}> 
          <Text style={style.headingOne}>Find Availability</Text>
          <View style={style.validate}>
            <Input
              placeholder="Rooms"
              leftIcon={<FontAwesome name="hotel" size={25} />}
              inputStyle={{ marginLeft: 15, fontSize: 15 }}
              keyboardType="numeric"
              inputContainerStyle={{
                borderBottomWidth: 0,
                paddingLeft: 10,
                borderRadius: 5,
                width: "100%",
                backgroundColor : "#fff",
                elevation : 2
              }}
              value={this.state.room}
              onChange={(event) => {
                this.setState({
                  room: parseInt(event.nativeEvent.text),
                  vaccant: false,
                  roomAvailable: false,
                  roomsAvailable: [],
                  booleanSelected : [],
                  payment : 0
                });
              }}
            />
            <DatePicker
              date={this.state.checkIn}
              format="DD-MM-YYYY"
              minDate={new Date(Date.now())}
              placeholder="Check In"
              customStyles={{
                dateIcon: {
                  // position: "absolute",
                  // left: 0,
                  // top: 4,
                 
                },
                dateText: {
                  fontSize: 15,
                  color : "#444"
                },
                dateInput: {
                  height: 50,
                  borderWidth : 0,
                  borderRadius: 10,
                  backgroundColor : "#fff",
                  elevation : 2,
                
                },
                placeholderText: {
                  textAlign: "left",
                  fontSize: 15,
                  color : "#444"
                },
                
              }}
              style={{ width: "47%", marginLeft: 10,height : 50}}
              onDateChange={(date) => {
                this.setState({
                  checkIn: date,
                  vaccant: false,
                  roomAvailable: false,
                  roomsAvailable: [],
                  booleanSelected : [],
                  payment : 0
                });
              }}
              
            />
            <DatePicker
              date={this.state.checkOut}
              format="DD-MM-YYYY"
              minDate={new Date(Date.now())}
              placeholder="Check Out"
              customStyles={{
                dateIcon: {
                  // position: "absolute",
                  // left: 0,
                  // top: 4,
                },
                dateText: {
                  fontSize: 15,
                  borderWidth: 0,
                  color : "#444"
                },
                dateInput: {
                  height: 50,
                  borderWidth : 0,
                  borderRadius: 10,
                  backgroundColor : "#fff",
                  elevation : 2
                },
                placeholderText: {
                  textAlign: "left",
                  fontSize: 15,
                  color :"#444"
                },
              }}
              onDateChange={(date) => {
                this.setState({
                  checkOut: date,
                  vaccant: false,
                  roomAvailable: false,
                  roomsAvailable: [],
                  booleanSelected : [],
                  payment : 0
                });
              }}
              style={{ width: "47%", marginBottom: 25 }}
            />
            {this.state.roomAvailable ? <View
              style = {{display : "flex",
              flexDirection : "row",
              flexWrap : "wrap",
              justifyContent : "space-between",
              alignItems :"center",
              width: "100%",
              padding : 5
              }}
            >
            {this.getListOfRooms()} 
            </View>: null}
            <Text style = {{marginLeft : 10, marginBottom : 20,fontWeight : "700",color : "#444",fontSize : 18}}>Total amount Rs {this.state.payment}</Text>
            <Button
              icon={
                this.state.roomSelected.length === this.state.room && this.state.vaccant ? (
                  <Feather
                    name="check-circle"
                    color="#fff"
                    size={25}
                    style={{ marginLeft: 10 }}
                  />
                ) : null
              }
              iconRight
              title={this.state.vaccant ? this.state.roomSelected.length === this.state.room ? "Book Now" : "Select Room" : "Check"}
              containerStyle={{ width: "97%", marginLeft: 10, borderRadius: 40 }}
              buttonStyle={{ height: 50 ,backgroundColor : "rgba(255, 98, 36, 0.8)",borderRadius : 40}}
              onPress={this.checkAvailability}
            />
            <Input
              placeholder="Have Coupon"
              leftIcon={<MaterialIcons name="local-offer" size={25} />}
              inputStyle={{ marginLeft: 15, fontSize: 15 }}
              inputContainerStyle={{
                borderWidth: 0,
                paddingLeft: 10,
                borderRadius: 5,
                width: "103%",
                marginTop : 20,
                backgroundColor : "#fff",
                elevation : 2
              }}
              value={this.state.cupon}
              onChange={(event) => {
                let dt = event.nativeEvent.text;
                this.setState({
                  ...this.state,
                  cupon : dt,
                  vaccant: false,
                  isValidCupon : null
                });
              }}
            />
            {this.state.roomSelected.length === this.state.room && this.state.isValidCupon ? 
              <Button
               icon={
                 (
                  <Feather
                    name="check-circle"
                    color="#fff"
                    size={25}
                    style={{ marginLeft: 10 }}
                  />
                )
              }
              iconRight
              title= {"Rs " + this.state.cupon.split('-').pop() + " off "}
              containerStyle={{ width: "97%", marginLeft: 10, borderRadius: 40 }}
              buttonStyle={{ height: 50 ,backgroundColor : "rgba(255, 98, 36, 0.8)",borderRadius : 40}}
            
            />
              :
              this.state.isValidCupon === null ? 
              <Button
             
              iconRight
              title= "Validate"
              containerStyle={{ width: "97%", marginLeft: 10, borderRadius: 40 }}
              buttonStyle={{ height: 50 ,backgroundColor : "rgba(255, 98, 36, 0.8)",borderRadius : 40}}
              onPress = {this.validateCupon}
            />
            :
            <Button
             
              iconRight
              title= "Invalid Coupon"
              containerStyle={{ width: "97%", marginLeft: 10, borderRadius: 40 }}
              buttonStyle={{ height: 50 ,backgroundColor : "rgba(255, 98, 36, 0.8)",borderRadius : 40}}
              style = {{backgroundColor : "rgba(255, 98, 36, 0.8)"}}
              onPress = {this.validateCupon}
            />
            }
          </View>
          </View>
          <Text style={style.headingOne}>User Rating</Text>
          <RatingBox
            data={{
              rating: this.state.hotel.rating,
              ratingOne: this.state.hotel.ratingOne,
              ratingTwo: this.state.hotel.ratingTwo,
              ratingThree: this.state.hotel.ratingThree,
              ratingFour: this.state.hotel.ratingFour,
              ratingFive: this.state.hotel.ratingFive,
              totalUsers: this.state.hotel.totalUsers,
            }}
          />
           <Text style={style.headingOne}>User Reviews</Text>
          <RatingContainer reviews = {this.state.reviews}/>

        </ScrollView>}
        </View>
      );
    return block;
  }
}

const style = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom : 20,
    position : "relative"
  },
  hotelDetails: {
    paddingLeft: 120,
    paddingRight: 10,
    paddingTop: 20,
  },
  headingOne: {
    color: "#f07532",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    fontWeight : "700"
  },
  headingTwo: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "100",
    fontStyle: "italic",
  },
  imageIcon: {
    position: "absolute",
    bottom: 10,
    left: 10,
    display: "flex",
    flexDirection: "row",
  },
  services: {
    height: 40,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor : "#fff",
    elevation : 1.5,
    flexGrow: 1,
    marginRight: 4,
    marginLeft: 4,
    marginBottom: 8,
    padding: 8,
  },
  serviceContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding : 10
  },
  servicesText: {
    textAlign: "center",
    color: "#f07532",
  },
  hotelMenuBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menuBlock: {
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f07532",
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
  },
  colorWhite: {
    color: "#fff",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  priceBlock: {
    display: "flex",
    flexDirection: "row",
    marginRight: 20,
    alignItems: "center",
  },
  desc: {
    fontSize: 15,
    textAlign: "justify",
  },
  validate: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    justifyContent: "space-between",
    padding: 4,
  },
  selectedStyle : {
    backgroundColor : "rgba(255, 149, 36,1)",
    color : "#fff"
  }
});
export default FullPageScreen;
