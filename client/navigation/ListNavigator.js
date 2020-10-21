import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ListScreen from '../screens/ListScreen/List';
import CategoriesScreen from '../screens/ListScreen/Categories';
import MapScreen from '../screens/ListScreen/Map';
import StoreSelectorScreen from '../screens/ListScreen/StoreSelector';
import ShoppingIntroScreen from '../screens/ListScreen/ShoppingIntro';

const { Navigator, Screen } = createStackNavigator();

export const ListNavigator = () => {
    return (
    <Navigator 
        mode="modal" 
        headerMode="none"
        screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
    >
        <Screen
            name="Main"
            component={ListScreen}
        />
        <Screen name="Categories" component={CategoriesScreen} />
        <Screen name="Map" component={MapScreen} />
        <Screen name="StoreSelector" component={StoreSelectorScreen} />
        <Screen name="ShoppingIntro" component={ShoppingIntroScreen} />
    </Navigator>
    );
}