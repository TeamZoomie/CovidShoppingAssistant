import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ListScreen from '../screens/ListScreen/List';
import CategoriesScreen from '../screens/ListScreen/Categories';

const { Navigator, Screen } = createStackNavigator();

export const ListNavigator = () => {
    return (
      <Navigator mode="modal">
        <Screen
            name="Main"
            component={ListScreen}
            options={{ headerShown: false }}
        />
        <Screen name="Categories" options={{ headerShown: false }} component={CategoriesScreen} />
      </Navigator>
    );
}