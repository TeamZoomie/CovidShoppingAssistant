/**
 * Defines a the tab switcher for the news page, to switch between statistics
 * and news articles being presented.
 */

import React from 'react';
import { View } from 'react-native';
import { 
    Icon,
    Tab, 
    TabBar, 
    useTheme, 
} from '@ui-kitten/components';

/**
 * Define the icon for the news articles.
 */
const GlobeIcon = (props) => (
    <Icon {...props} name='globe-2-outline' />
);

/**
 * Define the icon for the statistics page.
 */
const BarChartIcon = (props) => (
    <Icon {...props} name='bar-chart-outline' />
);

/**
 * Defines this screen.
 */
const CovidScreen = ({  navigation, state }) => {

    const theme = useTheme();
    const onTabSelect = (index) => {
        navigation.navigate(state.routeNames[index]);
    };

    return (
        <View style={{ backgroundColor: theme['background-basic-color-1'] }}>
            <TabBar 
                selectedIndex={state.index}
                onSelect={onTabSelect}
                style={{ height:  55 }}
            >
                <Tab icon={BarChartIcon}/>
                <Tab icon={GlobeIcon}/>
            </TabBar>
        </View>
    )
};

export default CovidScreen;