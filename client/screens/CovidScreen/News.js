import React, { Fragment, useState, useEffect } from 'react';
import { 
    View, 
    ImageBackground,
    Linking
} from 'react-native';
import { 
    List,
    Card,
    Spinner,
    Select,
    SelectItem,
    Layout,
    Text,
    IndexPath,
    withStyles 
} from '@ui-kitten/components';
import { format } from 'date-fns';
import Heading from '../../components/Heading';
import { getCovidNews } from '../../api/BackendServicesAPI';

const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-1']
    },
    content: {
        padding: 16,
        flex: 1,
        flexDirection: 'column',
    },
    text: {
        fontWeight: "700",
        textAlign: 'left',
        marginHorizontal: 8
    },
    errorText: {
        color: theme['color-primary-default']
    },
    container: {
        flex: 1,
    },
      list: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    item: {
        marginVertical: 8,
    },
    itemHeader: {
        height: 220,
    },
    itemContent: {
        marginVertical: 8,
    },
    itemFooter: {
        flexDirection: 'row',
        marginHorizontal: -8,
    },
    iconButton: {
        paddingHorizontal: 0,
    },
    itemAuthoringContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
        padding: 16
    }
});

const NewsScreen = ({ eva, navigation }) => {

    const styles = eva.style;
    const [countryIndex, setCountryIndex] = React.useState(new IndexPath(0));
    const countries = [
        'Australia', 'USA', 'UK', 'Canada', 'Spain', 'India', 'Brazil',
        'Russia', 'Mexico', 'South Africa', 'Chile', 'Germany', 'Sweden', 
        'Turkey', 'Italy'
    ];
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        getCovidNews(countries[countryIndex - 1])
            .then(payload => {
                setLoading(false);
                setData(payload.articles);
            })
            .catch(error => setError(true));
    }, [countryIndex]);

    const onItemPress = (index) => {
        const url = data[index].url;
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            }
        });
    };

    const renderItemHeader = (info) => (
        <ImageBackground
            style={styles.itemHeader}
            source={{ uri: info.item.urlToImage }}
        />
    );
    const renderItemFooter = (info) => (
        <View style={styles.itemFooter}>
            <View style={styles.itemAuthoringContainer}>
                <Text category='s2'>
                    {info.item.source.name}
                </Text>
                <Text appearance='hint' category='c1'>
                    {format(Date.parse(info.item.publishedAt), 'dd MMM, yyyy h:mm a')}
                </Text>
            </View>
        </View>
    );

    const renderItem = (info) => (
        <Card
            style={styles.item}
            header={() => renderItemHeader(info)}
            footer={() => renderItemFooter(info)}
            onPress={() => onItemPress(info.index)}
        >
            <Text category='h6'>
                {info.item.title}
            </Text>
            <Text
                style={styles.itemContent}
                appearance='hint'
                category='s2'
            >
                    {info.item.description ? `${info.item.description.substring(0, 82)}...` : 'No description.'}
            </Text>
        </Card>
    );
    
    return (
        <View style={styles.root}>
            <Layout style={styles.content}>
                <Heading category="c2">Country</Heading>
                <Select
                    selectedIndex={countryIndex}
                    onSelect={i => setCountryIndex(i)}
                    value={countries[countryIndex - 1]}
                    style={{ paddingBottom: 24 }}
                >
                    {countries.map((name, i) => <SelectItem key={i} title={name}/>)}
                </Select>
                <View style={loading || error ? { flexGrow: 1, alignItems: 'center', justifyContent: 'center' } : { flexGrow: 1 }}>
                    {loading || error ? (
                        error ? (
                            <Fragment>
                                <Heading category="h6" style={styles.errorText}>
                                    Could not get data.
                                </Heading>
                                <Text category="c1" style={{ fontWeight: "300" }}>
                                    An error occured...
                                </Text>
                            </Fragment>
                        ) : (
                            <Spinner size='giant'/>
                        )
                    ) : (
                        <Fragment>
                            <Heading category="c2">News</Heading>
                            <List
                                style={styles.list}
                                contentContainerStyle={styles.listContent}
                                data={data}
                                renderItem={renderItem}
                            />
                        </Fragment>
                    )}
                </View>
            </Layout>
        </View>
    );
};

export default withStyles(NewsScreen, styles);