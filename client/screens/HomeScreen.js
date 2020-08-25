import React from 'react';
import { View } from 'react-native';
import { Text, Input, Divider, Icon, Layout, TopNavigation, TopNavigationAction, withStyles } from '@ui-kitten/components';
import GridList from '../components/GridList';
import ShoppingLists from '../components/ShoppingLists';
import data from '../data';

const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2']
    },
    layout: {
        padding: 16,
    },
    header: {
        paddingBottom: 16
    },
    text: {
        fontWeight: "700",
        textAlign: 'left',
        marginHorizontal: 8
    },
    container: {
        maxHeight: 200,
        margin: 20,
        borderColor: '#eee',
        borderWidth: 2
    }
});

const uiData = [
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

const HomeScreen = ({ eva, navigation }) => {

    const styles = eva.style;
    const DrawerAction = () => (
        <TopNavigationAction icon={HamburgerIcon} onPress={() => navigation.openDrawer()}/>
    );
    const [value, setValue] = React.useState('');

    return (
        <View style={styles.root}>
            <TopNavigation title='Home' alignment='center' accessoryLeft={DrawerAction}/>
            <Divider/>
            <View style={styles.layout}>
                <Layout>
                    <View style={styles.header}>
                        <Text style={styles.text} category="h4">Welcome</Text>
                    </View>
                    <Input
                        placeholder='Search...'
                        value={value}
                        onChangeText={nextValue => setValue(nextValue)}
                    />
                    <ShoppingLists 
                        data={data.lists} 
                        onPress={item => {
                            navigation.navigate('List', item);
                        }} 
                    />
                    <GridList data={uiData} onPress={id => navigation.navigate(uiData[id].route)}/>
                </Layout>
            </View>
        </View>
    );
}

export default withStyles(HomeScreen, styles);