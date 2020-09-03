import React from 'react';
import { ScrollView, View } from 'react-native';
import { 
    Input, 
    Text,
    Divider, 
    Icon,
    Button,
    Layout, 
    TopNavigation, 
    TopNavigationAction, 
    OverflowMenu,
    MenuItem,
    withStyles,
    useTheme
} from '@ui-kitten/components';

const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    searchField: {
        width: '100%'
    }
});

const DemoScreen = ({ navigation, eva }) => {
    const styles = eva.style;
    return (
        <View style={styles.root}>
            {/* <TopNavigation 
                title='Home' 
                alignment='center' 
                accessoryLeft={DrawerAction}
                accessoryRight={CreateAction}
            /> */}
            <Divider/>
            <Layout style={styles.content}>
                <Text>
                    Add Content here
                </Text>
            </Layout>
        </View>
    );
}

export default withStyles(DemoScreen, styles);