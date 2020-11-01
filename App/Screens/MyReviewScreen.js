import React, { useState, useEffect } from "react";
import { View, Text ,AsyncStorage ,StyleSheet ,ScrollView} from "react-native";
import { Button} from "react-native-elements";
import Header from '../Components/Header';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import call from "../call";
import PercentageCircle from 'react-native-progress-circle';
import LinearGradient from 'react-native-linear-gradient'
const ReviewScreen = (props) => {
  const [reviews, changeReviews] = useState([]);
  const getReviews = () => {
    AsyncStorage.getItem("jwt")
    .then((result) => {
      call({
        method: "GET",
        url: "/me",
        data: {
          jwt: result,
        },
        withCredentials: true,
      })
        .then((res) => {
  
          changeReviews(res.data.myReviews);
        })
        .catch((err) => {});
    })
    .catch((err) => {});
  }
  useEffect(() => {
   getReviews();
  }, []);

  const deletePost = (id) => {
    AsyncStorage.getItem("jwt")
      .then((result) => {
        call({
          method: "DELETE",
          url: "/delete-review",
          data: {
            jwt: result,
            reviewId : id
          },
          withCredentials: true,
        })
          .then((res) => {
            getReviews();
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  }

 const getColor = (rating) => {
    if(rating > 4){
      return "#11b840"
    }else if(rating > 3){
      return "#aab811"
    }else if(rating > 2){
      return "#fccb05"
    }else if(rating > 1){
      return "#fc8505"
    }else{
      return "#fc3b05"
    }
  }

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
        if(rating > i) stars.push(<AntDesign name="star" size={20} color={myColor} key = {i} />);
        else stars.push(<AntDesign name="star" size={20} color={defaultColor} key = {i}/>);
    }
    return stars;
  }

  const block = reviews.map((el, idx) => {

    return (
      <View style = {style.reviewBox} key = {idx}>
      <View style = {{display : "flex",flexDirection : "row",justifyContent : "space-between",alignItems :"center"}}>
        <Text style = {{fontSize : 18,fontWeight : "700"}}>Hotel ID {el.hotelId}</Text>
        <View style = {{display : "flex",flexDirection : "row",justifyContent : "center",alignItems :"center"}}>
        {getStart(el.overallRating)}

        </View>
      </View>
        <Text>{el.hotelDetails}</Text>
        <Text style = {{textAlign : "justify",borderBottomWidth : 1,borderColor : "#ddd"}}>{el.text}</Text>
        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",
        justifyContent : "space-between" ,marginTop : 20}}
        >
                <View style = {{alignItems : "center",width : "24%"}}>

        <PercentageCircle 
            percent={(el.ratingFields.satisfied / 5) * 100}
            radius={25}
            borderWidth={6}
            color={getColor(el.ratingFields.satisfied)}
            children = {<Text>{el.ratingFields.satisfied}</Text>}
            shadowColor="#ddd"
            bgColor="#fff"
        />
        <Text>Satisfactory</Text>
        </View>
        <View style = {{alignItems : "center",width : "24%"}}>

         <PercentageCircle 
            percent={(el.ratingFields.valueForMoney / 5) * 100}
            radius={25}
            borderWidth={6}
            color={getColor(el.ratingFields.valueForMoney)}
            shadowColor="#ddd"
            bgColor="rgba(255,255,255,1)"
            children = {<Text>{el.ratingFields.valueForMoney}</Text>}
            containerStyle = {{paddingLeft :10}}
        />
          <Text style = {{alignItems : "center",textAlign :"center"}}>Value For Money</Text>
        </View>
        <View style = {{alignItems : "center",width : "24%"}}>

         <PercentageCircle 
            percent={(el.ratingFields.conditions / 5) * 100}
            radius={25}
            borderWidth={6}
            color={getColor(el.ratingFields.conditions)}
            shadowColor="#ddd"
            bgColor="#fff"
            children = {<Text>{el.ratingFields.conditions}</Text>}
        />

        <Text style = {{alignItems : "center",textAlign :"center"}}>Condition</Text>
        </View>
        <View style = {{alignItems : "center",width : "24%"}}>

         <PercentageCircle 
            percent={(el.ratingFields.service / 5) * 100}
            radius={25}
            borderWidth={6}
            color={getColor(el.ratingFields.service)}
            children = {<Text>{el.ratingFields.service}</Text>}
            shadowColor="#ddd"
            bgColor="#fff"
        />
        <Text style = {{alignItems : "center",textAlign :"center"}}>Service</Text>

        </View>
            {/* <Text style = {style.ratingBox}>Satisfied {"\n" + el.ratingFields.satisfied}</Text> */}
            {/* <Text style = {style.ratingBox}>Value For Money{"\n" + el.ratingFields.valueForMoney}</Text>
            <Text style = {style.ratingBox}>Condition{"\n" + el.ratingFields.conditions}</Text>
            <Text style = {style.ratingBox}>Service{"\n" + el.ratingFields.service}</Text> */}
        </View>
        <Button 
              title = "Delete Feedback"
              titleStyle = {{color : "#fff"}}
              buttonStyle = {{backgroundColor : "rgba(255,255,255,0)"}}
              containerStyle = {{marginVertical : 10}}
              ViewComponent = {LinearGradient}
              onPress = {() => {deletePost(el._id)}}
              linearGradientProps = {{
                colors:["rgba(252, 182, 3, 0.7)"  , "rgba(255, 149, 36,0.9)"],
                start : {x : 0, y : 0},
                end : {x : 1, y : 0}
              }}
            />
     
      </View>
    );
  });
  return (
    <View>
        <Header  navigation = {props.navigation} title = "My Reviews"/>
      <ScrollView style = {{margin : 10}}>
        {reviews.length === 0 ? <Text style = {{flex : 1,textAlign : "center"}}>No Review Found</Text> : block}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
    reviewBox : {
        borderWidth : 0,
        padding : 10,
        borderRadius : 10,
        marginVertical : 2,
        backgroundColor : "#fff",
        elevation : 1
    },
    ratingBox : {
      borderWidth : 1,
      borderColor : "green",
      padding : 10,
      borderRadius : 10,
      textAlign : "center",
      flex : 1,
      marginRight : 4
    }
})

export default ReviewScreen;
