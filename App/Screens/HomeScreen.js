import React, { useState ,useEffect } from "react";
import call from '../call';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity, 
  AsyncStorage
} from "react-native";
import {Button} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import Header from "../Components/Header";
import Indicator from '../Components/Indicator';
// import delhi from '../../assets/images/delhi.jpg';


const HomeScreen = (props) => {
  const [showHomeMenu, changeHomeMenu] = useState(false);
  const  [offers ,changeOffers] = useState([]);
  const [loading ,changeLoading] = useState (true);
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
    ["Chennai",require('../Assets/images/chennai.jpg')]
  ]
  useEffect(()=>{
    call.get('/offer')
    .then(response =>{
        const data = response.data.offers;
        changeOffers(data);
        changeLoading(false);
    }).catch(err=>{
      changeLoading(false);
    });
  }, [])
  const offerBlock = offers.map((el , id) => {
    const url = {uri : "https://immense-hollows-05754.herokuapp.com" + el}
    return (
      <TouchableOpacity  key = {id}>
      <Image source = {url} 
        resizeMode = "cover"
        style = {{
            width : "100%",
            height : 120,
            marginBottom : 10
          }}
      />
      </TouchableOpacity>
    )
  })
  return (
  <View style = {style.container}>
   <Header navigation = {props.navigation} title = "KASHA.com"/>
   {loading ? <Indicator /> : 
    <ScrollView style = {{padding : 10}}>
    <View style = {style.container}>
                
               <View style = {{width : "100%" , height : 220,padding :10,backgroundColor : "rgba(255, 98, 36, 0.4)" }}>
                   <Image 
                       source = {require('../Assets/images/namaste.jpg')}
                       style = {{width : 100, height : 100,alignSelf : "center",borderRadius :100}}
                   />
                   <Text style = {{textAlign :"center",fontSize : 15,color : "#333" }}>Thanks for connecting with us</Text>
                   {/* <Text style = {{textAlign :"center",fontSize : 16}}>{this.props.lang['to get orders create your thela']}</Text> */}
                    <Button 
                        title = "Book Now"
                        buttonStyle = {{width : 150,alignSelf :"center",backgroundColor  : "rgba(255, 98, 36, 0.8)" ,borderRadius : 50}}
                        containerStyle = {{width : "100%",alignItems : "center",marginTop : 10}}
                        titleStyle = {style.buttonTextStyle}
                        onPress = {() => {props.navigation.navigate('Search')}}
                    />
                   
               </View>
            </View>
    <Text style = {style.heading}>Top Cities</Text>
      <FlatList style = {style.cityContainer} 
        horizontal 
        data = {cities}
        renderItem = {({item}) => {
          return (
            <TouchableOpacity>
          <View>
              <Image
                source={item[1]}
                style={style.citiyIcon}
                resizeMode="cover"
              />
              <Text style = {style.cityName}>{item[0]}</Text>
          </View>
          </TouchableOpacity>
          )
        }}
        keyExtractor ={(item) => item[0]}  
        showsHorizontalScrollIndicator = {false}
      />
      <Text style = {style.heading}>Offers</Text> 
      <View>
        {offerBlock}
        <Button 
          title = "Explore more"
          icon = {<MaterialCommunityIcons 
            name="briefcase-search-outline" 
            size={20} 
            color="#fff" 
            style = {{marginRight : 10}}  
          />}
          buttonStyle = {style.buttonStyle}
          titleStyle = {{fontSize : 14}}
        />
      </View>
       <Text style = {style.heading} >KASHA.com Special</Text>
        <View style = {{display : "flex",flexDirection : "row", justifyContent : "space-between",alignItems : "center",marginBottom : 50}}>
            <View style = {{width : "49%",backgroundColor: "#fff",elevation : 1,padding: 5,height : 250,borderRadius : 5}}>
                <Image 
                  source = {require('../Assets/images/hotels.jpg')}
                  style = {{width : "100%",height : 100}}
                />
                <Text style = {{width : "100%", color : "#111", fontSize : 18,fontWeight : "700",padding : 10}}>Hotels</Text>
                <Text style = {{lineHeight : 20, letterSpacing : 1,padding : 2,textAlign : "justify",fontWeight : "300"}}>Plan your trips with India's largest hotel chain </Text>
            </View>
            <View style = {{width : "49%",backgroundColor: "#fff",elevation : 1,padding: 5,borderRadius : 5,height : 250}}>
                <Image 
                  source = {require('../Assets/images/resort.jpg')}
                  style = {{width : "100%",height : 100}}
                />
                <Text style = {{width : "100%", color : "#111", fontSize : 18,fontWeight : "700",padding : 10}}>Resort</Text>
                <Text style = {{lineHeight : 20, letterSpacing : 1,padding : 2,textAlign : "justify"}}>Plan your trips ,parties and wedding with India's largest Resort chain </Text>
            </View>
       </View>
    </ScrollView>}
      </View>
  );
};

const style = StyleSheet.create({
  container : {
    padding : 0,
    position : "relative",
    flex : 1,
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
  heading : {
    marginBottom : 20,
    fontSize : 18,
    color : "#f07532",
    fontWeight : "700",
  },
  buttonStyle : {
    width : "40%",
    borderRadius : 10,
    backgroundColor : "#f07532",
    marginBottom  : 20,
    alignSelf : "flex-end"
  },
  cityContainer : {
   paddingBottom : 10,
   marginBottom : 10,
    borderBottomWidth : 1,
    borderColor : "#f07532"
  }
});

const mapStateToProps = (state) => {
  return{
    ...state
  }
};

export default connect(mapStateToProps)(HomeScreen);
