import React from 'react';
import { ScrollView, View, TouchableHighlight, Image } from 'react-native';
import { Text, Card, Button, withStyles } from '@ui-kitten/components';

const styles = (theme) => ({
    container: {
        marginTop: 4,
        marginBottom: 4,
        height: '100%'
    },
    highlight: {
        marginBottom: 8
    },
    button: {
        backgroundColor: theme['color-primary-default'],
        border: 'none',
        padding: 12,
        borderRadius: 4
    }
});

const StoreList = ({ stores, eva, onPress }) => {
    const styles = eva.style;
    return (
        <ScrollView style={styles.container}>
            {stores.map((store, i) => (
                <TouchableHighlight 
                    key={i} 
                    style={styles.highlight} 
                    activeOpacity={0.8}
                    onPress={() => onPress(i)}
                >
                    <View style={styles.button}>
                        {/* <Image source={{ uri: store.icon }}/> */}
                        <Text status='control' category="h6" style={{ fontWeight: '700' }}>
                            {store.mainText}
                        </Text>
                        <Text status='control' category="c1">{store.secondaryText}</Text>
                    </View>
                </TouchableHighlight>
            ))}
        </ScrollView>
    );
};

export default withStyles(StoreList, styles);