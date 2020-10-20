import React, { useState, useEffect } from "react";
import { View, Text ,AsyncStorage ,StyleSheet ,ScrollView} from "react-native";
import { Button} from "react-native-elements";
import Header from '../Components/Header';
import call from "../call";
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

  const block = reviews.map((el, idx) => {
    return (
      <View style = {style.reviewBox} key = {idx}>
      <Text style = {{fontSize : 24}}>Hotel ID {el.hotelId}</Text>
        <Text style = {{textAlign : "justify"}}>{el.text}</Text>
        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",
        justifyContent : "space-between" ,marginTop : 20}}
        >
            <Text style = {style.ratingBox}>Satisfied {"\n" + el.ratingFields.satisfied}</Text>
            <Text style = {style.ratingBox}>Value For Money{"\n" + el.ratingFields.valueForMoney}</Text>
            <Text style = {style.ratingBox}>Condition{"\n" + el.ratingFields.conditions}</Text>
            <Text style = {style.ratingBox}>Service{"\n" + el.ratingFields.service}</Text>
        </View>
        <Button title = "Delete Post" buttonStyle = {{marginTop : 10}} onPress = {() => {deletePost(el._id)}} />
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
        borderWidth : 1,
        padding : 10,
        borderRadius : 10,
        marginBottom : 10,
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
