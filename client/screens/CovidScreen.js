import React from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import { List, ListItem, Divider } from '@ui-kitten/components';
import { Datepicker, Layout, Text } from '@ui-kitten/components';
import { LineChart } from "react-native-chart-kit";

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    container: {
        maxHeight: 200,
    }
})

const chartConfig = {
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
  };

const HamburgerIcon = (props) => (
    <Icon {...props} name='menu-outline' />
);

// https://github.com/javieraviles/covidAPI
const data = 'https://coronavirus-19-api.herokuapp.com/countries/Australia'

// TODO Need to read data in directly

const data_copy = {"country":"Australia","cases":24916,"todayCases":104,"deaths":517,"todayDeaths":15,"recovered":19603,"active":4796,"critical":38,"casesPerOneMillion":975,"deathsPerOneMillion":20,"totalTests":5757173,"testsPerOneMillion":225388}

// In QLD, from the 13th of March to the 31st of August
// https://www.covid19data.com.au/states-and-territories
const case_numbers_historical = {
    labels: [Array(172).keys()],
    datasets: [
        {
    data:  [8, 11, 15, 7, 10, 16, 50, 40, 37, 38, 60, 78,
    46, 50, 62, 70, 31, 33, 55, 40, 57, 39, 27, 9, 14, 13, 9, 10, 13, 9, 12, 7,
    11, 5, 5, 6, 9, 5, 0, 6, 0, 2, 2, 2, 3, 3, 0, 1, 0, 0, 1, 1, 3, 5, 0, 2, 0,
    0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
    0, 2, 0, 0, 0, 0, 3, 3, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 
    0, 0, 1, 1, 0, 9, 2, 1, 0, 1, 2, 3, 4, 4, 1]
    }
]}

export const CovidScreen = ({ navigation }) => {

    const [date, setDate] = React.useState(new Date());

    // Define the drawer action
    const DrawerAction = () => (
        <TopNavigationAction icon={HamburgerIcon} onPress={() => 
            navigation.openDrawer()}/>
    );

    return(
        <SafeAreaView style={styles.root}>
            <View>
                <TopNavigation 
                    title='COVID-19 Information' 
                    alignment='center' 
                    accessoryLeft={DrawerAction}
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

                <Divider/>
                <Text category='h6'>
                    Number of New COVID-19 Cases Per Day
                </Text> 
                <Text>
                    From 13th of March to 31st of August
                </Text>
                <LineChart
                    data={case_numbers_historical}
                    width={Dimensions.get('window').width}
                    height={220}
                    chartConfig={chartConfig}
                    withVerticalLabels={false}
                    withHorizontalLines={false}
                    withVerticalLines={false}
                />
            </Layout>
        </SafeAreaView>
    );
}

