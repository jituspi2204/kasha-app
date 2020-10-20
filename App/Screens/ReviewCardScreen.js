import React, { useState } from 'react';
import {View ,ScrollView , Alert} from 'react-native';
import {Input , Button,} from 'react-native-elements';

const ReviewCardScreen = props => {

    const [text ,changeText] = useState('');
    const [satisfied, setsatisfied] = useState(0);
    const [vfm , changeVfm] = useState(0);
    const [condition , changeCondition] = useState(0);
    const [service , changeService] = useState(0);

    const submit = () => {
        if(text.length >= 5 && 
        (satisfied <= 5 && satisfied >= 0) &&
        (vfm <= 5 && vfm >= 0) &&
        (condition <= 5 && condition >= 0) &&
        (service <= 5 && service >= 0) ){
            
        }else{
            Alert.alert('Invalid' , "Constraints no satisfied ,change values and try again ");
        }
    }

    
    return(
        <ScrollView>
            <Input 
                placeholder = "Enter your expirence"
                numberOfLines = {10}
                textAlignVertical = "top"
                inputContainerStyle = {{
                    borderWidth : 1,
                    padding : 5,
                    marginTop : 10,
                    borderRadius : 10
                }}
                label = "Enter Text"
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
                inputContainerStyle = {{
                    borderWidth : 1,
                    padding : 5,
                    marginTop : 10,
                    borderRadius : 10
                }}
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
                inputContainerStyle = {{
                    borderWidth : 1,
                    padding : 5,
                    marginTop : 10,
                    borderRadius : 10
                }}
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
                inputContainerStyle = {{
                    borderWidth : 1,
                    padding : 5,
                    marginTop : 10,
                    borderRadius : 10
                }}
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
                inputContainerStyle = {{
                    borderWidth : 1,
                    padding : 5,
                    marginTop : 10,
                    borderRadius : 10
                }}
                errorMessage = {service <= 5 && service >= 0 ? null : "Value lie between 0 and 5"}
                value = {service}
                onChange = {(event) => {
                    changeService(event.nativeEvent.text)
                }}
            />
            <Button title = "Submit"
                buttonStyle = {{
                    width : " 94%",
                    alignSelf : "center",
                    marginBottom : 10,
                    padding : 10
                }}
                onPress = {submit}
            />
        </ScrollView>
    )
}

export default ReviewCardScreen;