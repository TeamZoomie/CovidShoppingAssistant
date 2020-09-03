import React from 'react';
import { ScrollView, View } from 'react-native';
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

const ListScreen = React.memo(({ route, navigation, eva }) => {

    const styles = eva.style;
    
    if (!('listId' in route.params)) {
        return <View><Text>No List</Text></View>;
    }
    
    const { listId } = route.params;
    const [addText, setAddText] = React.useState('');
    const [settingsVisible, setSettingsVisible] = React.useState(false);

    const listsContext = React.useContext(ListsContext);
    let list = listsContext.lists[listId];

    const theme = useTheme();

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

    const addListItem = () => {
        if (addText !== '') {
            listsContext.addListItem(listId, { name: addText, checked: false });
            setAddText('');
        }
    };

    const onRemoveItem = (index) => {
        listsContext.removeListItem(listId, index);
        // listsContext.test();
    };

    const removeList = () => {
        navigation.navigate("Home", { callback: () => listsContext.removeList(listId) });
    };

    return (
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
                    <Button 
                        style={styles.button} 
                        appearance='filled' 
                        accessoryLeft={AddIcon}
                        onPress={addListItem}
                    />
                </View>
                <ScrollView 
                    // style={[{height: '100%' }, list.items.length === 0 ? {} : {}]}
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
                        <ShoppingList data={list.items} onRemoveItem={onRemoveItem}/>
                    )}
                </ScrollView>
            </Layout>
        </View>
    );
})

export default withStyles(ListScreen, styles);