import React ,{useState , useEffect}from 'react';
import {View ,Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator,DrawerContentScrollView,DrawerItem,DrawerItemList} from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen';
import SearchScreen from '../Screens/SearchHomeScreen';
import ResultScreen from '../Screens/ResultScreen';
import MyReviewScreen from '../Screens/MyReviewScreen';
import BookingNavigator from '../Navigator/BookingNavigator';
import SearchNavigator from '../Navigator/SearchNavigator';
import MyDetailsScreen from '../Screens/MyDetailsScreen';
import {connect} from 'react-redux';
import {logout} from '../Actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-community/async-storage';
import { log } from 'react-native-reanimated';

const Drawer = createDrawerNavigator();
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
const CustomDrawer = (props) => {
    const logout = () => {
      AsyncStorage.multiRemove(["jwt", "user"]).then(() => {
        props.navigation.navigate('login');
      }).catch(err => {

      })
    }
    
    return (
      <LinearGradient 
        style={{ flex: 1,paddingTop : 30}}
        colors = {["rgba(255, 98, 36, 0.8)"  , "rgba(255, 149, 36,0.9)", ]}
        start = {{x : 0, y : 0}}
        end = {{x : 0 , y : 1}}

      >
      <View style = {{backgroundColor : "rgba(255,255,255,0)" ,width : "95%", 
      height : 80,marginHorizontal : "2.5%", borderRadius : 10,display : "flex",
      flexDirection :"row",justifyContent : "space-between",alignItems : "center",
      padding : 10}}>
        <Image 
          source = {{uri : "https://immense-hollows-05754.herokuapp.com/users/user-0.png"}}
          style = {{height : 60,width : 60,borderRadius : 60}}
        />
        <Text style = {{color: "#fff", fontWeight : "700",fontSize : 18}}>Hi, {props.userName}</Text>
      </View>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        {/* {props.loggedIn ? (
          <DrawerItem
            label="Login"
            icon={() => <Feather name="user" size={25} color="black" />}
            style={{ position: "absolute", bottom: 0, width: "92%" }}
          />
        ) : (
        )} */}
          <DrawerItem
            label="Logout"
            icon={
              () => <AntDesign name="logout" size={24} color="#fff" />
            }
            labelStyle = {{fontSize : 16, color : "#fff" ,fontWeight : "700"}}
            style={{ position: "absolute", bottom: 0, width: "100%"}}
            onPress = {logout}
            
          />
      </LinearGradient>
    );
  };


const DrawerNavigator = connect(mapStateToProps , {logout : logout})((props) => {
  let logOut = props.logout;
  let stackNavigation  = props.navigation;
  const [loggedIn, changeLoggedIn] = useState({
    status: false,
    userDetails: null,
  });
  const [loader , changeLoader] = useState(false);
  useEffect(() => {
  }, []);

  return (
      <Drawer.Navigator
        drawerContent={(data) => (
          <CustomDrawer
            {...data}
            stackNavigation = {stackNavigation}
            userName = {props.user.name}
          />
        )}
        initialRouteName="Home"
        drawerContentOptions = {{
          activeBackgroundColor : "rgba(255, 255,255, 0.5)",
          activeTintColor : "rgb(1,1,1)",
          inactiveTintColor : "rgb(255,255,255)",
          labelStyle : {fontSize : 16},
          itemStyle : {borderBottomColor : "#fff", borderBottomWidth : 0.2}
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome name="home" size={25} color="#fff" />
            ),
          }}
        />
         <Drawer.Screen
          name="Search"
          component={SearchNavigator}
          options={{
            drawerIcon: () => (
              <FontAwesome name="search" size={25} color="#fff" />
            ),
          }}
        />
         <Drawer.Screen
          name="My Details"
          component={MyDetailsScreen}
          options={{
            drawerIcon: () => (
              <Feather name="user" size={24} color="#fff" />
            ),
          }}
        />
         <Drawer.Screen
          name="My Bookings"
          component={BookingNavigator}
          options={{
            drawerIcon: () => (
              <FontAwesome name="ticket" size={24} color="#fff" />
            ),
          }}
        />
         <Drawer.Screen
          name="My Reviews"
          component={MyReviewScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome name="ticket" size={24} color="#fff" />
            ),
          }}
        />
         <Drawer.Screen
          name="Settings"
          component={HomeScreen}
          options={{
            drawerIcon: () => (
              <Feather name="settings" size={24} color="#fff" />
            ),
          }}
        />
     
      </Drawer.Navigator>
  );
});

export default DrawerNavigator;