import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { 
    Text, 
    withStyles,
} from '@ui-kitten/components';
import { format } from 'date-fns';


const styles = (theme) => ({
    button: {
        backgroundColor: theme['color-primary-default'],
        border: 'none',
        padding: 24,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    highlight: {
        borderRadius: 16
    }
});

const ActiveList = (props) => {
    const styles = props.eva.style;
    const { list } = props;

    return (
        <View style={props.containerStyle}>
            <TouchableHighlight onPress={props.onPress} style={styles.highlight}>
                <View style={[styles.button, props.style]}>
                    <View>
                        <Text status='control' category="h5" style={{ fontWeight: '700' }}>
                            {list.name}
                        </Text>
                        <Text status='control' category="c1" style={{ fontWeight: '700' }}>Due Date</Text>
                        <Text status='control' category="c1">{ format(list.duedate, 'dd/MM/yy') }</Text>
                    </View>
                    <View>
                        <Text status='control' category="p1">{ format(list.date, 'dd/MM') }</Text>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
};

export default withStyles(ActiveList, styles);