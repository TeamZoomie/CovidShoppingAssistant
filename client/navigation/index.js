import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, Layout, Text, IndexPath } from '@ui-kitten/components';
import { HomeScreen } from '../screens/HomeScreen';
import { ListScreen } from '../screens/ListScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
const { Navigator, Screen } = createDrawerNavigator();

const HomeNavigator = () => (
    <Navigator headerMode='none'>
        <Screen name='Home' component={HomeScreen}/>
        <Screen name='List' component={ListScreen}/>
    </Navigator>
);

const DrawerContent = ({ navigation, state }) => (
    <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => navigation.navigate(state.routeNames[index.row])}
    >
        <DrawerItem title='Home' />
        <DrawerItem title='Shopping List' />
        <DrawerItem title='Settings' />
    </Drawer>
);

export const DrawerNavigator = () => (
    <Navigator drawerContent={props => <DrawerContent {...props}/>}>
        <Screen name='Home' component={HomeScreen}/>
        <Screen name='List' component={ListScreen}/>
        <Screen name='Settings' component={SettingsScreen}/>
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <DrawerNavigator/>
    </NavigationContainer>
);

