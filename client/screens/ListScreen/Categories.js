/**
 * The main screen to present the categories after a user enters an item
 * via text.
 */

import React from 'react';
import { withStyles } from '@ui-kitten/components';
import GridList from '../../components/GridList';
import Page from '../../components/Page';
import { categories } from '../../categories';

// Define the styles for this page
const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
});

/**
 * The main definition of this screen.
 */
const ModalScreen = ({ navigation }) => {
    return (
        <Page 
            header="Set category"
            showDivider={false}
            navigation={navigation}
        >
            <GridList 
                data={categories}
                onPress={id => navigation.navigate('Main', {
                    category: categories[id].category
                })}
            />
        </Page>
    );
}

export default withStyles(ModalScreen, styles);