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
  ["Delhi",require('../Assets/images/delhi.jpg')],
  ["Mumbai",require('../Assets/images/mumbai.jpg')],
  ["Jaipur",require('../Assets/images/jaipur.jpg')],
  ["Kolkata",require('../Assets/images/kolkata.jpg')],
  ["Goa",require('../Assets/images/goa.jpg')],
  ["Shimla",require('../Assets/images/shimla.jpg')],
  ["Agra",require('../Assets/images/agra.jpg')],
  ["Udaipur",require('../Assets/images/udaipur.jpg')],
  ["Banglore",require('../Assets/images/banglore.jpg')],
  ["Ghaziabad",require('../Assets/images/ghaziabad.jpg')],
  ["Hyderabad",require('../Assets/images/hyderabad.jpg')],
  ["Kanpur",require('../Assets/images/kanpur.jpg')],
  ["Dalhousie",require('../Assets/images/dalhousie.jpg')],
  ["Chandigarh",require('../Assets/images/chandigarh.jpg')],
  ["Havelock Island",require('../Assets/images/havelockisland.jpeg')],


]


class SearchScreen extends React.Component {
  state = {
    cities: [],
    suggestionCities: [],
    currentValue: "",
    searchResult: [],
    loader : false,
    loading : false
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
    console.log("hi");
    
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
    let queryString = `?minPrice=${0}&maxPrice=${20000}&minRating=${0}&maxRating=${5}&minRange=${0}&maxRange=${100}&sortPrice=${1}&sortRating=${-1}&lat=${null}&lng=${null}&city=${
      city || this.state.currentValue
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
          city : city || this.state.currentValue
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
          icon = {<Image source = {el[1]}

            style = {{width : "100%",flex:1}}
          />}
          title = {el[0]}
          titleStyle = {{color : "rgba(255, 98, 36, 0.8)" }}
          containerStyle = {{width : "32%",height: 100,
            display : "flex",
            flexDirection : "column",
            justifyContent : "space-between",
            alignItems : "center",
            backgroundColor : "#fff",
            marginVertical : 2,
            elevation : 1,
            
          }}
          buttonStyle = {{
            padding : 0,
            paddingVertical : 2,
            width : "100%",
            height :"100%",
            backgroundColor : "rgba(255,255,255,0)",
            display : "flex",
            flexDirection : "column",
            justifyContent : "space-between",
            alignItems : "center",
            
          }}
          onPress = {() => this.getData(el[0])}
        />
      )
    })

    return (
      <View style = {{position : "relative", flex : 1 }}>
      <Header navigation = {this.props.navigation}/>
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
        <Text style = {{fontWeight : "700" ,fontSize : 18 ,color : "rgba(255, 98, 36, 0.8)"}}>Top Visisted Places</Text>
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
