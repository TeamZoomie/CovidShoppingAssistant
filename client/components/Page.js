/**
 * A normal page structure, with the necessary navigation, styling and layout.
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

// Define styles to use
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
 * Define the icon for navigating back a page.
 */
const BackIcon = (props) => (
    <Image 
        source={require('../assets/back.png')} 
        fill="black" style={({width: 16, height: 16} )}
    />
);

/**
 * Define the component
 */
const Page = (props) => {
    const styles = props.eva.style;
    const showHeader = props.showHeader ?? true;
    const Header = props.header || '';
    let backAction = props.backAction || (() => props.navigation.goBack());

    /**
     * The action itself for navigating back.
     */
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
                                    <Heading category="h6" style={{ 
                                            fontWeight: 'bold' 
                                    }}>
                                        {Header}
                                    </Heading>
                                ) : <Header/>
                        )}
                        alignment='center' 
                        accessoryLeft={AccessoryLeft}
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

export default withStyles(Page, styles);