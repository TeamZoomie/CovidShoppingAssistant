import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import { List, ListItem, Divider } from '@ui-kitten/components';
import { Datepicker, Layout, Text } from '@ui-kitten/components';

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    container: {
        maxHeight: 200,
    }
})

const HamburgerIcon = (props) => (
    <Icon {...props} name='menu-outline' />
);

// https://github.com/javieraviles/covidAPI
const data = 'https://coronavirus-19-api.herokuapp.com/countries/Australia'

// TODO Need to read data in directly

const data_copy = {"country":"Australia","cases":24916,"todayCases":104,"deaths":517,"todayDeaths":15,"recovered":19603,"active":4796,"critical":38,"casesPerOneMillion":975,"deathsPerOneMillion":20,"totalTests":5757173,"testsPerOneMillion":225388}

// In QLD, from the 13th of March to the 31st of August
// https://www.covid19data.com.au/states-and-territories
const case_numbers_historical = [8, 11, 15, 7, 10, 16, 50, 40, 37, 38, 60, 78,
    46, 50, 62, 70, 31, 33, 55, 40, 57, 39, 27, 9, 14, 13, 9, 10, 13, 9, 12, 7,
    11, 5, 5, 6, 9, 5, 0, 6, 0, 2, 2, 2, 3, 3, 0, 1, 0, 0, 1, 1, 3, 5, 0, 2, 0,
    0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
    0, 2, 0, 0, 0, 0, 3, 3, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 
    0, 0, 1, 1, 0, 9, 2, 1, 0, 1, 2, 3, 4, 4, 1
]

export const CovidScreen = ({ navigation }) => {

    const renderItem = ({ item }) => (
        <ListItem title={`${item}`}/>
    );

    const DrawerAction = () => (
        <TopNavigationAction icon={HamburgerIcon} onPress={() => navigation.openDrawer()}/>
    );

    const [date, setDate] = React.useState(new Date());

    return(
        <SafeAreaView style={styles.root}>
            <View>
                <TopNavigation 
                    title='COVID-19 Information' 
                    alignment='center' 
                    accessoryLeft={DrawerAction}
                />
                <List
                    style={styles.container}
                    data={data_copy}
                    ItemSeparatorComponent={Divider}
                    renderItem={renderItem}
                />
            </View>
            <Layout>
                <Text category='h6'>
                    Selected date: {date.toLocaleDateString()}
                </Text>

                <Datepicker
                    date={date}
                    onSelect={nextDate => setDate(nextDate)}
                />
            </Layout>
        </SafeAreaView>
    );
}

