import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CreateListScreen from '../screens/CreateListScreen';
import AddItemScreen from '../screens/AddItemScreen';
import { ListNavigator } from './ListNavigator';


const { Navigator, Screen } = createStackNavigator();

export const HomeNavigator = () => {
    return (
        <Navigator 
            headerMode="none" 
            screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
        >
            <Screen name="Home" component={HomeScreen} />
            <Screen name="List" component={ListNavigator} />
            <Screen name="CreateList" component={CreateListScreen} />
            <Screen name="AddItemScreen" component={AddItemScreen} />
        </Navigator>
    );
};