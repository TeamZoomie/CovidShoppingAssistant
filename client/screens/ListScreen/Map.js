import React, { Fragment, useState, useEffect, useContext } from 'react';
import { View, Dimensions } from 'react-native';
import {
    CheckBox,
    Icon, 
    Text,
    withStyles,
    Divider,
    useTheme
} from '@ui-kitten/components';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import Heading from '../../components/Heading';
import Page from '../../components/Page';
import Map from '../../components/Map';
import Collapsible from '../../components/RNGHCollapsible';
import BottomSheetTouchable from '../../components/BottomSheetTouchable';
import { ListsContext } from '../../lists-context';
import stores from '../../store-maps/stores';
import { generatePath, buildGrid, groupListData } from '../../helpers';

const { height } = Dimensions.get('window')
const styles = (theme) => ({
    contentContainerStyle: {
        padding: 16,
        backgroundColor: theme['background-basic-color-1'],
        height: '100%'
    },
    header: {
        paddingBottom: 8, 
        height: 65,
        alignItems: 'center',
        backgroundColor: theme['background-basic-color-1'],
        paddingVertical: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 10,

        // ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
    },
    headerContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%', 
        paddingRight: 24, 
        paddingLeft: 24
    },
    panelHandle: {
        width: 30,
        height: 5,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 4
    },
    item: {
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        marginVertical: 10,
    },
    alignRowCentre: {
        flexDirection: 'row', 
        alignItems: 'center'
    }
});

const lightMapTheme = {
    // background: '#E6E6E6',
    background: '#598BFF',
    base: '#fff',
    shelves: '#DDDDDD',
    registers: '#ADADAD',
    categories: {
        // 'Fruit & Vegetables': '#A1FFBC',
        // 'Natural': '#68A379',
        // 'Laundry Accessories': '#5C5C5C',
        // 'Meat': '#5C5C5C',
        // 'Bakery': '#C9F3BF'
    },
    path: '#598BFF',
    tooltipBorder: '#656565'
};

const Handle = (props) => {

    const styles = props.eva.style;
    const theme = useTheme();
    return (
        <Fragment>
            <View style={styles.header}>
                <View style={styles.panelHandle} />
                <View style={styles.headerContainer}>
                    <View style={styles.alignRowCentre}>
                        <Text style={{ paddingLeft: 8 }}>
                            {props.itemCount} items
                        </Text>
                    </View>
                    <View style={styles.alignRowCentre}>
                        <Icon width={16} height={16} fill={theme['background-alternative-color-1']} name="pin-outline" />
                        <Text style={{ paddingLeft: 4, fontWeight: 'bold' }}>
                            {props.stopCount} stops
                        </Text>
                    </View>
                </View>
            </View>
            <Divider/>
        </Fragment>
    );
}

const ThemedHandle = withStyles(Handle, styles);

const ListItemAccessoryLeft = (props) => {
    const theme = useTheme();
    const completed = props.completed || false;
    const unknown = props.unknown !== false;
    return (
        completed ? (
            <Icon name="checkmark-square-outline" width={18} height={18} fill={theme['color-primary-default']}/>
        ) : unknown ? (
            <Icon name="question-mark-circle-outline" width={18} height={18} fill={theme['background-alternative-color-1']} />
        ) : (
            <Icon name="pin-outline" width={18} height={18} fill="darkred" />
        )
    )
}

export const ListItem = (props) => {

    const theme = useTheme();
    return (
        <BottomSheetTouchable 
            {...props}
            underlayColor={theme['background-basic-color-2']}
            onPress={() => props.onPress(!props.checked)}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 16 }}>
                <CheckBox
                    checked={props.checked}
                    style={{ overflow: 'hidden' }}
                >
                    <Text style={props.checked ? { textDecorationLine: 'line-through' } : {}}>
                        {props.text}
                    </Text>
                </CheckBox>
            </View>
        </BottomSheetTouchable>
    );
}

