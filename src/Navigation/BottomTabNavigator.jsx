import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { AntDesign, Foundation} from '@expo/vector-icons';
import WatchListScreen from '../screens/WatchListScreen';
import PortfolioScreen from '../screens/PortfolioScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
        initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: 'grey',
                tabBarActiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: '#181818'
                } 
            }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon : ({focused, color}) => 
                (<AntDesign name="home" size={focused ? 30 : 25} color={color} />)
                
            }}/>
            <Tab.Screen name="Portfolio" component={PortfolioScreen} options={{
                tabBarIcon : ({focused, color}) => 
                (<Foundation name="graph-pie" size={focused ? 30 : 25} color={color} />)
            }}/>
            <Tab.Screen name="WatchaList" component={WatchListScreen} options={{
                tabBarIcon : ({focused, color}) => 
                (<AntDesign name="star" size={focused ? 30 : 25} color={color} />)
            }}/>
                
        </Tab.Navigator>
    )
};

export default BottomTabNavigator;