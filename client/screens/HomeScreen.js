import React from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { List, ListItem, Text, Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { LineChart } from 'react-native-chart-kit';
import GridList from '../components/GridList';

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    content: {
        // flex: 1
    },
    nav: {
        backgroundColor: 'green'
    },
    text: {
        margin: 4,
        textAlign: 'center',
        padding: 8,
        fontWeight: "700"
    },
    container: {
        maxHeight: 200,
        margin: 20,
        // padding: 20,
        borderColor: '#eee',
        borderWidth: 2
    }
});

const data = [
    {
        title: 'Start Shopping',
        route: 'List',
        icon: (style) => <Icon name='shopping-bag-outline' fill="black" style={style} />
    },
    {
        title: 'Create List',
        route: 'List',
        icon: (style) => <Icon name='plus-circle-outline' fill="black" style={style} />
    },
]

const HamburgerIcon = (props) => (
    <Icon {...props} name='menu-outline' />
);

const listData = new Array(3).fill({
    title: 'Shopping List',
    description: 'Description for Item',
});

const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(100, 120, 244, ${opacity})`,
            strokeWidth: 2
        }
    ],
    legend: ["Coolness"]
};

const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(10, 100, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
};

export const HomeScreen = ({ navigation }) => {

    const DrawerAction = () => (
        <TopNavigationAction icon={HamburgerIcon} onPress={() => navigation.openDrawer()}/>
    );
    const renderItem = ({ item, index }) => (
        <ListItem
          title={`${item.title} ${index + 1}`}
          description={`${item.description} ${index + 1}`}
        />
    );
    const screenWidth = Dimensions.get("window").width;

    return (
        <SafeAreaView style={styles.root}>
            <View>
                <TopNavigation title='Home' alignment='center' accessoryLeft={DrawerAction}/>
                <Divider/>
                <Layout style={styles.content}>
                    {/* <Text style={styles.text} category="h4">Start shopping!</Text> */}
                    {/* <Text category='h4' status='primary'>
                        Covid Shopping Assistant
                    </Text> */}
                    {/* <List
                        style={styles.container}
                        data={listData}
                        ItemSeparatorComponent={Divider}
                        renderItem={renderItem}
                    /> */}
                    <GridList data={data} onPress={id => navigation.navigate(data[id].route)}/>
                    {/* <Button onPress={() => navigation.push('List')}>OPEN DETAILS</Button> */}
                    <Text style={styles.text} category="h4">COVID-19 in Australia</Text>
                    <LineChart
                        data={chartData}
                        width={screenWidth}
                        height={256}
                        verticalLabelRotation={30}
                        chartConfig={chartConfig}
                        bezier
                    />
                </Layout>
            </View>
        </SafeAreaView>
    );
}