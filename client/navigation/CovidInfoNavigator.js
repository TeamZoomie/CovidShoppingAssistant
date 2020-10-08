import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CovidTabBar from '../screens/CovidScreen/CovidTabBar';
import NewsScreen from '../screens/CovidScreen/News';
import StatsScreen from '../screens/CovidScreen/Stats';

const { Navigator, Screen } = createMaterialTopTabNavigator();

export const CovidInfoNavigator = () => (
    <Navigator tabBar={props => <CovidTabBar {...props}/>}>
      <Screen name='CovidStats' component={StatsScreen}/>
      <Screen name='CovidNews' component={NewsScreen}/>
    </Navigator>
);