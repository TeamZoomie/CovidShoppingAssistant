import React, { useState, useEffect, Fragment } from 'react';
import { ScrollView, View } from 'react-native';
import { 
    Card,
    Input,
    Icon,
    Layout,
    TopNavigation, 
    TopNavigationAction, 
    Text,
    Button,
    withStyles,
    Divider,
    Spinner
} from '@ui-kitten/components';
import * as Location from 'expo-location';
import Heading from '../components/Heading';
import StoreList from '../components/StoreList';
import { getPlacesNearby } from '../api/GooglePlacesAPI';

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
    errorText: {
        color: theme['color-primary-default']
    }
});

const ConfirmIcon = (props) => (
    <Icon {...props} name='checkmark-outline' />
);
const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);

const StoreSelectorScreen = ({ eva, navigation }) => {

    const styles = eva.style;
    const [searchText, setSearchText] = useState('');
    const [stores, setStores] = useState([]);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                }
            
                let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                setLocation(location);
                getStores(location);

            } catch (error) {
                setLoading(false);
                setError(true);
            }
        })();
    }, []);

    const confirmStore = (id) => {
        navigation.navigate("ShoppingIntro", stores[id]);
    };

    const getStores = (location) => {
        setLoading(true);
        const searchParams = { 
            keyword: searchText, 
            type: 'supermarket', 
            rankby: 'distance',
            location: location.coords.latitude + ',' + location.coords.longitude, 
            // radius: 20000 // 20km
        };
        getPlacesNearby(searchParams)
            .then(payload => {
                setLoading(false);
                if (payload.status === 'REQUEST_DENIED') {
                    setError(true);
                }
                setStores(
                    payload.results.map(store => ({
                        icon: store.icon,
                        placeId: store.place_id,
                        mainText: store.name,
                        secondaryText: store.vicinity,
                    }))
                );
            })
            .catch(error => setError(true));
    };
    const onSearchTextChange = (value) => {
        // Need to setup debounce.
        if (value !== '' && value.length > 3) {
            getStores(location)
        }
        setSearchText(value);
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
                        onChangeText={onSearchTextChange}
                        style={{ paddingBottom: 16 }}
                    />
                </View>
                <View style={loading || error ? { flexGrow: 1, alignItems: 'center', justifyContent: 'center' } : { flexGrow: 1 }}>
                    {loading || error ? (
                        error ? (
                            <Fragment>
                                <Heading category="h6" style={styles.errorText}>
                                    Could not get location.
                                </Heading>
                                <Text category="c1" style={{ fontWeight: "300" }}>
                                    An error occured...
                                </Text>
                            </Fragment>
                        ) : (
                            <Spinner size='giant'/>
                        )
                    ) : (
                        <Fragment>
                            <Heading category="c2">Results</Heading>
                            <StoreList stores={stores} onPress={id => confirmStore(id)} />
                        </Fragment>
                    )}
                </View>
            </Layout>
        </View>
    );
};

export default withStyles(StoreSelectorScreen, styles);