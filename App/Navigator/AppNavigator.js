import React from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import HomeScreenNavigator from './HomeNavigation';
import Loading from '../index';
const Stack = createStackNavigator();


class AppNavigator extends React.Component {
    
    render(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions = {{
                    headerShown : false,
                    headerStyle : {height : 0}
                }}
            >
                <Stack.Screen name = "loading" component = {Loading} />
                <Stack.Screen name = "login" component = {LoginScreen} />
                <Stack.Screen name = "home" component = {HomeScreenNavigator}/>
                <Stack.Screen name = "forgotPassword" component = {ForgotPasswordScreen} />
                <Stack.Screen name = "register" component = {SignupScreen} />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}
}

export default AppNavigator;