const MapScreen = ({ eva, navigation, route }) => {

    const styles = eva.style;
    const listsContext = useContext(ListsContext);
    const store = stores.coles;

    const { listId } = route.params;
    const list = listsContext.lists[listId];

    const [path, setPath] = useState([]);
    const [tooltips, setTooltips] = useState([]);
    
    const listGroups = groupListData(list);
    const [listData, setListData] = useState(Object.values(listGroups));
    const [updateMap, setUpdateMap] = useState(true);
    const [updateList, setUpdateList] = useState(false);

    // console.log('rendered map page')

    const avaiableMapTasks = Object.keys(listGroups).filter(category => category in store.categories);
    const [taskOrder, setTaskOrder] = useState([])

    const SCALE_FACTOR = 15;
    
    useEffect(() => {
        if (updateMap) {
            const mapWidth = 62;
            const mapHeight = 26;
    
            let grid = buildGrid(store, mapWidth, mapHeight);
            const [newPath, newTooltips, order] = generatePath(store, grid, avaiableMapTasks, SCALE_FACTOR);
            setTaskOrder(order);
            
            updateListData(listGroups, order);
            
            setPath(newPath);
            setTooltips(newTooltips);
            setUpdateMap(false);

        } else if (updateList) {
            updateListData(listGroups, taskOrder);
        }

    }, [updateMap, listGroups])

    const updateListData = (listGroups, order) => {

        const data = Object.values(listGroups);
        if (JSON.stringify(order) != JSON.stringify(taskOrder)) {
            const taskCategoryOrder = order.map(index => avaiableMapTasks[index]);
            const taskCount = avaiableMapTasks.length;
    
            data.sort((a, b) => {
                let wA = taskCount - taskCategoryOrder.indexOf(a.category);
                let wB = taskCount - taskCategoryOrder.indexOf(b.category);
    
                let ax = avaiableMapTasks.includes(a.category) ? wA : 0;
                let bx = avaiableMapTasks.includes(b.category) ? wB : 0;
                return bx - ax;
            });
        }
        setUpdateList(false);
        setListData(data);
    }
    
    const updateSection = (sectionName, itemIndex, checked) => {
        const index = listGroups[sectionName].subItems[itemIndex].id;
        let item = list.items[index];
        if (item.checked !== checked) {
            item.checked = checked;
        }
        setUpdateList(true);
        listsContext.updateListItem(listId, index, item);
    };

    const allChecked = (items) => {
        for (let item of items) {
            if (!item.checked) {
                return false;
            }
        }
        return true;
    }

    return (
        <Page 
            showDivider={false}
            navigation={navigation}
            pageStyles={{ padding: 0 }}
            header={() => (
                <Heading category="h5" style={{ fontWeight: "700", padding: 16 }}>
                    {route.params.store.mainText}
                </Heading>
            )}
            backAction={() => {
                navigation.navigate('Main', {
                    listId: route.params.listId
                })
            }}
        >
            <View style={{ height: '100%' }}>
                    
                <Map 
                    store={store}
                    height={height} 
                    theme={lightMapTheme}
                    path={path}
                    tooltips={tooltips}
                    scaleFactor={SCALE_FACTOR}
                />
                <ScrollBottomSheet
                    componentType="FlatList"
                    snapPoints={[128, '50%', '70%']}
                    initialSnapIndex={2}
                    renderHandle={() => (
                        <ThemedHandle 
                            itemCount={list.items.length}  
                            stopCount={listData.length}
                        />
                    )}
                    data={listData}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <Collapsible 
                            header={`${listData.indexOf(item) + 1}. ` + item.header} 
                            subItems={item.subItems} 
                            headerAccessoryLeft={() => (
                                <ListItemAccessoryLeft
                                    unknown={!avaiableMapTasks.includes(item.category)}
                                    completed={allChecked(item.subItems)}
                                />
                            )}
                            renderItem={(subItem, index) => (
                                <ListItem 
                                    key={index}
                                    checked={subItem.checked}
                                    text={subItem.name}
                                    onPress={nextChecked => updateSection(item.category, index, nextChecked)}
                                />
                            )}
                        />
                    )}
                    contentContainerStyle={styles.contentContainerStyle}
                />
            </View>
        </Page>
    )
};

export default withStyles(MapScreen, styles);