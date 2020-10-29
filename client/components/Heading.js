/**
 * Contains a heading deifnition, specifically for the text intended to define
 * a specific page.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

// The styles to use for different parts
const styles = StyleSheet.create({
    root: {
        paddingBottom: 8
    },
    text: {
        fontWeight: "400",
        textAlign: 'left',
    }
});

/**
 * Define the component.
 */
export default function Heading(props) {
    return (
        <View style={styles.root}>
            <Text 
                {...props} 
                style={[styles.text, props.style]} 
                category={props.category}
            >
                    {props.children}
            </Text>
        </View>
    )
}