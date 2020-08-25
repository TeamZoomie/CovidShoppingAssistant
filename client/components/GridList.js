import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Card, List, Text } from '@ui-kitten/components';

const styles = StyleSheet.create({
    container: {
        paddingBottom: 8,
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        aspectRatio: 1.0,
        maxWidth: Dimensions.get('window').width / 2 - 16,
        borderWidth: 1,
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