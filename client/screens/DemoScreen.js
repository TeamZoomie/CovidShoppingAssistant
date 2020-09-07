import React from 'react';
import { Header, ScrollView, View, Image } from 'react-native';
import {
    Input, 
    Text,
    Divider, 
    Icon,
    Button,
    Layout, 
    TopNavigation, 
    TopNavigationAction, 
    OverflowMenu,
    MenuItem,
    withStyles,
    useTheme
} from '@ui-kitten/components';

const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    searchField: {
        width: '100%'
    },
    h1: {
      fontSize: 30,
        fontWeight: "bold",
        color: '#398AD7',

    },
    text: {
   fontSize: 20,
     color: '#444444',
        },
});

// Hamburger Icon
const HamburgerIcon = (props) => (
    <Icon {...props} name='menu-outline' />
);

const AddIcon = (props) => (
    <Icon {...props} name='shopping-cart-outline' />
);

const DemoScreen = ({ navigation, eva }) => {

    const DrawerAction = () => (
        <TopNavigationAction icon={HamburgerIcon} onPress={() => navigation.openDrawer()}/>
    );
    const styles = eva.style;
    return (
        <View style={styles.root}>
             <TopNavigation
                title='My Lists'
                alignment='center'
                accessoryLeft={DrawerAction}
              />
            <Divider/>
            <Layout style={styles.content}>
            <Text style={styles.h1} >Your List is Empty</Text>
                <Text style={styles.text}>
                    Create list for an easier shopping experience
                </Text>
                <Button>
       BUTTON
</Layout>
        </View>
    );
}

export default withStyles(DemoScreen, styles);