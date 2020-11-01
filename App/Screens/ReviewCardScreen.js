import React, { useState } from 'react';
import {View ,ScrollView , Alert,StyleSheet, ActivityIndicator} from 'react-native';
import {Input , Button,} from 'react-native-elements';
import Header from '../Components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import call from '../call';
const ReviewCardScreen = props => {

    const [text ,changeText] = useState('');
    const [satisfied, setsatisfied] = useState(0);
    const [vfm , changeVfm] = useState(0);
    const [condition , changeCondition] = useState(0);
    const [service , changeService] = useState(0);
    const [loading , changeLoading] = useState(false);

    const submit = () => {
        changeLoading(true);
        if(text.length >= 5 && 
        (satisfied <= 5 && satisfied >= 0) &&
        (vfm <= 5 && vfm >= 0) &&
        (condition <= 5 && condition >= 0) &&
        (service <= 5 && service >= 0) ){
            submitReview();
        }else{
            changeLoading(false);
            Alert.alert('Invalid' , "Constraints no satisfied ,change values and try again ");
        }
      
    }

    const submitReview = () => {
        console.log(props.route.params.details._id ,props.route.params.details.bookingDetails.name,props.jwt );
        let overallRating =
        (parseFloat(satisfied) +
          parseFloat(vfm) +
          parseFloat(condition) +
          parseFloat(service)) /
        4;
        const reviewData = {
            text: text,
            bookingId: props.route.params.details._id,
            ratingFields: {
              satisfied: satisfied,
              valueForMoney: vfm,
              conditions: condition,
              service: service,
            },
            overallRating,
            userPhoto: "user-0.png",
            userName: props.route.params.details.bookingDetails.name,
          };
          console.log(reviewData);
          call({
            method: "post",
            url: "/add-review",
            data: {
                jwt : props.jwt,
              ...reviewData,
            },
            withCredentials: true,
            
          }).then((res) => {
          Alert.alert("Done" , "Your feedback is saved. Thanks for giving feedback");
          props.navigation.goBack(); 
          changeLoading(false);
          }).catch(err => {
              console.log(err.response);
              changeLoading(false);
          });
    }

    
    return(
        <View style = {style.container}>

        <Header  navigation = {props.navigation} title = "Review Form"/>
        <ScrollView>
            <Input 
                placeholder = "Enter your expirence"
                numberOfLines = {10}
                textAlignVertical = "top"
                inputContainerStyle = {[style.inputContainerStyle, {height : 200}]}
                label = "Feedback"
                containerStyle = {style.containerStyle}
                inputStyle = {{color: "#222",fontSize : 16,fontWeight : "300"}}
                errorMessage = "Enter atleast 5 characters"
                renderErrorMessage = {text.length < 5 ? true : false}
                onChange = {(event) => {
                    changeText(event.nativeEvent.text)
                }}
                value = {text}
            />
            <Input 
                placeholder = "Your Rating out of 5"
                label = "Satisfied"
                keyboardType = "numeric"
                inputStyle = {style.inputStyle}
                containerStyle = {style.containerStyle}
                inputStyle = {{color: "#222",fontSize : 16,fontWeight : "300"}}

                inputContainerStyle = {style.inputContainerStyle}
                errorMessage = {satisfied <= 5 && satisfied >= 0 ? null : "Value lie between 0 and 5"}
                value = {satisfied}
                onChange = {(event) => {
                   setsatisfied(event.nativeEvent.text)
                }}
            />
            <Input 
                placeholder = "Your Rating out of 5"
                label = "Value For Money"
                keyboardType = "numeric"
                inputStyle = {style.inputStyle}
                containerStyle = {style.containerStyle}
                inputStyle = {{color: "#222",fontSize : 16,fontWeight : "300"}}

                inputContainerStyle = {style.inputContainerStyle}
                errorMessage = {vfm <= 5 && vfm >= 0 ? null : "Value lie between 0 and 5"}
                value = {vfm}
                onChange = {(event) => {
                    changeVfm(event.nativeEvent.text)
                }}
            />
            <Input 
                placeholder = "Your Rating out of 5"
                label = "Condition"
                keyboardType = "numeric"
                inputStyle = {style.inputStyle}
                containerStyle = {style.containerStyle}
                inputContainerStyle = {style.inputContainerStyle}
                inputStyle = {{color: "#222",fontSize : 16,fontWeight : "300"}}

                errorMessage = {condition <= 5 && condition >= 0 ? null : "Value lie between 0 and 5"}
                value = {condition}
                onChange = {(event) => {
                    changeCondition(event.nativeEvent.text)
                }}
            />
            <Input 
                placeholder = "Your Rating out of 5"
                label = "Service"
                keyboardType = "numeric"
                inputStyle = {style.inputStyle}
                containerStyle = {style.containerStyle}
                inputStyle = {{color: "#222",fontSize : 16,fontWeight : "300"}}

                inputContainerStyle = {style.inputContainerStyle}
                errorMessage = {service <= 5 && service >= 0 ? null : "Value lie between 0 and 5"}
                value = {service}
                onChange = {(event) => {
                    changeService(event.nativeEvent.text)
                }}
            />
          <Button 
              title = {loading ? <ActivityIndicator color = "#fff" size = {30}/> :  "Give Feedback"}
              titleStyle = {{color : "#fff"}}
              buttonStyle = {style.buttonStyle}
              containerStyle = {style.buttonContainerStyle}
              ViewComponent = {LinearGradient}
              onPress = {submit}
              linearGradientProps = {{
                colors:["rgba(252, 182, 3, 0.7)"  , "rgba(255, 149, 36,0.9)"],
                start : {x : 0, y : 0},
                end : {x : 1, y : 0}
              }}
            />
        </ScrollView>
        </View>
    )
}


const style = StyleSheet.create({
    container : {
        flex :1,
    },
    inputContainerStyle : {
        borderBottomWidth : 0,
        padding : 5,
        marginTop : 1,
        height : 55,
        borderRadius : 10,backgroundColor : "#fff"
    },
    inputStyle : {
        height: 55
    },
    containerStyle : {
        backgroundColor : "#fff",
        marginBottom : 1.5
    },
    buttonStyle :{
        backgroundColor : "rgba(255, 149, 36,0)",
        borderWidth :0,
        borderColor : "#fff",
        width : "100%",
        height:"100%",
        borderRadius : 4
    },
    buttonContainerStyle : {
        height: 50,
        width: "95%",
        alignSelf : "center",
        borderRadius : 4,
        marginTop : 10,
        marginBottom : 10
    },
})

const mapStateToProps = (state) => {
    return{
        ...state
    }
}

export default connect(mapStateToProps)(ReviewCardScreen);