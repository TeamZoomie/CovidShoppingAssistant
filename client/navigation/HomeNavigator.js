import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CreateListScreen from '../screens/CreateListScreen';
import ShoppingIntroScreen from '../screens/ShoppingIntroScreen';
import StoreSelectorScreen from '../screens/StoreSelectorScreen';
import AddItemScreen from '../screens/AddItemScreen';
import MapScreen from '../screens/MapScreen';

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
            <Screen name="ShoppingIntro" component={ShoppingIntroScreen} />
            <Screen name="StoreSelector" component={StoreSelectorScreen} />
            <Screen name="AddItemScreen" component={AddItemScreen} />
            <Screen name="Map" component={MapScreen} />
        </Navigator>
    );
};
