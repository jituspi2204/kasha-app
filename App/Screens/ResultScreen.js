import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Input, ListItem ,CheckBox , Slider } from "react-native-elements";
import Feather from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import call from "../call";
import HotelCard from "../Components/HotelCard";
import LinearGradient from 'react-native-linear-gradient';
import Header from "../Components/Header";

const ResultScreen = (props) => {
  const [pages, setPages] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [sort , toggleSort] = useState(false);

  const [leftSliderValue , changeLeftSliderValue] = useState({
    widthValue : {

    },
    value : 0
  });
  const [rightSliderValue , changeRightSliderValue] = useState({
    widthValue : {

    },
    value : 10000
  });
  const [sortState , changeSortState] = useState({price : false ,rating :false , range : false});
  const searchResult = props.route.params.searchResult;
  console.log(searchResult);

  const leftChanged = (event) => {
    
  }

  const rightChagned = (event) => {

  }

  const startSliding = (id) => {
    if(id === 0){

    }else{

    }
  }

  const stopSliding = (id) => {
    if(id === 0){

    }else{

    }
  }
  const scrolled = (event) => {
    // console.log(event);
    if (
      event.nativeEvent.velocity.y > 0 &&
      event.nativeEvent.contentOffset.y >=
        event.nativeEvent.contentSize.height -
          event.nativeEvent.layoutMeasurement.height -
          1
    ) {
      const pg = pageNo + 1;
      setPageNo(pg);
      return;
    }
    if (event.nativeEvent.velocity.y < 0) {
      const pg = Math.floor(
        (event.nativeEvent.contentSize.height -
          event.nativeEvent.layoutMeasurement.height -
          1) /
          pageNo
      );
      const nowPg = Math.ceil(event.nativeEvent.contentOffset.y / pg);
      if (nowPg >= 1 && pageNo != nowPg) {
        console.log(nowPg);
        setPageNo(nowPg);
      }
    }
  };


  const hotelList = searchResult.map((el, idx) => {
    if (idx < pageNo * 5 && idx >= 0)
      return (
        <View>
        <TouchableOpacity onPress = {() => {props.navigation.navigate({
          name : 'fullpage',
          params : {
            hotelName : el.propertyName,
            hotel : el
          }
        })}}
        key = {idx}
        >
          <HotelCard data={el} />
        </TouchableOpacity>
        </View>
      );
  });
  // const hotelList = null;

  const toggleSortBlock = () => {
      const state = sort;
      toggleSort(!state);
  }
 
  const sortBlock = (
    <View style = {style.sortContainer}>
    <Text style = {{marginBottom : 10 , fontSize : 16, marginTop : 5 ,color : "#fff"}}>Sort By</Text>
    <TouchableOpacity onPressIn = {() => sortItemChagned('price')}>
        <View style = {style.iconBox}>
            <View>
                <FontAwesome name="rupee" size={18} color = "white" style = {{alignSelf : "center"}} />
                <Text style = {style.label}>Price</Text>
            </View>
            <Text style = {[style.label ,{fontSize : 14 , marginLeft : 20}]}>Low To High</Text>
            <CheckBox 
                size = {20}
                checkedColor = "white"
                uncheckedColor = "white"
                checked = {sortState.price}
            />
             <Text style = {[style.label ,{fontSize : 14 , marginLeft : 10}]}>High To Low</Text>
            <CheckBox 
                size = {20}
                checkedColor = "white"
                uncheckedColor = "white"
                checked = {!sortState.price}
            />
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPressIn = {() => sortItemChagned('rating')}>
        <View style = {style.iconBox}>
            <View>
                <Feather name = "star" size = {18} color = "white" style = {{alignSelf : "center"}}/>
                <Text style = {style.label}>Rating</Text>
            </View>
            <Text  style = {[style.label ,{fontSize : 14 , marginLeft : 20}]}>Low To High</Text>
            <CheckBox 
                size = {20}
                checkedColor = "white"
                uncheckedColor = "white"
                checked = {sortState.rating}
            />
             <Text  style = {[style.label ,{fontSize : 14 , marginLeft : 20}]}>High To Low</Text>
             <CheckBox 
                size = {20}
                checkedColor = "white"
                uncheckedColor = "white"
                checked = {!sortState.rating}
            />
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPressIn = {() => sortItemChagned('range')}>
        <View style = {style.iconBox}>
            <View>
                <SimpleLineIcons name = "location-pin" size = {18} color = "white" style = {{alignSelf : "center"}}/>
                <Text style = {style.label}>Range</Text>
            </View>
            <Text  style = {[style.label ,{fontSize : 14 , marginLeft : 20}]}>Low To High</Text>
            <CheckBox 
                size = {20}
                checkedColor = "white"
                uncheckedColor = "white"
                checked = {sortState.range}
            />
             <Text  style = {[style.label ,{fontSize : 14 , marginLeft : 20}]}>High To Low</Text>
             <CheckBox 
                size = {20}
                checkedColor = "white"
                uncheckedColor = "white"
                checked = {!sortState.range}
            />
            
        </View>
    </TouchableOpacity>
   
</View>
  );
  
  const sortItemChagned = (item) =>{
    const range = sortState.range;
    const rating = sortState.rating;
    const price = sortState.price;
    if(item === 'range'){
        changeSortState({
            price,
            rating,
            range : !range
        })
    }else if(item === 'rating'){
        changeSortState({
            price,
            range,
            rating : !rating
        })
    }else if(item === 'price'){
        changeSortState({
            range,
            rating,
            price : !price
        })
    }
  }

  return (
    <View style = {{position : "relative" ,flex : 1}}>
      <LinearGradient
                    colors = {["rgba(255, 98, 36, 0)"  , "rgba(255, 149, 36,0)", ]}
                    start = {{x : 0, y : 0}}
                    end = {{x : 0 , y : 1}}
                    style = {style.gradientContainer}
               >
    <Header  navigation = {props.navigation} title = {props.route.params.city} goBack = {true}/>
    <ScrollView style={style.listStyle} onScroll={scrolled}>
      {searchResult.length === 0 ? <Text style = {{width : "100%",padding: 0, textAlign : "center",fontSize : 15}}>Sorry, No Hotel Found</Text>: hotelList}
      
    </ScrollView>
    </LinearGradient>
    <LinearGradient
                    colors = {["rgba(255, 98, 36, 0.8)"  , "rgba(255, 149, 36,0.8)", ]}
                    start = {{x : 0, y : 0}}
                    end = {{x : 1 , y : 1}}
     style = {style.bottomButtons}>
        <TouchableOpacity>
            <View style = {style.iconContainer}>
                <Feather name = "filter" size = {18} color = "white" style = {{alignSelf : "center"}}/>
                <Text style = {style.label}>Filter</Text>
            </View>
            
        </TouchableOpacity>
        <TouchableOpacity onPress = {toggleSortBlock}>
            <View style = {style.iconContainer}>
               <SimpleLineIcons name = "equalizer" size = {18} color = "white" style = {{alignSelf : "center"}}/>
                <Text style = {style.label}>Sort</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style = {style.iconContainer}>
               <SimpleLineIcons name = "location-pin" size = {18} color = "white" style = {{alignSelf : "center"}}/>
                <Text style = {style.label}>Near Me</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style = {style.iconContainer}>
               <SimpleLineIcons name = "home" size = {18} color = "white" style = {{alignSelf : "center"}}/>
                <Text style = {style.label}>Resort</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style = {style.iconContainer}>
               <FontAwesome name = "hotel" size = {18} color = "white" style = {{alignSelf : "center"}}/>
                <Text style = {style.label}>Hotel</Text>
            </View>
        </TouchableOpacity>
    </LinearGradient>
    {sort ? sortBlock : null}
    </View>
  );
};

const style = StyleSheet.create({
  listStyle: {
    marginTop: 20,
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
    paddingVertical : 10
  },
  bottomButtons : {
      position : "absolute",
      bottom : 0,
      left : 0,
      display : "flex",
      flexDirection: "row",
      justifyContent : "space-evenly",
      alignItems: "center",
      backgroundColor :  "#f07532",
      width : "100%",
      padding : 8,

  },
  label : {
      fontSize : 12,
      color :'#fff'
  },
  iconContainer : {
    
  },
  sortContainer : {
      position : "absolute",
      bottom : 55,
      left : 0,
      width : "98%",
      display : "flex" ,
      flexDirection : "column",
      justifyContent : "flex-start",
      alignItems:  "flex-start",
      backgroundColor :  "rgba(255, 98, 36, 1)"  ,
      borderRadius : 10,
      paddingLeft : 20,
      margin : "1%"
  },
  iconBox :{
    display :"flex",
    flexDirection : "row",
    justifyContent : "flex-start",
    alignItems : "center",
    marginBottom : 15
  },

});


export default ResultScreen;
