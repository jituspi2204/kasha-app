import React from 'react';
import {View , Text ,StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const RatingCard = props => {
    const getColor = (ratingValue) => {
        if(ratingValue === 0){
            return "#aaa";
        }
        else if(ratingValue > 0 && ratingValue <= 1){
            return "red"
        }else if(ratingValue > 1 && ratingValue <= 2){
            return "rgb(255, 77, 0)"
        }else if(ratingValue > 2 && ratingValue <= 3){
            return "rgb(255, 183, 0)"
        }else if(ratingValue > 3 && ratingValue <= 4){
            return "rgb(174, 255, 0)"
        }else if(ratingValue > 4 && ratingValue <= 5){
            return "rgb(20, 173, 0)"
        }
    }
    return (
        <View style = {{
            marginTop : 4,
            width : 60,
            height: 30,
            backgroundColor : getColor(props.rating),
            display:"flex",
            flexDirection:"row",
            justifyContent:"center",
            alignItems: "center",
            borderRadius : 5
        }}>
            <Text style = {{color : "#fff" ,marginRight : 10 , fontSize : 16}}>{props.rating}</Text>
            <Feather name = "star" size = {20} color = "#fff"/>
        </View>
    )
};


export default RatingCard;