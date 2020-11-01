import React , {useEffect , useState}from 'react';
import { View,Text ,StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import Splash from './Splash';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './Reducers';
import thunk from 'redux-thunk';
import AppNavigator from './Navigator/AppNavigator';
const store = createStore(reducer,applyMiddleware(thunk));
const App = props => {

    const [loading , changeLoading] = useState(true);
    useEffect(()=>{
        changeLoading(false);
    }, [])
    if(loading){
        return(
            <Splash />
        )
    }
    return(
      <Provider store = {store}>
        <AppNavigator />
      </Provider>
    )
}


export default App;