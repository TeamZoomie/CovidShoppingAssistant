import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { 
    Input, 
    Text,
    Icon,
    Button,
    Layout, 
    TopNavigationAction, 
    OverflowMenu,
    MenuItem,
    withStyles,
    useTheme
} from '@ui-kitten/components';
import ShoppingList from '../../components/ShoppingList';
import Heading from '../../components/Heading';
import Page from '../../components/Page';
import { ListsContext } from '../../lists-context';
import { BarCodeScanner} from 'expo-barcode-scanner';


// Define the styles for this screen
const styles = (theme) => ({
    searchField: {
        width: '72%',
        padding: 0,
    },
    addTextItem: {
        width: '13%',
        height: 18,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2,
        leftMargin: 2
    }
});

/**
 * Defines the icon for the menu for more options
 */
const MoreIcon = (props) => (
    <Icon {...props} height={16} name='more-vertical-outline' />
);

/**
 * Defines the icon for the adding an item via text to the list.
 */
const AddIcon = () => (
    <Icon height={16} width={16} fill="white" name='plus-circle-outline' />
);

/**
 * Defines the icon for adding via a barcode scanner.
 */
const BarcodeIcon = () => (
    <Image 
        source = {require("../../assets/barcode.png")}
        style = {{ width: 16, height: 20, tintColor: 'white' }} 
    />
);

// Actions for the floating button to do
const floatingButtonActions = [
    {
        text: 'Enter a product name',
        name: 'TextButton',
        icon: require("../../assets/list.png"),
        position: 1
    },
    {
        text: 'Scan a barcode',
        name: 'BarcodeButton',
        icon: require("../../assets/barcode.png"),
        position: 2
    }
]

//= React.memo(
function ListScreen(props) {

    const { route, navigation, eva } = props;
    const styles = eva.style;
    const listsContext = React.useContext(ListsContext);
    const theme = useTheme();

    const [addText, setAddText] = React.useState('');
    const [itemCategory, setItemCategory] = React.useState('');
    const [settingsVisible, setSettingsVisible] = React.useState(false);
    const [shoppingMode, setShoppingMode] = React.useState(false);

    // For barcode scanner
    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);
    const [scanMode, setScanMode] = React.useState(false);

    const { listId } = route.params;
    const list = listsContext.lists[listId];

    useEffect(() => {
        if (addText !== '' && route.params?.category !== undefined) {
            addListItem(addText, route.params?.category);
            navigation.setParams({ category: undefined });
            setAddText('');
        }
    }, [route.params?.category]);

    // Get the necessary permissions to use the camera
    useEffect(() => {
        if (!hasPermission) {
            (async () => {
                try {
                    const { status } = await BarCodeScanner.requestPermissionsAsync();
                    setHasPermission(status === 'granted');
                } catch (error) {
                    setHasPermission(false);
                    console.log(error);
                }
            })();
        }
    }, []);

    /**
     * Handles checking of items in their checkboxes.
     */
    const itemChecked = (index, checked) => {
        let item = list.items[index];
        if (item.checked !== checked) {
            item.checked = checked;
        }
        listsContext.updateListItem(listId, index, item);
    };

    /**
     * Adds an item to the list.
     */
    const addListItem = (name, category) => {
        listsContext.addListItem(listId, { 
            name, 
            category, 
            checked: false 
        });
    };
    
    /**
     * Handles removing an item from the list.
     */
    const removeItem = (index) => {
        listsContext.removeListItem(listId, index);
    };

    /**
     * Handles removing a list.
     */
    const removeList = () => {
        setSettingsVisible(false);
        navigation.navigate("Home");
        listsContext.removeList(listId);
    };

    /**
     * Handles what happens when the barcode scanner scans a barcode.
     */
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setScanMode(false);
        alert(`Bar code ${data} has been scanned!`);
    };

    const AddAction = () => (
        <View style={styles.buttonContainer}>
            <OverflowMenu
                anchor={() => <TopNavigationAction 
                    icon={MoreIcon} 
                    onPress={() => setSettingsVisible(true)}
                />}
                visible={settingsVisible}
                placement="bottom"
                onBackdropPress={() => setSettingsVisible(false)}
            >
                <MenuItem title='Edit List'/>
                <MenuItem title='Share'/>
                <MenuItem title='Print'/>
                <MenuItem
                    title={evaProps => <
                        Text {...evaProps} style={
                            [evaProps.style, { color: 'darkgreen' }]
                        }>Set default</Text>}
                    onPress={() => {
                        setSettingsVisible(false);
                        listsContext.setListActive(listId);
                    }}
                />
                <MenuItem
                    title={evaProps => <Text {...evaProps} style={
                        [evaProps.style, { color: 'darkred' }
                    ]}>Delete</Text>}
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
            <Page
                navigation={navigation}
                header={list.name}
                AccessoryRight={AddAction}
                backAction={() => navigation.navigate("Home")}
            >
                <View>
                    <Layout style={styles.container}>
                        <Input
                            style={styles.searchField}
                            placeholder='Add new item...'
                            value={addText}
                            onChangeText={nextValue => setAddText(nextValue)}
                            onSubmitEditing={() => {
                                if (addText !== '') {
                                    navigation.navigate('Categories');
                                }
                            }}
                        />
                        <Button 
                            style={styles.addTextItem} 
                            // appearance='ghost' 
                            accessoryLeft={AddIcon}
                            onPress={() => {
                                navigation.navigate('Categories');
                            }}
                        />                           
                        <Button 
                            style={styles.addTextItem}
                            accessoryLeft={BarcodeIcon}
                            onPress={() => setScanMode(true)}
                        />
                    </Layout>
                </View>
                <ScrollView 
                    contentContainerStyle={
                        list.items.length === 0 ? { 
                            flexGrow: 1, 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        } : {}
                    }
                >
                    {list.items.length === 0 ? (
                        <View style={
                            { textAlign: 'center', 
                            alignItems: 'center' }
                        }>
                            <Heading 
                                category="h6" 
                                style={{ color: theme['color-primary-default'] 
                            }}>
                                Your list is empty.
                            </Heading>
                            <Text category="c1" style={{ fontWeight: "300" }}>
                            Add an item by entering a name into the field above.
                            </Text>
                        </View>
                    ) : (
                        <ShoppingList 
                            list={list} 
                            onRemoveItem={removeItem}
                            onItemChecked={itemChecked}
                        />
                    )}
                </ScrollView>
                <View style={{ 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        padding: 32 
                    }}>
                    <Button 
                        style={{ width: 256 }} 
                        onPress={() => 
                            navigation.navigate("StoreSelector", { listId })}
                    >
                        Start Shopping
                    </Button>
                </View>
            </Page>
        )
    );
};

export default React.memo(withStyles(ListScreen, styles), 
        (props, nextProps) => {
    return !(props.navigation.isFocused() || nextProps.navigation.isFocused());
});