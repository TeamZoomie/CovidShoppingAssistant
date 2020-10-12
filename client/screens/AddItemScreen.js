import React, {useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import Heading from '../components/Heading';
import { Input, Layout, Text, withStyles } from '@ui-kitten/components';

const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2']
    },
    content: {
        flex: 1
    },
    text: {
        fontWeight: "700",
        textAlign: 'left',
        marginHorizontal: 8
    }
});

const AddItemScreen = ({ eva, navigation }) => {

    const styles = eva.style;

    return (
        <View style={styles.root}>
            <Layout style={styles.content}>
                <Heading category="h2" style={{ fontWeight: "700", padding: 16 }}>Test</Heading>
            </Layout>
        </View>
    );
};

export default withStyles(AddItemScreen, styles);