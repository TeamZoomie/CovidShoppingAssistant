import React, { Fragment } from 'react';
import {  View, StyleSheet } from 'react-native';
import { Text, CheckBox, Divider, Button, Icon } from '@ui-kitten/components';
import { ListsContext } from '../../lists-context';

const styles = StyleSheet.create({
    item: {
        flexGrow: 1
    },
    container: {
        flexDirection: 'column',
        // alignItems: 'flex-start',
        flex: 1,
        width: '100%'
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        // display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '100%',
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

const ListItem = (props) => {
    const listsContext = React.useContext(ListsContext);
    const [checked, setChecked] = React.useState(false);
    return (
        <View style={styles.contentContainer}>
            <View>
                <CheckBox
                    style={[styles.checkbox, checked ? { textDecorationLine: 'line-through' } : {}]}
                    checked={checked}
                    onChange={nextChecked => setChecked(nextChecked)}
                >
                    {props.name}
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
                onPress={listsContext.removeListItem}
            />
        </View>
    )
};

export default function ShoppingList(props) {
    return (
        <View style={styles.container}>
            {props.data.map((item, i) => (
                <Fragment key={i}>
                    <ListItem name={item.name}/>
                    { i !== props.datalength - 1 && <Divider/>}
                </Fragment>
            ))}
        </View>
    );
}