import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { List, ListItem, Button } from '@ui-kitten/components';
import { Toggle } from '@ui-kitten/components';
import { SettingsContext } from '../settings-context'

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

// Create icon for the menu
const HamburgerIcon = (props) => (
    <Icon {...props} name='menu-outline' />
);

const settings = [
    {
        title: 'Theme'
    }
]


export const SettingsScreen = ({ navigation }) => {

    const settingsContext = React.useContext(SettingsContext);
    const DrawerAction = () => (
        <TopNavigationAction icon={HamburgerIcon} onPress={() => navigation.openDrawer()}/>
    );

    
    return (
        <SafeAreaView className={styles.root}>
            <TopNavigation title='Settings' alignment='center' accessoryLeft={DrawerAction}/>
            <Divider/>
            <Layout>
                <Button onPress={settingsContext.toggleTheme}>Toggle Theme</Button>
            </Layout>
        </SafeAreaView>
    );
};