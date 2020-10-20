import React from 'react';
import {View, ImageBackground , StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import RatingCard from './RatingCard';
import LinearGradient from 'react-native-linear-gradient'

const HotelCard = props => {
    const hotelData = props.data;
    const imageUrl = {uri : hotelData.coverImage[0]};

    const address = hotelData.location.address + " , " +
                    hotelData.location.area + " , " +
                    hotelData.location.city + " , " +
                    hotelData.location.state + " , " +
                    hotelData.location.country;

    return (
        <LinearGradient
        colors = {["rgba(255, 98, 36, 0.8)"  , "rgba(255, 149, 36,0.1)", ]}
        start = {{x : 0, y : 0}}
        end = {{x : 0 , y : 0.9}}
        style = {style.cardStyle}
        key = {Date.now()}
   >
        {/* <View style = {style.cardStyle} key = {Date.now()}> */}
            <View style = {style.upperBox}>
                <ImageBackground source = {imageUrl} style = {{
                    flex : 3,
                    height : 150,
                    borderRadius : 10
                }}/>
                <View style = {{flex : 1, paddingLeft : 4 ,display :"flex" , flexDirection : "column"}}>
                    <ImageBackground source = {{uri : hotelData.coverImage[1]}} style = {{
                        height : 75,
                        borderRadius : 5
                    }} />
                    <ImageBackground source = {{uri : hotelData.coverImage[2]}} style = {{
                        height : 75,
                        borderRadius: 5
                    }}/>
                  
                </View>
            </View>
            <View style = {style.bottomBox}>
                <Text style = {style.priceStyle}>Rs 1000</Text>
                <RatingCard rating = {hotelData.rating}/>
                <Text style = {{width : "100%", fontSize : 18, fontStyle : "italic" ,color : "rgb(255, 111, 0)"}}>{hotelData.propertyName}</Text>
                <Text style = {{width : "100%"}}>{address}</Text>
            </View>
        {/* </View> */}
        </LinearGradient>
    );
}

const style = StyleSheet.create({
    cardStyle :{
        flex : 1,
        padding : 10,
        height : "auto",
        width : "100%",
        display : 'flex',
        flexDirection : "column",
        justifyContent :"space-between",
        borderRadius:10,
        marginBottom : 10,
        backgroundColor:"rgba(255,255,255,0)",
        elevation : 0
    },
    upperBox : {
        display : "flex",
        flexDirection : "row",
    },
    bottomBox :{
        display : "flex" ,
        flexDirection : "row",
        justifyContent : "space-between",
        flexWrap : "wrap"
    },
    priceStyle : {
        fontSize : 18, 
        fontWeight : "bold" ,
        color : 'rgb(0, 102, 0)',
        textAlign : "center"
    }
});

export default HotelCard;