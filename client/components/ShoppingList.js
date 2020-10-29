/**
 * Defines the shopping list page when the user selects the list to add or
 * remove items. 
 */

import React from 'react';
import {  View, StyleSheet } from 'react-native';
import { Text, CheckBox, Button, Icon } from '@ui-kitten/components';
import Collapsible from '../components/RNGHCollapsible';
import { categories } from '../categories'

// Define styles for different components.
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

/**
 * Defines the icon for the remove button.
 */
const RemoveIcon = (props) => (
    <Icon {...props} height={16} name='trash-outline' />
);

/**
 * Component that defines actions on a shopping list item.
 */
const ShoppingListItem = (props) => {
    return (
        <View style={styles.contentContainer}>
            <View>
                <CheckBox
                    checked={props.checked}
                    onChange={nextChecked => props.onChecked(nextChecked)}
                    style={{ overflow: 'hidden' }}
                >
                    <Text style={props.checked ? 
                                { textDecorationLine: 'line-through' } : {}}
                    >
                        {props.text}
                    </Text>
                </CheckBox>
            </View>
            <Button 
                style={styles.button} 
                appearance='ghost' 
                status='basic' 
                accessoryLeft={RemoveIcon} 
                onPress={props.onRemove}
            />
        </View>
    )
};

/**
 * The main component definition
 */
export default function ShoppingList(props) {

    const { list } = props;
    const listGroups = {};
    for (let [id, item] of Object.entries(list.items)) {
        if (!(item.category in listGroups)) {
            listGroups[item.category] = {
                id: Object.keys(listGroups).length,
                header: item.category,
                category: item.category,
                subItems: [],
            }
        } 
        listGroups[item.category].subItems.push({ ...item, id });
    }

    const listData = Object.values(listGroups);
    let categoryMap = {};
    for (let [id, item] of categories.entries()) {
        categoryMap[item.category] = id;
    }

    const CollapsibleAccessory = (props) => {
        return categories[categoryMap[props.category]].icon({ 
            width: 18,
            height: 18, 
            alignSelf: 'center'
        });
    }

    return (
        <View style={styles.container}>
            {listData.map((group) => (
                <Collapsible
                    key={group.id}
                    header={group.category} 
                    subItems={group.subItems} 
                    expanded={true}
                    headerAccessoryLeft={() => 
                            <CollapsibleAccessory category={group.category}/>
                    }
                    renderItem={(subItem, index) => (
                        <ShoppingListItem 
                            key={index}
                            checked={subItem.checked}
                            text={subItem.name}
                            onChecked={
                                nextChecked => props.onItemChecked(
                                        subItem.id, nextChecked)
                            }
                            onRemove={() => props.onRemoveItem(subItem.id)}
                        />
                    )}
                />
            ))}
        </View>
    );
}