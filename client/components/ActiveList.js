import React from 'react';
import { View, TouchableHighlight,Image,PixelRatio } from 'react-native';
import { 
    Text, 
    withStyles,
    Button,
    Icon,
} from '@ui-kitten/components';
import { format } from 'date-fns';


const styles = (theme) => ({
    button: {
        // backgroundColor: theme['color-primary-default'],
        border: 'none',
        padding: 6,
        paddingRight:8,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    highlight: {
        borderRadius: 16
    },
    imageStyle: {
        padding:10,
        marginRight:5,
        height: PixelRatio.getPixelSizeForLayoutSize(5),
        width: '10%',
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

const ActiveList = (props) => {
    const styles = props.eva.style;
    const { list } = props;

    return (
        <View style={props.containerStyle}>
            <TouchableHighlight onPress={props.onPress} style={styles.highlight}>
                <View style={[styles.button, props.style]}>
                    <View style={[styles.button, props.style]}>
                        <Image source={require('../assets/calendar.png')} style={styles.imageStyle}/>
                        <View>
                            <Text status='control' category="h6" style={{ color: '#000000',fontWeight: '700' }}>
                                    {list.name}
                                </Text>
                            <Text status='control' category="c1" style={{ color: '#4169E1',fontWeight: '700' }}>{
                                list.items.length} items
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.button, props.style]}>
                        <View>
                            <Text status='control' category="c1" style={{color: '#000000',fontWeight: '700' }}>Due Date</Text>
                            <Text status='control' category="c1" style={{color: '#000000',fontWeight: '700' }}>{ format(list.duedate, 'dd/MM/yy') }</Text>
                        </View>
                        <Button 
                        style={styles.nextButton}
                        status='basic'
                        appearance='ghost' 
                        accessoryLeft={NextIcon} 
                        onPress={ props.onPress}
                        />
                    </View>
                    
                    
                </View>
            </TouchableHighlight>
                
        </View>
    );
};

export default withStyles(ActiveList, styles);