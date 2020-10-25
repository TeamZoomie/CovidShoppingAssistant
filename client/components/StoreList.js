import React, { Fragment } from 'react';
import { ScrollView, View, TouchableHighlight, Image } from 'react-native';
import { Text, Icon, Spinner, withStyles, useTheme } from '@ui-kitten/components';
import { getBusynessText } from '../helpers';

const styles = (theme) => ({
    container: {
        marginTop: 4,
        marginBottom: 4,
        height: '100%',
    },
    highlight: {
        marginBottom: 8
    },
    button: {
        backgroundColor: theme['color-primary-default'],
        border: 'none',
        padding: 12,
        borderRadius: 4,
        flex: 1
    },
    busynessContent: {
        flexDirection: 'row', 
        alignItems: 'center', 
        alignContent: 'center', 
        paddingTop: 12
    },
    busynessText: {
        paddingLeft: 4, 
        fontWeight: "700"
    },
    mainText: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    imageStyles: {
        width: 12, 
        height: 18, 
        tintColor: 'white'
    }
});

const StoreList = ({ stores, eva, onPress, busynessData }) => {
    const styles = eva.style;
    const theme = useTheme();

    function getBusynessColour(placeId) {
        if (!(placeId in busynessData) || busynessData[placeId] === -1) {
            return 'white';
        }
        const busyness = busynessData[placeId];
        return busyness >= 40 ? theme['text-warning-color']
                               : theme['text-success-color']
    }

    return (
        <ScrollView style={styles.container}>
            {stores.map((store, i) => (
                <TouchableHighlight 
                    key={i} 
                    style={styles.highlight} 
                    activeOpacity={0.8}
                    onPress={() => onPress(i)}
                >
                    <View >
                        <View style={styles.button}>
                            <View style={styles.mainText}>
                                <Image source={{ uri: store.icon }} style={styles.imageStyles}/>
                                <Text status='control' category="h6" style={{ fontWeight: '700', paddingLeft: 6 }}>
                                    {store.mainText}
                                </Text>
                            </View>
                            <Text status='control' category="c1">{store.secondaryText}</Text>
                            <View style={styles.busynessContent}>
                                {store.placeId in busynessData ? (
                                    <Fragment>
                                        <Icon name="people-outline" width={18} height={18} fill={getBusynessColour(store.placeId)}/>
                                        <Text status='control' style={[styles.busynessText, { color: getBusynessColour(store.placeId) }]}>
                                            {getBusynessText(busynessData[store.placeId])}
                                        </Text>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <Spinner status='control'/>
                                        {/* <Text status='control' style={{ paddingLeft: 8}}>Loading crowd data</Text> */}
                                    </Fragment>
                                )}
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            ))}
        </ScrollView>
    );
};

export default withStyles(StoreList, styles);