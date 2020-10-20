import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import MyBookingScreen from '../Screens/MyBookingsScreen';
import BookingDetailsScreen from '../Screens/BookingDetailsScreen';
const Stack = createStackNavigator();


const BookingNavigator = props => {
    return(
        <Stack.Navigator
            screenOptions = {{
                headerShown : false
            }}
        >
            <Stack.Screen name = "myBookings" component = {MyBookingScreen} />
            <Stack.Screen name = "bookingDetails" component = {BookingDetailsScreen} />

        </Stack.Navigator>
    )
}

export default BookingNavigator;