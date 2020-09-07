import React from 'react';
import { View, ScrollView, TouchableHighlight } from 'react-native';
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
        padding: 24,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center'
    },
    container: {
        flex: 1, 
        marginBottom: 4,
    },
    highlight: {
        marginBottom: 8,
        borderRadius: 16,
        flexGrow: 1,
        marginRight: 24,
        marginLeft: 24
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
        paddingRight: 16,
        paddingLeft: 16,
        marginBottom: 4
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
    
    return (
        <ScrollView style={styles.container}>
            {sortedData.map((list, i) => (
                <View key={i} style={styles.item}>
                    <Text category="h6" style={styles.date}>
                        {format(list.date, 'dd MMM')}
                    </Text>
                    <TouchableHighlight 
                        style={styles.highlight} 
                        activeOpacity={0.8}
                        onPress={() => props.onPress(list.id)}
                    >
                        <View 
                            style={[styles.button, { backgroundColor: colours[list.colour || 'orange']} ]}>
                            <Text 
                                status="control" 
                                category="h6" 
                                style={{ fontWeight: '700', }}
                            >
                                {list.name}
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <Button 
                        style={styles.nextButton}
                        status='basic'
                        appearance='ghost' 
                        accessoryLeft={NextIcon} 
                        onPress={() => props.onPress(list.id)}
                    />
                </View>
            ))}
        </ScrollView>
    )
}

export default withStyles(ShoppingLists, styles);
