import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
    BottomNavigation, 
    BottomNavigationTab,
    Icon 
} from '@ui-kitten/components';
import { HomeNavigator } from './HomeNavigator';
import { CovidInfoNavigator } from './CovidInfoNavigator';
import SettingsScreen from '../screens/SettingsScreen';
// import AddItemScreen from '../screens/AddItemScreen';
// import MapScreen from '../screens/MapScreen';

const ListsIcon = (props) => (
    <Icon {...props} name='list-outline'/>
);
const NewsIcon = (props) => (
    <Icon {...props} name='globe-2-outline'/>
);
const SettingsIcon = (props) => (
    <Icon {...props} name='options-2-outline'/>
);

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}
    >
        <BottomNavigationTab title='News' icon={NewsIcon}/>
        <BottomNavigationTab title='My Lists' icon={ListsIcon}/>
        <BottomNavigationTab title='Settings' icon={SettingsIcon}/>
    </BottomNavigation>
  );


export const BottomHomeNavigator = () => {
    return (
        <Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Screen name="Covid Info" component={CovidInfoNavigator}/>
            <Screen name="Home" component={HomeNavigator} />
            <Screen name="Settings" component={SettingsScreen}/>
        </Navigator>
    );
};

export const AppNavigator = () => (
    <NavigationContainer>
        <BottomHomeNavigator/>
    </NavigationContainer>
);