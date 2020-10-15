import React from 'react';
import { View, ScrollView, TouchableHighlight,Image,PixelRatio } from 'react-native';
import { 
    Button,
    Icon,
    Text, 
    withStyles,
    useTheme,
} from '@ui-kitten/components';
import { format } from 'date-fns';
import { colours } from '../colours';

const styles = (theme) => ({
    button: {
        backgroundColor: theme['color-primary-default'],
        border: 'none',
        padding: 8,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imageStyle: {
        padding:10,
        marginRight:5,
        height: PixelRatio.getPixelSizeForLayoutSize(5),
        width: '10%',
    },
    container: {
        flex: 1, 
        marginBottom: 4,
    },
    highlight: {
        marginBottom: 0,
        borderRadius: 16,
        flexGrow: 1,
        marginRight: 0,
    },
    date: {
        fontWeight: '700', 
        textAlign: 'right', 
        paddingLeft: 13, 
        paddingRight: 13,
        marginBottom: 8,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 1,
        paddingRight: 0,
        paddingLeft: 0,
        marginBottom: 0,
        backgroundColor: 'white'
    },
    nextButton: {
        width: 32, 
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const NextIcon = (props) => {
    return <Icon {...props} height={24} width={24} fill="black" name="arrow-ios-forward-outline"/>
};

const ShoppingLists = (props) => {
    const styles = props.eva.style;
    const theme = useTheme();
    const sortedData = Object.values(props.data).sort((a, b) => {
        const d1 = new Date(a.date);
        const d2 = new Date(b.date);
        return d2.getTime() - d1.getTime();
    });
    const images = {
        p0: require('../assets/shopping.png'),
        p1: require('../assets/calendar.png'),
        p2: require('../assets/christmas.png'),
        p3: require('../assets/party.png')
    }
    
    const backgroundColor = colours['white' || list.colour || 'orange']
    return (
        <ScrollView style={styles.container}>
            {sortedData.map((list, i) => (
                <View key={i} style={styles.item}>
                    {/* <Text category="h6" style={styles.date}>
                        {format(list.date, 'dd MMM')}
                    </Text> */}
                    <TouchableHighlight 
                        style={styles.highlight} 
                        onPress={() => props.onPress(list.id)}
                        underlayColor='#eee'
                    >
                        <View 
                            style={[styles.button, { backgroundColor } ]}>
                            <View style={[styles.button, { backgroundColor } ]}>
                                <Image source={images['p' + i]} style={styles.imageStyle}/>
                                <View>
                                    <Text 
                                        status="control" 
                                        category="h6" 
                                        style={{ fontWeight: '700',color: '#000000' }}
                                    >
                                        {list.name}
                                    </Text>
                                    <Text status='control' category="c1" style={{ color: '#4169E1',fontWeight: '700' }}>
                                        {list.items.length} items
                                    </Text>
                                </View>
                                
                            </View>
                            <View style={[styles.button, { backgroundColor }]}>
                                <View>
                                    <Text status='control' category="c1" style={{color: '#000000',fontWeight: '700' }}>Due Date</Text>
                                    <Text status='control' category="c1" style={{color: '#000000',fontWeight: '700' }}>{ format(list.date, 'dd/MM/yy') }</Text>
                                </View>
                                <Button 
                                    style={styles.nextButton}
                                    status='basic'
                                    appearance='ghost' 
                                    accessoryLeft={NextIcon} 
                                    onPress={() => props.onPress(list.id)}
                                />
                            </View>
                        </View>
                    </TouchableHighlight>
                
                </View>
            ))}
        </ScrollView>
    )
}

export default withStyles(ShoppingLists, styles);
