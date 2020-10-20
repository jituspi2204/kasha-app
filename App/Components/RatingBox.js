import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RatingBox = (props) => {
  if(props.data.totalUsers === 0){
      props.data.totalUsers = 1;
  }
  const data = props.data;
  const one = Math.floor((data.ratingOne / data.totalUsers) * 100);
  const two = Math.floor((data.ratingTwo / data.totalUsers) * 100);
  const three = Math.floor((data.ratingThree / data.totalUsers) * 100);
  const four = Math.floor((data.ratingFour/ data.totalUsers) * 100);
  const five = Math.floor((data.ratingFive / data.totalUsers) * 100);

  const getStart = (rating) => {
    let defaultColor = "#999";
    let myColor;
    if(rating > 4){
        myColor = "rgb(20, 173, 0)"
    }else if(rating > 3){
        myColor = "rgb(174, 255, 0)"
    }else if(rating > 2){
        myColor = "rgb(255, 183, 0)"
    }else if(rating > 1){
        myColor = "rgb(255, 77, 0)"
    }else{
        myColor = "red"
    }
    let stars = [];
    for(let i = 0 ;i < 5 ;i++){
        if(rating > i) stars.push(<Feather name = "star" size = {20} color = {myColor} key = {i} style = {{elevation : 2}}/>);
        else stars.push(<Feather name = "star" size = {20} color = {defaultColor} key = {i}/>);
    }
    return stars;
  }

  return (
    <View style={style.container}>
      <View style={style.left}>
          <Text style = {style.ratingText}>
                {data.rating}
          </Text>
          <View style = {style.overallStars}>
                {getStart(data.rating)}
          </View>
          <Text style = {style.totalUsersRated}>Total user rated { 1}</Text>

      </View>
      <View style={style.right}>
        <View style={style.barBox}>

          <View style={style.bars}>
            <FontAwesome name="star" size={15} color="#aaa" style={style.stars} />
            <Text style={style.percentage}>{five + "%"}</Text>
            <View style={[style.ratingBar, {width : five + "%" ,backgroundColor : "rgb(20,173,0)"}]}></View>
          </View>
          <View style={style.bars}>
            <FontAwesome name="star" size={15} color="#aaa" style={style.stars} />
            <Text style={style.percentage}>{four + "%"}</Text>
            <View style={[style.ratingBar, {width : four + "%" ,backgroundColor : "rgb(174,255,0)"}]}></View>
          </View>
          <View style={style.bars}>
            <FontAwesome name="star" size={15} color="#aaa" style={style.stars} />
            <Text style={style.percentage}>{three + "%"}</Text>
            <View style={[style.ratingBar, {width : three + "%" , backgroundColor : "rgb(255, 183,0)"}]}></View>
          </View>
          <View style={style.bars}>
            <FontAwesome name="star" size={15} color="#aaa" style={style.stars} />
            <Text style={style.percentage}>{two + "%"}</Text>
            <View style={[style.ratingBar, {width : two + "%" , backgroundColor : "rgb(255, 77, 0)"}]}></View>
          </View>
          <View style={style.bars}>
            <FontAwesome name="star" size={15} color="#aaa" style={style.stars} />
            <Text style={style.percentage}>{one + "%"}</Text>
            <View style={[style.ratingBar, {width : one + "%" , backgroundColor : "red",}]}></View>
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    paddingTop : 20,
    paddingBottom : 20,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius : 10,
    backgroundColor : "#fff",
    elevation : 2
    
  },
  left: {
    width: "40%",
  },
  right: {
    width: "40%",
  },
  bars: {
    position: "relative",
    height: 10,
    width: "100%",
    backgroundColor: "#aaa",
    marginBottom : 8,
    borderRadius : 10,
    elevation : 2,
  },
  barBox : {
      display : "flex",
      flexDirection : "column",
      justifyContent : "center",
      alignItems : "center"
  },
  stars: {
    position: "absolute",
    top: -5,
    left: -60,
  },
  percentage: {
    position: "absolute",
    top: -5,
    left: -40,
    fontSize : 12
  },
  ratingBar : {
      position : "absolute",
      top: 0,
      left: 0,
      height : 10,
      borderRadius : 10
  },
  overallStars : {
      display : "flex",
      flexDirection : "row",
      justifyContent : "center",
      alignItems : "center",
  },
  ratingText : {
    textAlign : "center",
    fontSize : 25
  },
  totalUsersRated : {
      fontSize : 10,
      textAlign : "center"
  }

});

export default RatingBox;
