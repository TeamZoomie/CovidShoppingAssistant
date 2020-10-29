/**
 * Displays the statistics screen. Presents information about the COVID-19
 * pandemic.
 */

import React, { Fragment, useState, useEffect } from 'react';
import { View } from 'react-native';
import { 
    List,
    Card,
    Spinner,
    Select,
    SelectItem,
    Layout,
    Text,
    IndexPath,
    Divider,
    withStyles 
} from '@ui-kitten/components';
import Heading from '../../components/Heading';
import { getCovidStats } from '../../api/BackendServicesAPI';

// Styles for this file.
const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-1']
    },
    content: {
        padding: 16,
        flex: 1,
        flexDirection: 'column'
    },
    text: {
        fontWeight: "700",
        textAlign: 'left',
        marginHorizontal: 8
    },
    errorText: {
        color: theme['color-primary-default']
    },
    container:{
        marginBottom:20
    },
});

// Supported countries
const countries = [
    'Australia', 'USA', 'UK', 'Canada', 'Spain', 'India', 'Brazil',
    'Russia', 'Mexico', 'South Africa', 'Chile', 'Germany', 'Sweden', 
    'Turkey', 'Italy'
];

/**
 * The main definition of the screen.
 */
const StatsScreen = ({ eva, navigation }) => {

    const styles = eva.style;
    const [countryIndex, setCountryIndex] = React.useState(new IndexPath(0));
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    const renderItem = (info) => {

        let title = info.item.title.replace( /([A-Z])/g, " $1" );
        title = title.charAt(0).toUpperCase() + title.slice(1);
        return (
            <Card>
                <Text category='p1'>
                    { title }
                </Text>
                <Text category='c1'>
                    { info.item.value }
                </Text>
            </Card>
        );
    };

    useEffect(() => {
        getCovidStats(countries[countryIndex - 1])
            .then(payload => {
                setLoading(false);
                setData(payload);
            })
            .catch(error => setError(true));
    }, [countryIndex]);

    return (
        <View style={styles.root}>
            <Layout style={styles.content}>
                <Heading category="c2">Country</Heading>
                <Select
                    selectedIndex={countryIndex}
                    onSelect={i => setCountryIndex(i)}
                    value={countries[countryIndex - 1]}
                    style={{ paddingBottom: 18 }}
                >
                    {countries.map((name, i) => 
                        <SelectItem key={i} title={name}/>)}
                </Select>
                <View style={loading || error ? {
                        flexGrow: 1, 
                        alignItems: 'center', 
                        justifyContent: 'center' } : { flexGrow: 1 }
                    }>
                    {loading || error ? (
                        error ? (
                            <Fragment>
                                <Heading 
                                    category="h6" 
                                    style={styles.errorText}
                                >
                                    Could not get data.
                                </Heading>
                                <Text 
                                    category="c1" 
                                    style={{ fontWeight: "300" }}
                                >
                                    An error occured...
                                </Text>
                            </Fragment>
                        ) : (
                            <Spinner size='giant'/>
                        )
                    ) : (
                        <Fragment>
                            <Heading category="c2">Statistics</Heading>
                            <List
                                style={styles.container}
                                data={Object.entries(data).map(
                                    ([title, value]) => ({ title, value }))}
                                ItemSeparatorComponent={Divider}
                                renderItem={renderItem}
                            />
                        </Fragment>
                    )}
                </View>
            </Layout>
        </View>
    );
};

export default withStyles(StatsScreen, styles);