/**
 * A navigator to be passed to the main navigator (see index.js) to handles
 * transitions between different screens in using the shopping lists features.
 */

import React from 'react';
import { createStackNavigator, CardStyleInterpolators } 
        from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CreateListScreen from '../screens/CreateListScreen';
import AddItemScreen from '../screens/AddItemScreen';
import { ListNavigator } from './ListNavigator';


const { Navigator, Screen } = createStackNavigator();

/**
 * Defines the navigator.
 */
export const HomeNavigator = () => {
    return (
        <Navigator 
            headerMode="none" 
            screenOptions = {{ cardStyleInterpolator: 
                CardStyleInterpolators.forHorizontalIOS 
            }}
        >
            <Screen name="Home" component={HomeScreen} />
            <Screen name="List" component={ListNavigator} />
            <Screen name="CreateList" component={CreateListScreen} />
            <Screen name="AddItemScreen" component={AddItemScreen} />
        </Navigator>
    );
};