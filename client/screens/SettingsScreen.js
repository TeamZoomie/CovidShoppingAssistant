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

    // Username
    const [username, setUsername] = React.useState(settingsContext.username);
    return (
        <View style={styles.root}>
            <Layout style={styles.content}>
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