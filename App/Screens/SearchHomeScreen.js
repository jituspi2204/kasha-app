import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity, ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import { Input, ListItem ,Button} from "react-native-elements";
import call from "../call";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from "../Components/Header";


const cities = [
  ["Delhi",require('../Assets/images/delhi.jpg'),"New Delhi, India"],
  ["Mumbai",require('../Assets/images/mumbai.jpg'), "Maharashtra, India"],
  ["Jaipur",require('../Assets/images/jaipur.jpg'), "Rajasthan,India"],
  ["Kolkata",require('../Assets/images/kolkata.jpg'),"West Bengal, India"],
  ["Goa",require('../Assets/images/goa.jpg'), "Goa, India"],
  ["Shimla",require('../Assets/images/shimla.jpg') , "Himachal Pradesh, India"],
  ["Agra",require('../Assets/images/agra.jpg'), "Uttar Pradesh, India"],
  ["Udaipur",require('../Assets/images/udaipur.jpg'), "Rajasthan, India"],
  ["Banglore",require('../Assets/images/banglore.jpg'), "Karnataka, India"],
  ["Ghaziabad",require('../Assets/images/ghaziabad.jpg'), "Uttar Pradesh , India"],
  ["Hyderabad",require('../Assets/images/hyderabad.jpg'), "Andhra Pradesh , India"],
  ["Kanpur",require('../Assets/images/kanpur.jpg') , "Uttar Pradesh, India"],
  ["Dalhousie",require('../Assets/images/dalhousie.jpg'), "Himachal Pradesh, India"],
  ["Chandigarh",require('../Assets/images/chandigarh.jpg'),"Chandigarh, India"],
  ["Havelock Island",require('../Assets/images/havelockisland.jpeg'), "Andaman and Nicobar Island , India"],


]


class SearchScreen extends React.Component {
  state = {
    cities: [],
    suggestionCities: [],
    currentValue: "",
    searchResult: [],
    loader : false,
    loading : false,
    currentLocation : false,
    lat : 28.7041,
    lng :  77.1025
  };
  componentDidMount() {
    call({
      method: "get",
      url: "/api/v1/cities",
    })
      .then((res) => {
        console.log(res.data.result);
        this.setState({
          ...this.state,
          cities: [...res.data.result],
        });
      })
      .catch((err) => {});
  }

  getGeolocation = () => {
    
    
  }

  giveSuggestion = (event) => {
    if (event.nativeEvent.text === "") {
      this.setState({
        ...this.state,
        suggestionCities: [],
        currentValue: "",
      });
      return;
    }
    const value = event.nativeEvent.text;
    const reg = new RegExp("^" + event.nativeEvent.text);
    console.log(value , reg);
    const result = this.state.cities.filter((el) => {
      return reg.test(el);
    });
    this.setState({
      ...this.state,
      suggestionCities: result,
      currentValue: value,
    });
  };

  setValue = (event) => {
    this.setState({
      currentValue: event._dispatchInstances.memoizedProps.children,
      suggestionCities: [],
    });
  };

  getData = (city) => {
    this.setState({
      loader : true,
      loading : true
    })
    console.log("Result - > ", this.state.currentValue);
    let queryString = `?minPrice=${0}&maxPrice=${20000}&minRating=${0}&maxRating=${5}&minRange=${0}&maxRange=${100}&sortPrice=${1}&sortRating=${-1}&lat=${this.state.currentLocation ? this.state.lat : null}&lng=${this.state.currentLocation ? this.state.lng : null}&city=${
      !this.state.currentLocation ? city || this.state.currentValue : null
    }&rooms=${0}`;
    call({
      method: "get",
      url: "/api/v1/hotels" + queryString,
    })
    .then((res) => {
        console.log(res.data);
      this.setState({
        ...this.state,
        searchResult: res.data.result,
        loader : false,
        loading :false
      });
      this.props.navigation.navigate({
        name : 'result' ,
        params : {
          searchResult : res.data.result,
          city : !this.state.currentLocation ? city || this.state.currentValue : "Near You"
        }
      });
    })
    .catch((err) => {
      this.setState({
        loader : false,
        loading :false
      })
    });

  };

