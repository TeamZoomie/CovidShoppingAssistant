import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import CreateListScreen from '../screens/CreateListScreen';

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
        </Navigator>
    );
};
