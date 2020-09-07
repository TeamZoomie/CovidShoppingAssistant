import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { 
    Input, 
    Text,
    Divider, 
    Icon,
    Button,
    Layout, 
    TopNavigation, 
    TopNavigationAction, 
    OverflowMenu,
    MenuItem,
    withStyles,
    useTheme
} from '@ui-kitten/components';
import ShoppingList from '../components/ShoppingList';
import Heading from '../components/Heading';
import { ListsContext } from '../lists-context';
import { BarCodeScanner} from 'expo-barcode-scanner';


const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    searchField: {
        width: '100%'
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 0
    }
});

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);

const AddIcon = (props) => (
    <Icon {...props} height={16} name='plus-circle-outline' />
);

const MoreIcon = (props) => (
    <Icon {...props} height={16} name='more-vertical-outline' />
);

// TODO Make a barcode icon
const BarcodeIcon = (props) => (
    <Icon {...props} name='camera-outline' />
);

const ListScreen = ({ route, navigation, eva }) => {

    const styles = eva.style;
    const listsContext = React.useContext(ListsContext);
    const theme = useTheme();

    const [addText, setAddText] = React.useState('');
    const [settingsVisible, setSettingsVisible] = React.useState(false);
    const [shoppingMode, setShoppingMode] = React.useState(route.params?.shoppingMode || false);

    // For barcode scanner
    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);
    const [scanMode, setScanMode] = React.useState(false);

    const { listId } = route.params;
    const list = listsContext.lists[listId];
    
    useEffect(() => {
        if (shoppingMode !== route.params?.shoppingMode) {
            setShoppingMode(route.params.shoppingMode);
        }
    }, [route.params?.shoppingMode]);

    // Get the necessary permissions to use the camera
    useEffect(() => {
		(async () => {
            try {
                const { status } = await BarCodeScanner.requestPermissionsAsync();
		        setHasPermission(status === 'granted');
            } catch (error) {
                console.log(error);
            }
		})();
    }, []);

    const addListItem = () => {
        if (addText !== '') {
            listsContext.addListItem(listId, { name: addText, checked: false });
            setAddText('');
        }
    };

    const removeItem = (index) => {
        listsContext.removeListItem(listId, index);
    };

    const removeList = () => {
        setSettingsVisible(false);
        navigation.navigate("Home");
        listsContext.removeList(listId);

    };

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setScanMode(false);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        addListItem(data)
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/>
    );

    const AddAction = () => (
        <View style={styles.buttonContainer}>
            <OverflowMenu
                anchor={() => <TopNavigationAction icon={MoreIcon} onPress={() => setSettingsVisible(true)}/>}
                visible={settingsVisible}
                placement="bottom"
                onBackdropPress={() => setSettingsVisible(false)}
            >
                <MenuItem title='Edit List'/>
                <MenuItem title='Share'/>
                <MenuItem title='Print' onPress={() => print()}/>
                <MenuItem
                    title={evaProps => <Text {...evaProps} style={[evaProps.style, { color: 'darkred' }]}>Delete</Text>}
                    onPress={removeList}
                />
            </OverflowMenu>
        </View>
    );

    if (!list || Object.keys(list).length === 0) {
        return <View><Text>No List</Text></View>;
    }
    return (
        scanMode ? (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}
            >
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                <Button onPress={() => setScanMode(false)}>
                    Stop Scanning
                </Button>
            </View>
        ) : (
            <View style={styles.root}>
                <TopNavigation 
                    title={list.name} 
                    alignment='center' 
                    accessoryLeft={BackAction}
                    accessoryRight={AddAction}
                />
                <Divider/>
                <Layout style={styles.content}>
                    <View>
                        <Input
                            style={styles.searchField}
                            placeholder='Add new item...'
                            value={addText}
                            onChangeText={nextValue => setAddText(nextValue)}
                            onSubmitEditing={addListItem}
                        />
                        <Layout style={styles.container}>
                            <Button 
                                style={styles.button} 
                                appearance='filled' 
                                accessoryLeft={AddIcon}
                                onPress={addListItem}
                            >
                                From Text
                            </Button>
                            <Button accessoryLeft={BarcodeIcon} onPress={() => setScanMode(true)}>
                                From Barcode
                            </Button>
                        </Layout>  
                    </View>
                    <ScrollView 
                        contentContainerStyle={list.items.length === 0 ? { flexGrow: 1, alignItems: 'center', justifyContent: 'center' } : {}}
                    >
                        {list.items.length === 0 ? (
                            <View style={{ textAlign: 'center', alignItems: 'center' }}>
                                <Heading category="h6" style={{ color: theme['color-primary-default'] }}>
                                    Your list is empty.
                                </Heading>
                                <Text category="c1" style={{ fontWeight: "300" }}>
                                    Add an item by entering a name into the field above.
                                </Text>
                            </View>
                        ) : (
                            <ShoppingList data={list.items} onRemoveItem={removeItem}/>
                        )}
                    </ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 32 }}>
                        {shoppingMode ? (
                            <Button 
                                style={{ width: '50%' }} 
                                onPress={() => {
                                    setShoppingMode(false);
                                    navigation.setParams({ shoppingMode: false })
                                }}
                            >
                                Finished
                            </Button>
                        ) : (
                            <Button style={{ width: '50%' }} onPress={() => navigation.navigate("StoreSelector")}>
                                Start Shopping
                            </Button>
                        )}
                    </View>
                </Layout>
            </View>
        )
    );
}

export default withStyles(ListScreen, styles);