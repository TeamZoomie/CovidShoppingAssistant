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

const case_numbers_historical = {}

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
                <TopNavigation title='COVID-19 Information' alignment='center' accessoryLeft={DrawerAction}/>
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

