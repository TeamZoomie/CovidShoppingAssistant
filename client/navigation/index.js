import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components';
import { HomeNavigator } from './HomeNavigator';
import { CovidInfoNavigator } from './CovidInfoNavigator';
import AddItemScreen from '../screens/AddItemScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MapScreen from '../screens/MapScreen';

// import DemoScreen from '../screens/DemoScreen';

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => (
    <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => navigation.navigate(state.routeNames[index.row])}
    >
        <DrawerItem title='Home' />
        <DrawerItem title='COVID-19 Info' />
        <DrawerItem title='Settings' />
        <DrawerItem title='AddItemScreen' />
        <DrawerItem title='Map' />
    </Drawer>
);

export const DrawerNavigator = () => (
    <Navigator 
        drawerContent={props => <DrawerContent {...props}/>}
    >
        <Screen name='Home' component={HomeNavigator}/>
        <Screen name='Covid Info' component={CovidInfoNavigator}/>
        <Screen name='Settings' component={SettingsScreen}/>
        <Screen name='AddItemScreen' component={AddItemScreen}/>
        <Screen name="Map" component={MapScreen} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <DrawerNavigator/>
    </NavigationContainer>
);

