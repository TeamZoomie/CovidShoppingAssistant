/**
 * Defines the screen for the settings page, allowing the user to change parts
 * of their experience using the app.
 */

import React from 'react';
import { View } from 'react-native';
import { 
    CheckBox,
    Input,
    Divider, 
    Layout, 
    Text,
    IndexPath, 
    Select, 
    SelectItem,
    withStyles
} from '@ui-kitten/components';
import { getAllCountries, getAllTimezones } from 'countries-and-timezones';
import { SettingsContext } from '../settings-context';
import CenteredHeading from '../components/CenteredHeading';

// Defines the styles for this page
const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-1'],
        padding: 2
    },
    content: {
        padding: 16,
    },
    text: {
        fontWeight: "700",
        textAlign: 'left',
        marginHorizontal: 8,
    }
});

// Useful constant definitions for the list of countries
const countries = Object.values(getAllCountries());
const countriesMap = {};
for (let [id, country] of countries.entries()) {
    countriesMap[country.id] = id;
}

const timezones = Object.values(getAllTimezones());

const themeOptions = [
    'Light Theme',
    'Dark Theme'
];

/**
 * Define the screen.
 */
const SettingsScreen = ({ eva, navigation }) => {

    const styles = eva.style;

    // Get the settings context as these variables need to be global
    const settingsContext = React.useContext(SettingsContext);

    // For a list of items
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    // For country index
    const countryPos = countriesMap[settingsContext.country];
    const countryIndex = new IndexPath(countryPos);

    const setCountry = (countryId) => {
        settingsContext.setCountry(countryId);
    };

    // For timezone index
    const [timezoneIndex, setTimezoneIndex] = React.useState(new IndexPath(0));
    

    const displayValue = themeOptions[selectedIndex.row];
    const themeSelectChange = (index) => {
        setSelectedIndex(index);
        settingsContext.toggleTheme(['light', 'dark'][index - 1]);
    };

    const [usingCountryTime, setUsingCountryTime] = React.useState(true);

    // Username
    const [username, setUsername] = React.useState(settingsContext.username);
    return (
        <View style={styles.root}>
            <Layout style={styles.content}>
                <CenteredHeading 
                    category="h4" 
                    style={[styles.heading, { paddingTop: 5, fontWeight:'bold'}]}
                >
                    Settings
                </CenteredHeading>
                <Select
                    selectedIndex={selectedIndex}
                    label={<Text category='h6'>Theme</Text>}
                    value={displayValue}
                    onSelect={index => themeSelectChange(index)}
                >
                    {themeOptions.map((title, id) => (
                        <SelectItem key={id} title={title}/>
                    ))}
                </Select> 
                <Divider/>
                <Select 
                    selectedIndex={countryIndex}
                    label={<Text category='h6'> {'\n'} Default Country</Text>}
                    value={countries[countryIndex - 1].name}
                    onSelect={index => setCountry(countries[index - 1].id)}
                >
                    {countries.map(country => (
                        <SelectItem key={country.id} title={country.name}/>
                    ))}
                </Select>
                {/*
                <Select
                    selectedIndex={timezoneIndex}
                    label={<Text category='h6'> {'\n'} Your timezone</Text>}
                    value={timezones[timezoneIndex-1].name}
                    disabled={!usingCountryTime}
                    onSelect={index => setTimezoneIndex(index)}>
                        {Object.values(timezones)[name].map((title, id) => (
                            <SelectItem key={id} title={title}/>
                        ))}
                </Select>
                        */}
                <CheckBox
                    checked={usingCountryTime}  
                    onChange={nextChecked => setUsingCountryTime(nextChecked)}>
                        Use your default country for your timezone?
                </CheckBox>
                <Text category='h6'> {'\n'}Username is {username}</Text>
                <Input
                    placeholder={username}
                    value={username}
                    onChangeText={nextValue => setUsername(nextValue)}
                />
                <Text style={styles.text}>
                    {"\n\n\n\n"}
                    Note: We ask for your location data to provide certain 
                    services in our app. We will not use them for anything
                    other than improving your shopping experience. If you
                    do not wish to use these services, deny this app the 
                    permissions to use those sensors, however this will make
                    our interactive shopping experience unavailable.
                </Text>
            </Layout>
        </View>
    );
};

export default withStyles(SettingsScreen, styles);