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
    const Header = props.header || '';
    let backAction = props.backAction || (() => props.navigation.goBack());

    const BackAction = () => (
        <TopNavigationAction 
            icon={BackIcon} 
            onPress={backAction}
        />
    );
    const AccessoryLeft = props.AccessoryLeft || BackAction;
    const navProps = props.AccessoryRight ? { accessoryRight: props.AccessoryRight } : {};

    return (
        <View style={[styles.root, props.rootStyles]}>
            {showHeader && (
                <Fragment>
                    <TopNavigation 
                        title={() => (
                            (typeof Header === 'string' || Header instanceof String) ? (
                                <Heading category="p1" style={{ fontWeight: 'bold' }}>
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