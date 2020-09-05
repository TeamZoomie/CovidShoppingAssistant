import React from 'react';
import { ScrollView, View } from 'react-native';
import { 
    Input,
    Icon,
    Layout,
    TopNavigation, 
    TopNavigationAction, 
    Text,
    Button,
    withStyles,
    Divider,
} from '@ui-kitten/components';
import Heading from '../components/Heading';
import { getPlacesAutocomplete } from '../api/GooglePlacesAPI';

const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
        justifyContent: 'space-between'
    },
    content: {
        padding: 16,
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});

const ConfirmIcon = (props) => (
    <Icon {...props} name='checkmark-outline' />
);
const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);

const StoreSelectorScreen = ({ eva, navigation }) => {

    const styles = eva.style;
    const [searchText, setSearchText] = React.useState('');
    const confirmStore = () => {
        navigation.navigate("ShoppingIntro");
    };
    const getStores = () => {
        getPlacesAutocomplete({ input: searchText, type: 'establishment' }, error => {
            console.log(error)
        });
        // Do stuff
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => navigation.navigate("List", { shoppingMode: false })}/>
    );
    const ConfirmAction = () => (
        <TopNavigationAction icon={ConfirmIcon} onPress={confirmStore}/>
    );
    return (
        <View style={styles.root}>
            <TopNavigation 
                title="Select Store"
                alignment='center' 
                accessoryLeft={BackAction}
                accessoryRight={ConfirmAction}
            />
            <Divider/>
            <Layout style={styles.content}>
                <View>
                    <Heading category="c2">Enter Place, Location or Store</Heading>
                    <Input
                        placeholder="Search"
                        value={searchText}
                        onChangeText={value => setSearchText(value)}
                        style={{ paddingBottom: 24 }}
                    />
                    <Button onPress={getStores}>Test Search</Button>
                </View>
            </Layout>
            {/* <GooglePlacesAutocomplete
                placeholder='Search'
                // fetchDetails={true}
                onPress={(data, details) => {
                    console.log(data, details);
                }}
                GooglePlacesSearchQuery={{ types: ['grocery'] }}
                onFail={(error) => console.error(error)}
                query={{
                    key: GOOGLE_API_KEY,
                    language: 'en',
                    components: 'country:aus',
                    types: 'establishment'
                }}
                enablePoweredByContainer={false}
            /> */}
        </View>
    );
};

export default withStyles(StoreSelectorScreen, styles);