  render() {
    const list = this.state.suggestionCities.map((el, idx) => {
      return (
        <TouchableOpacity key = {idx}><Text key={idx} style={style.listItemStyle} onPress={this.setValue}>
          {el}
        </Text>
        </TouchableOpacity>
      );
    });


    const suggestionList = cities.map((el ,idx) => {
      return(
        <Button 
          icon = {
          <View style = {{display : "flex",width : "100%",flexDirection : "row",alignItems : "center",justifyContent : "flex-start",borderBottomWidth : 1,borderColor : "#ddd"}}>
          <Image source = {el[1]}

            style = {{width : 50,height : 50,borderRadius: 5}}
          />
          <Text style = {{color : "#444",fontSize : 16,fontWeight : "300"}}> {  "  " +el[0] + ", " + el[2]}</Text>
          </View>
          }
          titleStyle = {{color : "#444",fontSize : 18,fontWeight : "400"}}
          containerStyle = {{width : "100%",height: 60,
            display : "flex",
            flexDirection : "column",
            justifyContent : "flex-start",
            alignItems : "center",
            marginVertical : 0,
        
          }}
          buttonStyle = {{
            padding : 0,
            paddingVertical : 2,
            width : "100%",
            height :"100%",
            backgroundColor : "rgba(255,255,255,0)",
            display : "flex",
            flexDirection : "row",
            justifyContent : "flex-start",
            alignItems : "center",
            
          }}
          onPress = {() => this.getData(el[0])}
        />
      )
    })

    return (
      <View style = {{position : "relative", flex : 1 }}>
      <Header navigation = {this.props.navigation} title = "Search your Destination"/>
      {this.state.loader ? null : null}
        <Input
          autoFocus 
          onChange={this.giveSuggestion}
          value={this.state.currentValue}
          placeholder="Where are you"
          rightIcon={<TouchableOpacity style = {{display : "flex" , flexDirection : "row"}}>
          {/* <MaterialIcons name="my-location" size = {25} style = {{marginRight : 10}} onPress ={this.getGeolocation}/> */}
          {this.state.loading ? <ActivityIndicator color = "rgba(255, 98, 36, 1)" size = {30} /> : <Feather name="search" size={25} onPress={() => {this.setState({loading : true});this.getData()}} /> }
          </TouchableOpacity>}
          inputStyle={{
            padding: 10,
          }}
          inputContainerStyle={{
            marginTop: 10,
            borderBottomWidth: 0,
            borderRadius: 8,
            backgroundColor  :"#fff",
            elevation  :1.5
          }}
          onFocus={() => {
            this.setState({
              ...this.state,
              searchResult: [],
            });
          }}
        />
        <ScrollView style={style.listStyle}>{list}
        <Button 
            title = {!this.state.currentLocation ? "Use my location" : "Searching Near You"}
            icon = {<MaterialIcons name="my-location" size={24} color={this.state.currentLocation ? "#036ffc":  "#444"} />}
            iconRight  = {true}
            buttonStyle = {{backgroundColor : "rgba(255,255,255,1)",
                          alignItems : "center",
                          display : "flex",
                          flexDirection : "row",
                          justifyContent : "space-between",
                          padding : 10,
                          marginBottom : 10,
                      
            }}
            titleStyle = {{color : "#777"}}
            onPress = {() => {this.setState({
              currentLocation : !this.state.currentLocation
            })
            this.getData()
            }}
        />
        <Text style = {{fontWeight : "700" ,fontSize : 18 ,color : "#555"}}>Recommended Places</Text>
          <View style = {{display :"flex",flexDirection : "row",
          padding: 4,justifyContent : "space-between",alignItems : "center",flexWrap  :"wrap"}}>
            {suggestionList}
          </View>
        
        </ScrollView>
      </View>
    );
  }
}
const style = StyleSheet.create({
  listStyle: {
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  listItemStyle: {
    width: "100%",
    textAlign: "left",
    height: "auto",
    marginBottom: 3,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 4,
    fontSize : 16,
    fontWeight : "300",
    elevation  :1.5
  },
  cityContainer : {
    paddingBottom : 10,
    marginBottom : 10,
     borderBottomWidth : 1,
     borderColor : "#f07532"
   },
   citiyIcon : { 
    height: 50,
    width: 50 ,
    borderRadius : 10,
    marginRight: 10,
    marginLeft : 10,
 },
 cityName :{
   marginTop : 5,
   textAlign : "center",
   color : "#f07532"
 },
});



export default SearchScreen;
