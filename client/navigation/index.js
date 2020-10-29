/**
 * Defines the navigation schema, used in the app to allow users to navigate
 * around the app. This includes the main navigator that the user sees on the
 * home screen as well as the covid navigator which allows the user to switch
 * between covid statistics and news.
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
    BottomNavigation, 
    BottomNavigationTab,
    Icon 
} from '@ui-kitten/components';
import { HomeNavigator } from './HomeNavigator';
import { CovidNavigator } from './CovidNavigator';
import SettingsScreen from '../screens/SettingsScreen';

// Defines the icon for the lists button
const ListsIcon = (props) => (
    <Icon {...props} name='list-outline'/>
);

// Defines the icon for the news button
const NewsIcon = (props) => (
    <Icon {...props} name='globe-2-outline'/>
);

// Defines the icon for the settings button
const SettingsIcon = (props) => (
    <Icon {...props} name='options-2-outline'/>
);

const { Navigator, Screen } = createBottomTabNavigator();

/**
 * Defines the layout used on the bottom navigator
 */
const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}
    >
        <BottomNavigationTab title='My Lists' icon={ListsIcon}/>
        <BottomNavigationTab title='News' icon={NewsIcon}/>
        <BottomNavigationTab title='Settings' icon={SettingsIcon}/>
    </BottomNavigation>
);

// Defines the container which contains the bottom navigator
export const AppNavigator = () => (
    <NavigationContainer>
        <Navigator 
            tabBar={props => <BottomTabBar {...props} />}
        >
            <Screen name="Home" component={HomeNavigator} />
            <Screen name="Covid Info" component={CovidNavigator} />
            <Screen name="Settings" component={SettingsScreen} />
        </Navigator>
    </NavigationContainer>
);