import React from 'react';
import { View } from 'react-native';
import { 
    Icon,
    Tab, 
    TabBar, 
    useTheme, 
} from '@ui-kitten/components';


const GlobeIcon = (props) => (
    <Icon {...props} name='globe-2-outline' />
);
const BarChartIcon = (props) => (
    <Icon {...props} name='bar-chart-outline' />
);

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