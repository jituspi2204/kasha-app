import React from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import SearchScreen from '../Screens/SearchHomeScreen';
import ResultScreen from  '../Screens/ResultScreen';
import FullPageScreen from  '../Screens/FullPageScreen';
import PaymentScreen from '../Screens/PaymentScreen';

const Stack = createStackNavigator();


class AppNavigator extends React.Component {
    
    render(){
    return(
            <Stack.Navigator
                screenOptions = {{
                    headerShown : false,
                    headerStyle : {height : 0}
                }}
            >
                <Stack.Screen name = "search" component = {SearchScreen}/>
                <Stack.Screen name = "result" component = {ResultScreen} />
                <Stack.Screen name = "fullpage" component = {FullPageScreen} />
                <Stack.Screen name = "payment" component = {PaymentScreen} />


            </Stack.Navigator>
        
    )
}
}

export default AppNavigator;