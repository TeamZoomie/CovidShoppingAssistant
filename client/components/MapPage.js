/**
 * Defines the shopping map page which shows the users a map of the store.
 * The map also contains a route to all the items in the users list. This is 
 * almost identical to Page.js except for a different navigation. Namely, this
 * one has a forward navigation rather than a backwards navigation in the
 * top accessory bar.
 */

import React, { Fragment } from 'react';
import { View, Image } from 'react-native';
import {
    Divider,
    TopNavigation,
    TopNavigationAction,
    Layout, 
    withStyles
} from '@ui-kitten/components';
import Heading from './Heading';

// Defines styles for the component
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
    }
});

/**
 * Defines the icon for the back button.
 */
const BackIcon = (props) => (
    <Image 
        source={require('../assets/forward.png')} 
        fill="black" style={({width: 24, height: 24} )}
    />
);

/**
 * The main component definition.
 */
const MapPage = (props) => {
    const styles = props.eva.style;
    const showHeader = props.showHeader ?? true;
    const Header = props.header || '';
    let backAction = props.backAction || (() => props.navigation.goBack());

    const BackAction = () => (
        <TopNavigationAction 
            icon={BackIcon} 
            onPress={backAction}
        />
    );
    const AccessoryLeft = props.AccessoryLeft || BackAction;
    const navProps = props.AccessoryRight ? 
        { accessoryRight: props.AccessoryRight } : {};

    return (
        <View style={[styles.root, props.rootStyles]}>
            {showHeader && (
                <Fragment>
                    <TopNavigation 
                        title={() => (
                            (typeof Header === 'string' 
                                || Header instanceof String) ? (
                                    <Heading category="p1" style={{ 
                                        fontWeight: 'bold' 
                                    }}>
                                        {Header}
                                    </Heading>
                                ) : <Header/>
                        )}
                        alignment='center' 
                        accessoryRight={AccessoryLeft}
                        {...navProps}
                        style={props.headerStyles}
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

export default withStyles(MapPage, styles);