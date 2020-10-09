import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import CreateListScreen from '../screens/CreateListScreen';
import ShoppingIntroScreen from '../screens/ShoppingIntroScreen';
import StoreSelectorScreen from '../screens/StoreSelectorScreen';
import MapScreen from '../screens/MapScreen';

const { Navigator, Screen } = createStackNavigator();

export const HomeNavigator = () => {
    return (
        <Navigator 
            headerMode="none" 
            screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
        >
            <Screen name="Home" component={HomeScreen} />
            <Screen name="List" component={ListScreen} />
            <Screen name="CreateList" component={CreateListScreen} />
            <Screen name="ShoppingIntro" component={ShoppingIntroScreen} />
            <Screen name="StoreSelector" component={StoreSelectorScreen} />
            <Screen name="Map" component={MapScreen} />
        </Navigator>
    );
};
