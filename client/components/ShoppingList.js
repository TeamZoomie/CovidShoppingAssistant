import React, { Fragment, useState, useContext } from 'react';
import {  View, StyleSheet,FlatList } from 'react-native';
import { Text, CheckBox, Divider, Button, Icon } from '@ui-kitten/components';
import Collapsible from '../components/listItemCollapsible';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import { ListsContext } from '../lists-context';

const styles = StyleSheet.create({
    item: {
        flexGrow: 1
    },
    container: {
        flexDirection: 'column',
        flex: 1,
        width: '100%'
    },
    contentContainer: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '100%',
        alignItems: 'center'
    },
    subItem: {
        backgroundColor: 'lightgrey',
        borderRadius: 8,
        padding: 8
    },
    checkbox: {
        padding: 8,
        paddingLeft: 0
    },
    button: {

    }
});

const RemoveIcon = (props) => (
    <Icon {...props} height={16} name='trash-outline' />
);
export const ShoppingListItem = (props) => {
    // const [checked, setChecked] = React.useState(props.checked || false);
    return (
        <View style={styles.contentContainer}>
            <View>
                <CheckBox
                    checked={props.checked}
                    onChange={nextChecked => {
                        // setChecked(nextChecked);
                        props.onItemChecked(nextChecked);
                    }}
                >
                    <Text style={props.checked ? { textDecorationLine: 'line-through' } : {}}>
                        {props.name}
                    </Text>
                </CheckBox>
                {/* <View style={styles.subItem}>
                    <Text>
                        Bought 1kg Bag Granny Smtih apples
                    </Text>
                </View> */}
            </View>
            <Button 
                style={styles.button} 
                appearance='ghost' 
                status='basic' 
                accessoryLeft={RemoveIcon} 
                onPress={props.onRemoveItem}
            />
        </View>
    )
};

export default function ShoppingList(props) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const listsContext = useContext(ListsContext);
    const list = listsContext.lists[props.data.id];
    const listData = {};
    for (let [id, item] of Object.entries(list.items)) {
        if (!(item.category in listData)) {
            listData[item.category] = {
                id,
                header: item.category,
                subItems: []
            }
        } 
        listData[item.category].subItems.push({ text: item.name, i: id,list:props});
    }
    console.log(props.data)

    return (
        <View style={styles.container}>

            <FlatList
                style={{}}
                data={Object.values(listData)}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                <Collapsible 
                                header={item.header} 
                                subItems={item.subItems} 
                            />
                        )}
            /> 
            

        </View>
    );
}