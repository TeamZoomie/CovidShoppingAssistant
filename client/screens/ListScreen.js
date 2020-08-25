import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';


const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);

export const ListScreen = ({ route, navigation }) => {

    const list = route.params;
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/>
    );

    return (
        <SafeAreaView style={styles.root}>
            <TopNavigation title={ list.name } alignment='center' accessoryLeft={BackAction}/>
            <Divider/>
            <Layout style={styles.content}>
                <Text category='h1'>List</Text>
            </Layout>
        </SafeAreaView>
    );
}