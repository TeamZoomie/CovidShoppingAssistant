/**
 * Contains a component that displays multiple items in a grid. This is done
 * with a tiled display.
 */

import React from 'react';
import { View } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';
import { Card, List, Text } from '@ui-kitten/components';

// Defines styles for the component
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

/**
 * Contains the component
 */
export default function GridList(props) {
    const { contentContainerStyle, onPress, ...listProps } = props;

    const render = (content) => (
        <Card
            style={styles.item}
            onPress={() => props.onPress(content.index)}
        >
            {content.item.icon({ 
                width: 64, 
                height: 64, 
                alignSelf: 'center', 
                resizeMode: 'contain'
            })}
            <Text
                style={styles.itemTitle}
                category='s2'>
                {content.item.title}
            </Text>
        </Card>
    );
    
    return (
        <View>
            <List
                {...listProps}
                numColumns={2}
                contentContainerStyle={[styles.container, contentContainerStyle]}
                renderItem={render}
            />
        </View>
    );
}