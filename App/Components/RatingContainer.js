import React , {useState , useEffect} from 'react';
import {View ,ScrollView , Text , StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements';

const RatingContainer = props => {
    const [reviews , chagneReviews] = useState([]);
    useEffect(() => {
      chagneReviews(props.reviews);
    } ,[])
    const block = reviews.map((el, idx) => {
      if(idx < 10)
        return (
          <View style = {style.reviewBox} key = {idx}>
            <View style = {{display : "flex" , flexDirection : "row", height : "auto"}}>
                <Image source = {{uri : el.userPhoto}} style = {{width : 100 ,height : 100 , borderRadius : 100}}/>
                <Text style = {{textAlign : "justify",marginLeft : 10,height : "auto",flex : 1}}>{el.text}</Text>
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",
            justifyContent : "space-between" ,marginTop : 20}}
            >
                <Text style = {style.ratingBox}>Satisfied {"\n" + el.ratingFields.satisfied}</Text>
                <Text style = {style.ratingBox}>Value For Money{"\n" + el.ratingFields.valueForMoney}</Text>
                <Text style = {style.ratingBox}>Condition{"\n" + el.ratingFields.conditions}</Text>
                <Text style = {style.ratingBox}>Service{"\n" + el.ratingFields.service}</Text>
            </View>
          </View>
        );
      });

    return (
        <View style = {{flex : 1}}>
            <ScrollView>
                {block}
            </ScrollView>
        </View>
    );
}


const style = StyleSheet.create({
    reviewBox : {
        borderWidth : 0,
        padding : 10,
        borderRadius : 10,
        marginBottom : 10,
        marginTop : 20,
        backgroundColor : "rgba(255, 149, 36,0.3)",      
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