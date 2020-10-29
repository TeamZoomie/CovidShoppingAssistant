/**
 * See Heading.js for the main component, this defines an identical component
 * except for the fact that his one has a center alignment.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const styles = StyleSheet.create({
    root: {
        paddingBottom: 8
    },
    text: {
        fontWeight: "400",
        textAlign: 'center',
    }
});

/**
 * Defines the component.
 */
export default function CenteredHeading(props) {
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