import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoinDetailScreen from '../screens/CoinDetailScreen';
import BottomTabNavigator from './BottomTabNavigator';
import AddNewAssetScreen from '../screens/AddNewAssetScreen';


const stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <stack.Navigator
            initialRouteName='Root'
           >
            <stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown:false}} />
            <stack.Screen name="CoinDetailScreen" component={CoinDetailScreen}  options={{headerShown:false}}/>
            <stack.Screen name="AddNewAssetScreen" component={AddNewAssetScreen}  
            options={{
                title: "Add New Assets",
                headerStyle:{
                    backgroundColor:'#121212',
                },
                headerTintColor:'white',
                headerTitleStyle:{
                    fontWeight:'bold'
                }
        }}/>

        </stack.Navigator>
    )

}
export default Navigation;