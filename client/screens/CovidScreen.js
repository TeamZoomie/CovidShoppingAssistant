import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions, ActivityIndicator,FlatList } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import { List, ListItem, Divider } from '@ui-kitten/components';
import { Datepicker, Layout, Text } from '@ui-kitten/components';
import { LineChart, PieChart } from "react-native-chart-kit";

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    box:{
        padding:16,
    },
    container: {
        maxHeight: 200
    },
    covid: {
        fontFamily: 'Roboto',
        paddingTop: 15,
        paddingBottom: 15
    },
    content: {
        paddingLeft: 15
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
        {/*
    data:  [8, 11, 15, 7, 10, 16, 50, 40, 37, 38, 60, 78,
    46, 50, 62, 70, 31, 33, 55, 40, 57, 39, 27, 9, 14, 13, 9, 10, 13, 9, 12, 7,
    11, 5, 5, 6, 9, 5, 0, 6, 0, 2, 2, 2, 3, 3, 0, 1, 0, 0, 1, 1, 3, 5, 0, 2, 0,
    0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1,
    0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1,
    0, 2, 0, 0, 0, 0, 3, 3, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 
    0, 0, 1, 1, 0, 9, 2, 1, 0, 1, 2, 3, 4, 4, 1]
    }*/
    data:  [8, 11, 15, 7, 10, 16, 50, 40, 37, 38, 60, 78,
        46, 50, 62, 70, 31, 33, 55, 40, 57, 39, 27, 9, 14, 13, 9, 10, 13, 9, 12, 7,
        11, 5, 5, 6, 9]
        }
]}

const case_data = [
    {
      name: "Days below 10 cases",
      population: 135,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Days with 10 or more new cases",
      population: 27,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
];

export const CovidScreen = ({ navigation }) => {

    const [date, setDate] = React.useState(new Date());

    // Define the drawer action
    const DrawerAction = () => (
        <TopNavigationAction icon={HamburgerIcon} onPress={() => 
            navigation.openDrawer()}/>
    );
    
    // Get the covid statistics from api
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch('https://coronavirus-19-api.herokuapp.com/countries/Australia')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    return(
        <SafeAreaView style={styles.root}>
            <View>
                <TopNavigation 
                    title='COVID-19 Information' 
                    alignment='center' 
                    accessoryLeft={DrawerAction}
                />
            </View>
            <Layout style={styles.box}>
                <Text category='h6'>
                    Selected date: {date.toLocaleDateString()}
                </Text>

                <Datepicker
                    date={date}
                    onSelect={nextDate => setDate(nextDate)}
                />
                <Divider/>
                <View style={styles.covid}>
                {isLoading ? <ActivityIndicator/> : (
                     <Text style={{
                         fontSize: 22,
                         fontWeight: "700"
                          }}>
                         {data.country}
                         {'\n'}
                            <Text style={{
                            fontSize: 17
                            }}>
                                {'\n'}Cases: {data.cases} | 
                                Today: {data.todayCases} |
                                Active: {data.active} {'\n'}
                                Deaths: {data.deaths} |
                                Today: {data.todayDeaths}{'\n'}
                                Recovered: {data.recovered} |
                                Critical: {data.critical}
                            </Text>
                    </Text>
                )}
                </View>
                
                <Divider/>
                <Text style={{
                    fontSize: 17,
                    fontWeight:"700"
                }}>
                    Number of New COVID-19 Cases Per Day
                </Text> 
                <View style = {styles.content}>
                    <Text>
                        {'\n'}From 13th of March to 31st of March NEED CHECK
                    </Text>
                </View>
                <LineChart
                    data={case_numbers_historical}
                    width={Dimensions.get('window').width}
                    height={220}
                    chartConfig={chartConfig}
                    withVerticalLabels={false}
                    withHorizontalLines={false}
                    withVerticalLines={false}
                />
                <Divider/>
                <PieChart
                    data={case_data}
                    width={Dimensions.get('window').width}
                    height={220}
                    chartConfig={chartConfig}
                    accessor="population"
                    paddingLeft="15"
                    absolute
                />
            </Layout>
        </SafeAreaView>
    );
}

