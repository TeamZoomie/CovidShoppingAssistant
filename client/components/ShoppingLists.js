import React, { Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Icon, List, ListItem, Text, Divider } from '@ui-kitten/components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingBottom: 16,
        alignSelf: 'stretch', 
        height: 'auto',
        // height: '100%',
        // margin: 8,
        // fontSize: 20

    },
    row: {
        flex: 1, 
        alignSelf: 'stretch', 
        flexDirection: 'row',
    }
});

export default function ShoppingLists(props) {

    const theme = useTheme();
    const ArrowIcon = (props) => (
        <Icon {...props} name='arrow-ios-forward-outline' />
    );

    const renderRow = ({ item, index }) => (
        <ListItem
            containerStyle={{flex: 1, alignSelf: 'stretch' }}
            style={{flex: 1, alignSelf: 'stretch' }}
            title={evaProps => <Text category="h6" style={{ marginHorizontal: 8 }} category="h6">{item.name}</Text>}
            description={'Last used ' +  item.date}
            accessoryRight={ArrowIcon}
            onPress={() => props.onPress(item)}
        />
    );

    return (
        <List
            style={styles.container}
            contentContainerStyle={{ borderWidth: 1, borderColor: theme['border-basic-color-4']}}
            data={props.data}
            renderItem={renderRow}
            ItemSeparatorComponent={Divider}
        />
    );
}