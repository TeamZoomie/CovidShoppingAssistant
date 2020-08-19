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

export const ListScreen = ({ navigation }) => {

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/>
    );

    return (
        <SafeAreaView className={styles.root}>
            <TopNavigation title='Shopping List' alignment='center' accessoryLeft={BackAction}/>
            <Divider/>
            <Layout className={styles.content}>
                <Text category='h1'>Shopping List</Text>
            </Layout>
        </SafeAreaView>
    );
}