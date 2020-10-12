import { React, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Heading } from '../components/Heading';
import { Input, Layout, Text, withStyles } from '@ui-kitten/components';

const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2']
    },
    content: {
        flex: 1
    }
})

const AddItemScreen = ({ eva, navigation }) => {

    const styles = eva.style;

    return (
        <View style={styles.root}>
            <Layout style={styles.content}>
                <Text>Test</Text>
            </Layout>
        </View>
    );
};

export default withStyles(AddItemScreen, styles);