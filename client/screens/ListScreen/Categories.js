import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { 
    Icon,
    Text,
    Button,
    withStyles
} from '@ui-kitten/components';
import GridList from '../../components/GridList';
import Page from '../../components/Page';
import { categories } from '../../categories';

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