import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ListScreen from '../screens/ListScreen/List';
import CategoriesScreen from '../screens/ListScreen/Categories';

const { Navigator, Screen } = createStackNavigator();

// const MainStack = createStackNavigator();

// function MainStackScreen() {
//     return (
//       <MainStack.Navigator>
//             <MainStack.Screen name="List" component={ListScreen} />
//             <MainStack.Screen name="Details" component={DetailsScreen} />
//       </MainStack.Navigator>
//     );
// }

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