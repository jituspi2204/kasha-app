import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SettingScreen from '../Screens/SettingScreen';
import OfferScreen from '../Screens/OfferScreen';
import MyReviesScreen from '../Screens/MyReviewScreen';
const Stack = createStackNavigator();


class AppNavigator extends React.Component {
    
    render(){
        console.log(this.props.route.params);
    return(
            <Stack.Navigator
                screenOptions = {{
                    headerShown : false,
                    headerStyle : {height : 0}
                }}
            >
                <Stack.Screen name = "home" component = {SettingScreen} initialParams = {{navigation : this.props.route.params.navigation}}/>
                <Stack.Screen name = "offers" component = {OfferScreen} />
                <Stack.Screen name = "reviews" component = {MyReviesScreen} />

            </Stack.Navigator>
        
    )
}
}

export default AppNavigator;