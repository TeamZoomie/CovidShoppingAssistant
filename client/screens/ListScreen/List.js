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

const AddIcon = () => (
    <Icon height={16} width={16} fill="white" name='plus-circle-outline' />
);

const MoreIcon = (props) => (
    <Icon {...props} height={16} name='more-vertical-outline' />
);

const BarcodeIcon = () => (// TODO Make a barcode icon
    <Image 
        source = {require("../../assets/barcode-solid.png")}
        style = {{ width: 24, height: 24, tintColor: 'white' }} 
    />
);

// Actions for the floating button to do
const floatingButtonActions = [
    {
        text: 'Enter a product name',
        name: 'TextButton',
        icon: require("../../assets/list-24px.svg"),
        position: 1
    },
    {
        text: 'Scan a barcode',
        name: 'BarcodeButton',
        icon: require("../../assets/list-24px.svg"),
        position: 2
    }
]

const ListScreen = ({ route, navigation, eva }) => {

    const styles = eva.style;
    const listsContext = React.useContext(ListsContext);
    const theme = useTheme();

    const [addText, setAddText] = React.useState('');
    const [itemCategory, setItemCategory] = React.useState('');
    const [settingsVisible, setSettingsVisible] = React.useState(false);
    const [shoppingMode, setShoppingMode] = React.useState(route.params?.shoppingMode || false);

    // For barcode scanner
    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);
    const [scanMode, setScanMode] = React.useState(false);

    const { listId } = route.params;
    const list = listsContext.lists[listId];

    const listData = {};
    for (let item of list.items) {
        if (!(item.category in listData)) {
            listData[item.category] = {
                title: item.category,
                data: []
            }
        } 
        listData[item.category].data.push(item);
    }
    
    useEffect(() => {
        if (route.params.category != undefined && itemCategory !== route.params?.category) {
            setItemCategory(route.params.category);
            addListItem();
            navigation.setParams({ category: undefined });
        }
    }, [route.params?.category]);

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
        listsContext.addListItem(listId, { 
            name: addText, 
            category: itemCategory, 
            checked: false 
        });
        setAddText('');
        setItemCategory('');
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
                                <Button style={{ width: '100%' }} onPress={() => navigation.navigate("StoreSelector")}>
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
                {/* <InteractiveSectionList
                    data={Object.values(listData)}
                    renderItem={({ item }) => <ShoppingListItem {...item} />}
                    itemHeight={100}
                    // renderSectionHeader={({ section }) => <Text>{section.title}</Text>} // OPTIONAL
                    tabbarItemWidth={100}  // OPTIONAL
                    // tabbarItemSpaceBetween={8}  // OPTIONAL
                    tabbarItemActiveColor={theme['color-primary-default']}  // OPTIONAL
                    tabbarItemInactiveColor='#FFF'  // OPTIONAL
                    tabbarItemTitleActiveColor='white' // OPTIONAL
                /> */}
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
                <FloatingAction
                    actions={floatingButtonActions}
                    onPressItem={name => {
                        if (name === "TextButton") {
                            listsContext.addListItem(listId, { 
                                name: addText, 
                                checked: false 
                            });
                            setAddText('')
                        } else {
                            setScanMode(true);
                        }
                    }}
                />
            </Page>
        )
    );
}

export default withStyles(ListScreen, styles);