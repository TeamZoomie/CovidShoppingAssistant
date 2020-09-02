import React from 'react';
import { View } from 'react-native';
import { 
    CheckBox,
    Input,
    Radio, 
    RadioGroup,
    Divider, 
    Icon, 
    Layout, 
    TopNavigation, 
    TopNavigationAction,
    Toggle,
    Text,
    IndexPath, 
    Select, 
    SelectItem,
    withStyles
} from '@ui-kitten/components';
import { SettingsContext } from '../settings-context';


const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2']
    },
    content: {
        padding: 16,
    },
    text: {
        fontWeight: "700",
        textAlign: 'left',
        marginHorizontal: 8
    }
});

// Create icon for the menu
const HamburgerIcon = (props) => (
    <Icon {...props} name='menu-outline' />
);

const SettingsScreen = ({ eva, navigation }) => {

    const styles = eva.style;

    // Get the settings context as these variables need to be global
    const settingsContext = React.useContext(SettingsContext);

    // For a list of items
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    
    const data = [
        'Light Theme',
        'Dark Theme'
    ];

    const displayValue = data[selectedIndex.row];
    const themeSelectChange = (index) => {
        setSelectedIndex(index);
        settingsContext.toggleTheme();
    };

    const renderOption = (title, id) => (
        <SelectItem key={id} title={title}/>
      );

    // For the toggle of themes between light and dark
    const [lightTheme, setLightTheme] = React.useState(false);

    const themeChange = (isChecked) => {
        setLightTheme(isChecked);
        settingsContext.toggleTheme();  
    };

    // Username
    const [username, setUsername] = React.useState(settingsContext.username);

    // For the radio buttons
    const [selectedRadioIndex, setSelectedRadioIndex] = React.useState(0);

    const themeRadioChange = (index) => {
        setSelectedRadioIndex(index);
        settingsContext.toggleTheme();
    };

    // For the checkboxes
    const [checkedBoxes, setCheckedBoxes] = React.useState(false);

    const themeBoxChange = (isChecked) => {
        setCheckedBoxes(isChecked);
        settingsContext.toggleTheme();
    };

    // Define the drawer action
    const DrawerAction = () => (
        <TopNavigationAction icon={HamburgerIcon} onPress={() => 
            navigation.openDrawer()}/>
    );
    
    return (
        <View style={styles.root}>
            <TopNavigation title='Settings' alignment='center' accessoryLeft={DrawerAction}/>
            <Divider/>
            <Layout style={styles.content}>
                <Toggle checked={lightTheme} onChange={themeChange}>
                        {'Dark Theme'}
                </Toggle> 
                <Divider/>
                <Text>Username is {username}</Text>
                <Input
                    placeholder={`${username}`}
                    value={username}
                    onChangeText={nextValue => setUsername(nextValue)}
                />
                <Divider/>
                <Select
                    selectedIndex={selectedIndex}
                    label={<Text category='h6'>{'Theme'}</Text>}
                    value={displayValue}
                    onSelect={index => themeSelectChange(index)}>
                    {data.map(renderOption)}
                </Select>                   
                <Divider/>
                <Text style={styles.text} category='h6'>
                    {'Set Theme'}
                </Text>
                <RadioGroup
                    selectedIndex={selectedRadioIndex}
                    onChange={index => themeRadioChange(index)}
                >
                    <Radio>Light Theme</Radio>
                    <Radio>Dark Theme</Radio>
                </RadioGroup>
                <Divider/>
                <CheckBox 
                    checked={checkedBoxes} 
                    value={checkedBoxes}
                    onValueChange={nextChecked => themeBoxChange(nextChecked)}>
                </CheckBox>
                <Text style={styles.text} category='h6'>
                    {checkedBoxes ? "Dark Theme Selected" : "Light Theme Selected"}
                </Text>
            </Layout>
        </View>
    );
};

export default withStyles(SettingsScreen, styles);