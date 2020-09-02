import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components';
import SettingsScreen from '../screens/SettingsScreen';
import { CovidScreen } from '../screens/CovidScreen';
import { HomeNavigator } from './HomeNavigator';

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => (
    <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => navigation.navigate(state.routeNames[index.row])}
    >
        <DrawerItem title='Home' />
        <DrawerItem title='Settings' />
        <DrawerItem title='COVID-19 Info' />
    </Drawer>
);

export const DrawerNavigator = () => (
    <Navigator 
        drawerContent={props => <DrawerContent {...props}/>}
    >
        <Screen name='Home' component={HomeNavigator}/>
        <Screen name='Settings' component={SettingsScreen}/>
        <Screen name='Covid Info' component={CovidScreen}/>
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <DrawerNavigator/>
    </NavigationContainer>
);

