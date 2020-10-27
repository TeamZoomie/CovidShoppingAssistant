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
import { getCountry, getAllCountries, getAllTimezones } from 'countries-and-timezones';
import { SettingsContext } from '../settings-context';
import Heading from '../components/Heading';


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

const SettingsScreen = ({ eva, navigation }) => {

    const styles = eva.style;

    // Get the settings context as these variables need to be global
    const settingsContext = React.useContext(SettingsContext);

    // For a list of items
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    // For country index
    const [countryIndex, setCountryIndex] = React.useState(new IndexPath(0));
    const setCountry = (country, index) => {
        setCountryIndex(index);
        settingsContext.setCountry(country);
    };

    // For timezone index
    const [timezoneIndex, setTimezoneIndex] = React.useState(new IndexPath(0));

    const countries = Object.values(Object.values(getAllCountries()));
    const timezones = Object.values(getAllTimezones());
    
    const data = [
        'Light Theme',
        'Dark Theme'
    ];

    const displayValue = data[selectedIndex.row];
    const themeSelectChange = (index) => {
        setSelectedIndex(index);
        settingsContext.toggleTheme();
    };

    const [usingCountryTime, setUsingCountryTime] = React.useState(true);

    // Username
    const [username, setUsername] = React.useState(settingsContext.username);
    return (
        <View style={styles.root}>
            <Layout style={styles.content}>
                <Heading 
                    category="h6" 
                    style={[styles.heading, { paddingTop: 5, fontWeight:'bold'}]}
                >
                            Settings
                </Heading>
                <Select
                    selectedIndex={selectedIndex}
                    label={<Text category='h6'>{'Theme'}</Text>}
                    value={displayValue}
                    onSelect={index => themeSelectChange(index)}>
                    {data.map((title, id) => (
                        <SelectItem key={id} title={title}/>
                    ))}
                </Select>    
                <Divider/>
                <Select 
                    selectedIndex={countryIndex}
                    label={<Text category='h6'>Default Country</Text>}
                    value={(countries)[countryIndex]["name"]}
                    onSelect={index => setCountry(countries[index]["name"], index)}>
                        {(countries).map((title, id) => (
                            <SelectItem key={countries[id]["id"]} title={countries[id]["name"]}/>
                        ))}
                </Select>
                <CheckBox
                    checked={usingCountryTime}  
                    onChange={nextChecked => setUsingCountryTime(nextChecked)}>
                        Use your default country for your timezone?
                </CheckBox>
                {/*
                <Select
                    selectedIndex={timezoneIndex}
                    label={<Text category='h6'>Your timezone</Text>}
                    value={timezones[timezoneIndex]}
                    disabled={!usingCountryTime}
                    onSelect={index => setTimezoneIndex(index)}>
                        {Object.values(timezones)[name].map((title, id) => (
                            <SelectItem key={id} title={title}/>
                        ))}
                </Select>
                        */}
                <Text category='h6'>Username is {username}</Text>
                <Input
                    placeholder={`${username}`}
                    value={username}
                    onChangeText={nextValue => setUsername(nextValue)}
                />
            </Layout>
        </View>
    );
};

export default withStyles(SettingsScreen, styles);