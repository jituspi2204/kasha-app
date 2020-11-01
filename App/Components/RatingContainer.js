import React , {useState , useEffect} from 'react';
import {View ,ScrollView , Text , StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import call from "../call";
import PercentageCircle from 'react-native-progress-circle';
import LinearGradient from 'react-native-linear-gradient'
const RatingContainer = props => {
    const [reviews , chagneReviews] = useState([]);
    useEffect(() => {
      chagneReviews(props.reviews);
    } ,[])

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
      console.log(el);
      if(idx < 10)
        return (
      <View style = {style.reviewBox} key = {idx}>
      <View style = {{display : "flex",flexDirection : "row",justifyContent : "space-between",alignItems :"center"}}>
        <Image source = {{uri : el.userPhoto}} style = {{width : 60 ,height : 60, borderRadius : 100}}/>
        <View style = {{display : "flex",flexDirection : "column",justifyContent : "space-between",alignItems : "center",width : "50%"}}>
        <Text style = {{fontSize : 18,fontWeight : "700"}}>{el.userName}</Text>
        <View style = {{display : "flex",flexDirection : "row",justifyContent : "center",alignItems :"center"}}>
        {getStart(el.overallRating)}

        </View>
        </View>
      </View>
        <Text style = {{textAlign : "justify",borderBottomWidth : 1.5,borderColor : "#ddd",paddingBottom : 4}}>{el.text}</Text>
        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",
        justifyContent : "space-between" ,marginTop : 10}}
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
          
        </View>
  
     
      </View>
        );
      });
      
     
      return (
        <View style = {{flex : 1}}>
            <ScrollView>
                {block}
                <View style = {{width : "100%" , height : 70}}></View>
            </ScrollView>
        </View>
    );
}


const style = StyleSheet.create({
    reviewBox : {
        borderWidth : 0,
        padding : 10,
        borderRadius : 10,
        marginVertical : 3,
        backgroundColor : "#fff",      
    },
    ratingBox : {
      borderWidth : 0,
      borderColor : "green",
      padding : 10,
      borderRadius : 10,
      textAlign : "center",
      flex : 1,
      backgroundColor : "#fff",
      elevation : 2,
      marginRight : 4
    }
})
export default RatingContainer;