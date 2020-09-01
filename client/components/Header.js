import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const styles = StyleSheet.create({
    header: {
        paddingBottom: 8
    },
    text: {
        fontWeight: "400",
        textAlign: 'left',
        marginHorizontal: 8
    }
});

export default function Header(props) {
    return (
        <View style={styles.header}>
            <Text {...props} style={styles.text} category={props.category}>{props.children}</Text>
        </View>
    )
}