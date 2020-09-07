import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components';
import { HomeNavigator } from './HomeNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import DemoScreen from '../screens/DemoScreen';
import { CovidScreen } from '../screens/CovidScreen';

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => (
    <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => navigation.navigate(state.routeNames[index.row])}
    >
        <DrawerItem title='Home' />
        <DrawerItem title='Settings' />
        <DrawerItem title='COVID-19 Info' />
        {/*<DrawerItem title='Demo Screen' />*/}
    </Drawer>
);

export const DrawerNavigator = () => (
    <Navigator 
        drawerContent={props => <DrawerContent {...props}/>}
    >
        <Screen name='Home' component={HomeNavigator}/>
        <Screen name='Settings' component={SettingsScreen}/>
        <Screen name='Covid Info' component={CovidScreen}/>
        <Screen name='Demo Screen' component={DemoScreen}/>
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <DrawerNavigator/>
    </NavigationContainer>
);

