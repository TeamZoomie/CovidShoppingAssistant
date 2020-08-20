import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { List, ListItem } from '@ui-kitten/components';
import { Toggle } from '@ui-kitten/components';

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

export const switchTheme = BaseTheme => {
    return dispatch => {
      dispatch({
        type: SWITCH_THEME,
        baseTheme: BaseTheme
      })
    }
  }

// TODO Why called hamburger icon?
const HamburgerIcon = (props) => (
    <Icon {...props} name='menu-outline' />
);

const settings = [
    {
        title: 'Theme'
    },
    {
        title: 'Font Size'
    }
]

export const SettingsScreen = ({ navigation }) => {

    const [checked, setChecked] = React.useState(false);

    const onCheckedChange = (isChecked) => {
        setChecked(isChecked);
    };

    const DrawerAction = () => (
        <TopNavigationAction icon={HamburgerIcon} onPress={() => navigation.openDrawer()}/>
    );

    const renderToggle = () => (
        <Toggle checked={checked} onChange={onCheckedChange}>
            {`${checked}`}
        </Toggle>
      );

    const renderItem = ({item}) => (
        <ListItem
            title={`${item.title}`}
            accessoryRight={renderToggle}
        />
    );



    
    return (
        <SafeAreaView className={styles.root}>
            <TopNavigation title='Settings' alignment='center' accessoryLeft={DrawerAction}/>
            <Divider/>
            <List
                style={styles.container}
                data={settings}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}