// TODO Tidy up imports
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { List, ListItem, Button } from '@ui-kitten/components';
import { Toggle } from '@ui-kitten/components';
import { SettingsContext } from '../settings-context';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Text } from '@ui-kitten/components';
import { Radio, RadioGroup} from '@ui-kitten/components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
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

    // Get the settings context as these variables need to be global
    const settingsContext = React.useContext(SettingsContext);

    // For a list of items
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    const themeSelectChange = (index) => {
        setSelectedIndex(index);
        settingsContext.toggleTheme();
    };

    // For the toggle of themes between light and dark
    const [lightTheme, setLightTheme] = React.useState(false);

    const themeChange = (isChecked) => {
        setLightTheme(isChecked);
        settingsContext.toggleTheme();  
    };

    // For the radio buttons
    const [selectedRadioIndex, setSelectedRadioIndex] = React.useState(0);

    const themeRadioChange = (index) => {
        setSelectedRadioIndex(index);
        settingsContext.toggleTheme();
    };

    // Define the drawer action
    const DrawerAction = () => (
        <TopNavigationAction icon={HamburgerIcon} onPress={() => navigation.openDrawer()}/>
    );



    
    return (
        <SafeAreaView className={styles.root}>
            <TopNavigation title='Settings' alignment='center' accessoryLeft={DrawerAction}/>
            <Divider/>
            <Layout style={styles.container}>
                <Select
                    selectedIndex={selectedIndex}
                    label={<Text category='h6'>{'Theme'}</Text>}
                    onSelect={index => themeSelectChange(index)}>
                    <SelectItem title='Light Theme'/>
                    <SelectItem title='Dark Theme'/>
                </Select>                
            <Divider/>
                <Toggle checked={lightTheme} onChange={themeChange}>
                    {'Dark Theme'}
                </Toggle>    
            <Divider/>
                <Text category='h6'>
                    {'Set Theme'}
                </Text>

                <RadioGroup
                    selectedIndex={selectedRadioIndex}
                    onChange={index => themeRadioChange(index)}>
                        <Radio>Light Theme</Radio>
                        <Radio>Dark Theme</Radio>
                </RadioGroup>
            <Divider/>

            </Layout>
        </SafeAreaView>
    );
};