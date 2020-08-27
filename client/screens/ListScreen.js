import React from 'react';
import { SafeAreaView, StyleSheet, CheckBox } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, List, ListItem } from '@ui-kitten/components';
import { Datepicker } from '@ui-kitten/components';

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

    const [date, setDate] = React.useState(list.date);

    const renderCheckbox = ({item}) => (
        <CheckBox
            checked={item.checked}
            onChange={nextChecked => item.checked}>
        </CheckBox>
    )

    const renderItem = ({item}) => (
        <ListItem
            title={`${item.name}`}    
            description={`${item.category}`}
            //accessoryLeft={`${renderCheckbox}`}    
        />
    )

    return (
        <SafeAreaView style={styles.root}>
            <TopNavigation title={ list.name } alignment='center' accessoryLeft={BackAction}/>
            <Divider/>
            <Layout style={styles.content}>
                <Text category='h1'>List</Text>
            
            <Divider/>
            <Datepicker
                date={list.date}
                onSelect={nextDate => setDate(nextDate)}
            />
            <Divider/>
            <List>
                data={list.items}
                renderItem={renderItem}
            </List>
            </Layout>
        </SafeAreaView>
    );
}