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
                <Heading 
                    category="h6" 
                    style={[styles.heading, { paddingTop: 5, fontWeight:'bold'}]}
                >
                    Settings
                </Heading>
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
                    label={<Text category='h6'>Default Country</Text>}
                    value={countries[countryIndex - 1].name}
                    onSelect={index => setCountry(countries[index - 1].id)}
                >
                    {countries.map(country => (
                        <SelectItem key={country.id} title={country.name}/>
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
                    placeholder={username}
                    value={username}
                    onChangeText={nextValue => setUsername(nextValue)}
                />
            </Layout>
        </View>
    );
};

export default withStyles(SettingsScreen, styles);