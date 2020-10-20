import React, { Fragment } from 'react';
import { View } from 'react-native';
import {
    Divider,
    Icon, 
    TopNavigation,
    TopNavigationAction,
    Layout, 
    withStyles
} from '@ui-kitten/components';
import Heading from './Heading';

const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
    },
    content: {
        padding: 16,
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'space-between',
    }
});

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);

const Page = (props) => {
    const styles = props.eva.style;
    const showHeader = props.showHeader ?? true;
    const header = props.header || '';

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => props.navigation.goBack()}/>
    );
    const AccessoryLeft = props.AccessoryLeft || BackAction;
    const navProps = props.AccessoryRight ? { accessoryRight: props.AccessoryRight } : {};

    return (
        <View style={[styles.root, props.rootStyles]}>
            {showHeader && (
                <Fragment>
                    <TopNavigation 
                        title={() => (
                            (typeof header === 'string' || header instanceof String) ? (
                                <Heading category="p1" style={{ fontWeight: 'bold' }}>
                                    {header}
                                </Heading>
                            ) : header
                        )}
                        alignment='center' 
                        accessoryLeft={AccessoryLeft}
                        {...navProps}
                    />
                    {(props.showDivider ?? true) && <Divider/>}
                </Fragment>
            )}
            <Layout style={[styles.content, props.pageStyles]}>
                {props.children}
            </Layout>
        </View>
    )
}

export default withStyles(Page, styles);