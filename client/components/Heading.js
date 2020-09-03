import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const styles = StyleSheet.create({
    root: {
        paddingBottom: 8
    },
    text: {
        fontWeight: "400",
        textAlign: 'left',
        marginHorizontal: 8
    }
});

export default function Heading(props) {
    return (
        <View style={styles.root}>
            <Text {...props} style={[styles.text, props.style]} category={props.category}>{props.children}</Text>
        </View>
    )
}