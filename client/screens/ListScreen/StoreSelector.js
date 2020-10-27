import React, { useState, useEffect, useRef, Fragment } from 'react';
import { ScrollView, View } from 'react-native';
import { 
    Input,
    Icon,
    Layout,
    TopNavigation, 
    TopNavigationAction, 
    Text,
    withStyles,
    Divider,
    Spinner
} from '@ui-kitten/components';
import * as Location from 'expo-location';
import debounce from "lodash.debounce";
import Heading from '../../components/Heading';
import StoreList from '../../components/StoreList';
import { getPlacesNearby } from '../../api/GooglePlacesAPI';
import { getPlaceLiveBusyness } from '../../api/BackendServicesAPI';
import { getCurrentBusynessFromTimezone } from '../../helpers';
import { SettingsContext } from '../../settings-context';

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

// hack
let globalBusyness = {};
let globalPopulartimes = {};

const StoreSelectorScreen = ({ route, eva, navigation }) => {

    const styles = eva.style;
    const [searchText, setSearchText] = useState('');
    const [stores, setStores] = useState([]);
    const [busyness, setBusyness] = useState(globalBusyness);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [lastUpdate, setLastUpdate] = useState((new Date().getTime()));

    const MAX_STORES = 10;

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                }
                let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                setLocation(location);
                getStores(searchText, location);

            } catch (error) {
                setLoading(false);
                setError(true);
            }
        })();
    }, []);

    const confirmStore = (id) => {
        // Issue where user selects store before populartimes request has finished. 
        // This results in busyness data being undefined
        navigation.navigate('ShoppingIntro', {
            store: stores[id],
            listId: route.params.listId,
            populartimes: globalPopulartimes[stores[id].placeId],
            currentBusyness: globalBusyness[stores[id].placeId],
        });
    };

    const getStores = (text, location) => {
        setLoading(true);
        const searchParams = { 
            keyword: text, 
            type: 'store', 
            rankby: 'distance',
            location: location.coords.latitude + ',' + location.coords.longitude, 
            // radius: 20 // 20km
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
                        secondaryText: store.vicinity
                    }))
                );
                
                for (let i = 0; i < Math.min(MAX_STORES, payload.results.length); i++) {
                    const placeId = payload.results[i].place_id;
                    if (!(placeId in globalBusyness)) {
                        getPlaceLiveBusyness(placeId)
                            .then(data => {
                                // globalBusyness[placeId] = data.current_popularity; --> This seems wrong
                                globalBusyness[placeId] = getCurrentBusynessFromTimezone(SettingsContext.timezone);
                                globalPopulartimes[placeId] = data.populartimes;

                                // God dam this is stupidly hacky... sorry
                                setLastUpdate((new Date().getTime()))
                            })
                            .catch(error => console.log(placeId, error));
                    }
                }
            })
            .catch(error => setError(true));
    };
    
    const debouncedTextChange = useRef(debounce((nextValue, location) => {
        if (nextValue !== '') {
            getStores(nextValue, location);
        }
    }, 750)).current;

    // Need to setup debounce.
    const onSearchTextChange = (value) => {
        debouncedTextChange(value, location);
        setSearchText(value);
    };

    const BackAction = () => (
        <TopNavigationAction 
            icon={BackIcon} 
            onPress={() => {
                navigation.navigate('List', { 
                    screen: 'Main',
                    params: { shoppingMode: false }
                })
            }} 
        />
    );

    // const ConfirmAction = () => (
    //     <TopNavigationAction icon={ConfirmIcon} onPress={confirmStore}/>
    // );
    
    return (
        <View style={styles.root}>
            <TopNavigation 
                title="Select Store"
                alignment='center' 
                accessoryLeft={BackAction}
                // accessoryRight={ConfirmAction}
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
                            <StoreList 
                                stores={stores} 
                                onPress={id => confirmStore(id)} 
                                busynessData={busyness}
                            />
                        </Fragment>
                    )}
                </View>
            </Layout>
        </View>
    );
};

export default withStyles(StoreSelectorScreen, styles);