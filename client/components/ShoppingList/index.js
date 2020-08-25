import React from 'react';
import {  StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
});

export default function ShoppingList(props) {
    const { data } = props;
    return (
        <div style={styles.root}>
            List
        </div>
    );
}