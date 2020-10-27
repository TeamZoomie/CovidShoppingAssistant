import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
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
import ShoppingList, { ShoppingListItem } from '../../components/ShoppingList';
import Heading from '../../components/Heading';
import Page from '../../components/Page';
import { ListsContext } from '../../lists-context';
import { BarCodeScanner} from 'expo-barcode-scanner';
import { FloatingAction } from 'react-native-floating-action';

const styles = (theme) => ({
    searchField: {
        width: '100%',
        padding: 0,
        // borderColor: theme['background-basic-color-2']
    },
    addTextItem: {
        width: '13%',
        height: 18,
        // backgroundColor: theme['background-basic-color-2'],
        // borderColor: theme['background-basic-color-2']//'#A3B2C7'
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2,
        leftMargin: 2
    }
});

const MoreIcon = (props) => (
    <Icon {...props} height={16} name='more-vertical-outline' />
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
                    console.log(error);
                }
            })();
        }
    }, []);

    const itemChecked = (index, checked) => {
        let item = list.items[index];
        if (item.checked !== checked) {
            item.checked = checked;
        }
        listsContext.updateListItem(listId, index, item);
    };

    const addListItem = (name, category) => {
        listsContext.addListItem(listId, { 
            name, 
            category, 
            checked: false 
        });
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
        listsContext.addListItem(listId, { name: `${data}`, checked: false });
    };

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
                <MenuItem title='Print'/>
                <MenuItem
                    title={evaProps => <Text {...evaProps} style={[evaProps.style, { color: 'darkgreen' }]}>Set default</Text>}
                    onPress={() => {
                        setSettingsVisible(false);
                        listsContext.setListActive(listId);
                    }}
                />
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
            <Page
                navigation={navigation}
                header={list.name}
                AccessoryRight={AddAction}
            >
                <View>
                    <Layout style={styles.container}>
                        <View style={{ width: '100%', paddingBottom: 8 }} >
                            {shoppingMode ? (
                                <Button 
                                    style={{ width: '100%' }} 
                                    onPress={() => {
                                        setShoppingMode(false);
                                        navigation.setParams({ shoppingMode: false })
                                    }}
                                >
                                    Finished
                                </Button>
                            ) : (
                                <Button style={{ width: '100%' }} onPress={() => navigation.navigate('StoreSelector', { listId })}>
                                    Start Shopping
                                </Button>
                            )}
                        </View>
                        <Input
                            style={styles.searchField}
                            placeholder='Add new item...'
                            value={addText}
                            onChangeText={nextValue => setAddText(nextValue)}
                            onSubmitEditing={() => {
                                navigation.navigate('Categories');
                            }}
                        />
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
                        <ShoppingList 
                            list={list} 
                            onRemoveItem={removeItem}
                            onItemChecked={itemChecked}
                        />
                    )}
                </ScrollView>
                <FloatingAction
                    actions={floatingButtonActions}
                    onPressItem={name => {
                        if (name === "TextButton") {
                            navigation.navigate('Categories');
                        } else {
                            setScanMode(true);
                        }
                    }}
                />
            </Page>
        )
    );
};

export default React.memo(withStyles(ListScreen, styles), (props, nextProps) => {
    return !(props.navigation.isFocused() || nextProps.navigation.isFocused());
});