import React from 'react';
import { Dimensions, ListRenderItemInfo, StyleSheet } from 'react-native';
import { Card, List, ListElement, ListItemElement, ListProps, Text } from '@ui-kitten/components';

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        aspectRatio: 1.0,
        margin: 8,
        maxWidth: Dimensions.get('window').width / 2 - 24,
        borderWidth: 2,
    },
    itemTitle: {
        alignSelf: 'center',
        marginTop: 8,
    }
});

export default function GridList(props) {
    const { contentContainerStyle, onPress, ...listProps } = props;
    const render = (content) => (
        <Card
            style={styles.item}
            onPress={() => props.onPress(content.index)}
        >
            {content.item.icon({ width: 32, height: 32, alignSelf: 'center' })}
            <Text
                style={styles.itemTitle}
                category='s2'>
                {content.item.title}
            </Text>
        </Card>
    );
    return (
        <List
            {...listProps}
            numColumns={2}
            contentContainerStyle={[styles.container, contentContainerStyle]}
            renderItem={render}
        />
    );
}