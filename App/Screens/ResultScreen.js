import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Input, ListItem ,CheckBox} from "react-native-elements";
import Feather from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import call from "../call";
import HotelCard from "../Components/HotelCard";
import LinearGradient from 'react-native-linear-gradient';
import Header from "../Components/Header";
import RangeSlider from 'rn-range-slider';
import { color } from "react-native-reanimated";

const ResultScreen = (props) => {
  const [pages, setPages] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [sort , toggleSort] = useState(false);
  const [filter , toggleFilter] = useState(false);
  const [data , chagneData] = useState({
    range : {
      min : 0,
      max : 100
    },
    rating : {
      min : 0,
      max : 5
    },
    price : {
      min : 500,
      max : 20000
    },

  })
  console.log(data.price.max);
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
                <FontAwesome name="rupee" size={18} color = "#444" style = {{alignSelf : "center"}} />
                <Text style = {style.label}>Price</Text>
            </View>
            <Text style = {[style.label ,{fontSize : 14 , marginLeft : 20}]}>Low To High</Text>
            <CheckBox 
                size = {20}
                checkedColor = "#fcb103"
                uncheckedColor = "#fcb103"
                checked = {sortState.price}
            />
             <Text style = {[style.label ,{fontSize : 14 , marginLeft : 10}]}>High To Low</Text>
            <CheckBox 
                size = {20}
                checkedColor = "#fcb103"
                uncheckedColor = "#fcb103"
                checked = {!sortState.price}
            />
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPressIn = {() => sortItemChagned('rating')}>
        <View style = {style.iconBox}>
            <View>
                <Feather name = "star" size = {18} color = "#444" style = {{alignSelf : "center"}}/>
                <Text style = {style.label}>Rating</Text>
            </View>
            <Text  style = {[style.label ,{fontSize : 14 , marginLeft : 20}]}>Low To High</Text>
            <CheckBox 
                size = {20}
                checkedColor = "#fcb103"
                uncheckedColor = "#fcb103"
                checked = {sortState.rating}
            />
             <Text  style = {[style.label ,{fontSize : 14 , marginLeft : 20}]}>High To Low</Text>
             <CheckBox 
                size = {20}
                checkedColor = "#fcb103"
                uncheckedColor = "#fcb103"
                checked = {!sortState.rating}
            />
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPressIn = {() => sortItemChagned('range')}>
        <View style = {style.iconBox}>
            <View>
                <SimpleLineIcons name = "location-pin" size = {18} color = "#444" style = {{alignSelf : "center"}}/>
                <Text style = {style.label}>Range</Text>
            </View>
            <Text  style = {[style.label ,{fontSize : 14 , marginLeft : 20}]}>Low To High</Text>
            <CheckBox 
                size = {20}
                checkedColor = "#fcb103"
                uncheckedColor = "#fcb103"
                checked = {sortState.range}
            />
             <Text  style = {[style.label ,{fontSize : 14 , marginLeft : 20}]}>High To Low</Text>
             <CheckBox 
                size = {20}
                checkedColor = "#fcb103"
                uncheckedColor = "#fcb103"
                checked = {!sortState.range}
            />
            
        </View>
    </TouchableOpacity>
   
</View>
  );
  
    const filterBlock = (
      <View style = {style.sortContainer}>
    <Text style = {{marginBottom : 10 , fontSize : 16, marginTop : 5 ,color : "#fff"}}>Sort By</Text>
    <TouchableOpacity onPressIn = {() => sortItemChagned('price')}>
        <View style = {style.iconBox}>
            <View>
                <FontAwesome name="rupee" size={18} color = "#444" style = {{alignSelf : "center"}} />
                <Text style = {style.label}>Price</Text>
            </View>
            <RangeSlider
              style = {{width : "85%" , height : 80, marginLeft : 10}}
              max = {20000}
              min = {500}
              step = {10}
              blankColor = "#ddd"
              selectionColor = "#fcb103"
              lineWidth = {4}
              labelBackgroundColor = "#fff"
              labelBorderWidth = {0}
              labelTextColor = "#444"
              thumbColor = "#fc8803"
              thumbBorderWidth = {0}
              onValueChanged = {(min , max) => {
                chagneData({
                  ...data,
                  price :{
                    min,
                    max
                  }
                })
              }}
            />

        </View>
    </TouchableOpacity>
    <TouchableOpacity onPressIn = {() => sortItemChagned('rating')}>
        <View style = {style.iconBox}>
            <View>
                <Feather name = "star" size = {18} color = "#444" style = {{alignSelf : "center"}}/>
                <Text style = {style.label}>Rating</Text>
            </View>
            <RangeSlider
              style = {{width : "85%" , height : 80, marginLeft : 10}}
              max = {5}
              min = {0}
              step = {1}
              blankColor = "#ddd"
              selectionColor = "#fcb103"
              lineWidth = {4}
              labelBackgroundColor = "#fff"
              labelBorderWidth = {0}
              labelTextColor = "#444"
              gravity = {'center'}
              thumbColor = "#fc8803"
              thumbBorderWidth = {0}
              onValueChanged = {(min , max) => {
                chagneData({
                  ...data,
                  rating :{
                    min,
                    max
                  }
                })
              }}

            />
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPressIn = {() => sortItemChagned('range')}>
        <View style = {style.iconBox}>
            <View>
                <SimpleLineIcons name = "location-pin" size = {18} color = "#444" style = {{alignSelf : "center"}}/>
                <Text style = {style.label}>Range</Text>
            </View>
            <RangeSlider
              style = {{width : "85%" , height : 80, marginLeft : 10}}
              max = {100}
              min = {0}
              step = {1}
              blankColor = "#ddd"
              selectionColor = "#fcb103"
              lineWidth = {4}
              labelBackgroundColor = "#fff"
              labelBorderWidth = {0}
              labelTextColor = "#444"
              thumbColor = "#fc8803"
              thumbBorderWidth = {0}
              onValueChanged = {(min , max) => {
                chagneData({
                  ...data,
                  range :{
                    min,
                    max
                  }
                })
              }}
            />
            
        </View>
    </TouchableOpacity>
  </View>
    )

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
        colors = {["rgba(252, 182, 3, 0)"  , "rgba(255, 149, 36,0)", ]}
        start = {{x : 0, y : 0}}
        end = {{x : 0 , y : 1}}
        style = {style.gradientContainer}
      >
    <Header  navigation = {props.navigation} title = {props.route.params.city} goBack = {true}/>
    <LinearGradient
                    colors = {["rgba(252, 182, 3, 0)"  , "rgba(255, 149, 36,0)" ]}
                    start = {{x : 0, y : 0}}
                    end = {{x : 1 , y : 0}}
     style = {style.bottomButtons}>
        <TouchableOpacity onPress = {() => {toggleFilter(!filter)}}>
            <View style = {style.iconContainer}>
                <Feather name = "filter" size = {18} color = "#444" style = {{alignSelf : "center"}}/>
                <Text style = {[style.label,{color : "#444"}]}>Filter</Text>
            </View>
            
        </TouchableOpacity>
        <TouchableOpacity onPress = {toggleSortBlock}>
            <View style = {style.iconContainer}>
               <SimpleLineIcons name = "equalizer" size = {18} color = "#444" style = {{alignSelf : "center"}}/>
                <Text style = {[style.label,{color : "#444"}]}>Sort</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style = {style.iconContainer}>
               <AntDesign name = "arrowright" size = {18} color = "#444" style = {{alignSelf : "center"}}/>
                <Text style = {[style.label,{color: "#444"}]}>Apply</Text>
            </View>
        </TouchableOpacity>
    </LinearGradient>
    {filter ? filterBlock : null}
    {sort ? sortBlock : null}
    <ScrollView style={[style.listStyle]} onScroll={scrolled}>
      {searchResult.length === 0 ? <Text style = {{width : "100%",padding: 0, textAlign : "center",fontSize : 15}}>Sorry, No Hotel Found</Text>: hotelList}
      
    </ScrollView>
    </LinearGradient>
   
    
    </View>
  );
};

const style = StyleSheet.create({
  listStyle: {
    marginTop: 2,
    paddingLeft: "1%",
    paddingRight: "1%",
    paddingVertical : 2
  },
  bottomButtons : {
      // position : "absolute",
      // bottom : 0,
      // left : 0,
      display : "flex",
      flexDirection: "row",
      justifyContent : "space-around",
      alignItems: "center",
      width : "100%",
      padding : 8,
      backgroundColor : "#fff"
  },
  label : {
      fontSize : 14,
      color :'#444'
  },
  iconContainer : {
    
  },
  sortContainer : {
      position : "absolute",
      top : 135,
      zIndex : 5000,
      left : 0,
      width : "100%",
      display : "flex" ,
      flexDirection : "column",
      justifyContent : "flex-start",
      alignItems:  "flex-start",
      backgroundColor :  "#fff",
      borderRadius : 0,
      paddingLeft : 10,
      margin : "0%"
  },
  iconBox :{
    display :"flex",
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "center",
    marginBottom : 15,
    borderBottomWidth : 1,
    borderColor : "#ddd",
    width : "100%"
  },

});


export default ResultScreen;
