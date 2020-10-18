import React from 'react';
import { View, ScrollView, TouchableHighlight, Image, PixelRatio } from 'react-native';
import { 
    Button,
    Icon,
    Text, 
    withStyles,
    useTheme,
} from '@ui-kitten/components';
import { format } from 'date-fns';
import { colours } from '../colours';
import { iconImages } from '../icon-images';

const styles = (theme) => ({
    button: {
        backgroundColor: theme['color-primary-default'],
        border: 'none',
        padding: 8,
        // borderRadius: 16,
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
        // borderRadius: 16,
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
        backgroundColor: theme['background-basic-color-1']
    },
    nextButton: {
        width: 32, 
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const NextIcon = (props) => {
    return <Icon {...props} height={24} width={24} fill={props.colour} name="arrow-ios-forward-outline"/>
};

const ShoppingLists = (props) => {
    const styles = props.eva.style;
    const theme = useTheme();
    let sortedData = Object.values(props.data).sort((a, b) => {
        const d1 = new Date(a.date);
        const d2 = new Date(b.date);
        return d2.getTime() - d1.getTime();
    });
    if (props.activeList) {
        sortedData = sortedData.filter(list => list.id != props.activeList.id);
    }

    // const backgroundColor = theme['background-basic-color-1'];
    // const back
    const backgroundColor = colours['white' || list.colour || 'orange']
    return (
        <ScrollView style={styles.container}>
            {sortedData.map((list, i) => (
                <View key={i} style={styles.item}>
                    <TouchableHighlight 
                        style={styles.highlight} 
                        onPress={() => props.onPress(list.id)}
                        underlayColor={theme['background-basic-color-2']}
                    >
                        <View 
                            style={[styles.button, { backgroundColor } ]}>
                            <View style={[styles.button, { backgroundColor } ]}>
                                <Image source={iconImages[list.icon]} style={styles.imageStyle}/>
                                <View>
                                    <Text 
                                        category="h6" 
                                        style={{ fontWeight: '700'}}
                                    >
                                        {list.name}
                                    </Text>
                                    <Text category="c1" style={{ color: theme['color-primary-default'], fontWeight: '700' }}>
                                        {list.items.length} items
                                    </Text>
                                </View>
                                
                            </View>
                            <View style={[styles.button, { backgroundColor }]}>
                                <View>
                                    <Text category="c1" style={{ fontWeight: '700' }}>Due Date</Text>
                                    <Text category="c1" style={{ fontWeight: '700' }}>{ format(list.date, 'dd/MM/yy') }</Text>
                                </View>
                                <Button 
                                    style={styles.nextButton}
                                    accessoryLeft={() => <NextIcon colour={theme['background-alternative-color-1']}/>} 
                                    appearance='ghost' 
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
