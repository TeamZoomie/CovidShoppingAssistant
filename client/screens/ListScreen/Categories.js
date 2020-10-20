import React from 'react';
import { View, ScrollView } from 'react-native';
import { 
    Icon,
    Text,
    Button,
    withStyles
} from '@ui-kitten/components';
import GridList from '../../components/GridList';
import Page from '../../components/Page';

const categories = [
    {
        title: 'Dairy',
        category: 'Dairy',
        icon: (style) => <Icon name='shopping-bag-outline' fill="black" style={style} />
    },
    {
        title: 'Meat',
        category: 'Meat',
        icon: (style) => <Icon name='plus-circle-outline' fill="black" style={style} />
    },
    {
        title: 'Fruit & Vegetables',
        category: 'fruitVeg',
        icon: (style) => <Icon name='shopping-bag-outline' fill="black" style={style} />
    },
    {
        title: 'Create List',
        category: 'List',
        icon: (style) => <Icon name='plus-circle-outline' fill="black" style={style} />
    },
    {
        title: 'Start Shopping',
        category: 'List',
        icon: (style) => <Icon name='shopping-bag-outline' fill="black" style={style} />
    },
    {
        title: 'Create List',
        category: 'List',
        icon: (style) => <Icon name='plus-circle-outline' fill="black" style={style} />
    },
    {
        title: 'Start Shopping',
        category: 'List',
        icon: (style) => <Icon name='shopping-bag-outline' fill="black" style={style} />
    },
    {
        title: 'Create List',
        category: 'List',
        icon: (style) => <Icon name='plus-circle-outline' fill="black" style={style} />
    }
];

const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
});

const ModalScreen = ({ navigation }) => {
    return (
        <Page 
            header="Set category"
            showDivider={false}
            navigation={navigation}
        >
            <GridList 
                data={categories}
                onPress={id => navigation.navigate('List', {
                    screen: 'Main',
                    params: { category: categories[id].category }
                })}
            />
            {/* <ScrollView>
                <Text style={{ fontSize: 30 }}>This is a modal!</Text>
                <Button onPress={() => navigation.goBack()}>
                    Dismiss
                </Button>
            </ScrollView> */}
        </Page>
    );
}

export default withStyles(ModalScreen, styles);