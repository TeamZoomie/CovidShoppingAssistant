/**
 * Defines the specific list the user selects as their active one. This adds
 * some priority in the display order as well as adding a star to bring
 * more attention to it.
 */

import React from 'react';
import { 
    View, 
    TouchableHighlight,
    Image,
    PixelRatio } from 'react-native';
import { 
    Text, 
    withStyles,
    Button,
    Icon,
    useTheme } from '@ui-kitten/components';
import { format } from 'date-fns';
import { iconImages } from '../icon-images';

// Defines styles for differnet components
const styles = (theme) => ({
    button: {
        border: 'none',
        padding: 6,
        paddingRight:12,
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
    nextButton: {
        width: 32, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    starIcon: {
        width: 22,
        height: 22,
        marginRight: 10
    },
    text: {
        color: theme['color-primary-default'], 
        fontWeight: '700' 
    }
});

/**
 * Defines the icon for the next button.
 */
const NextIcon = (props) => {
    return <Icon 
        {...props} 
        fill={props.colour} 
        height={24} 
        width={24} 
        name="arrow-ios-forward-outline"
    />
};

/**
 * The main component definition.
 */
const ActiveList = (props) => {
    // Get some details on how to render
    const styles = props.eva.style;
    const { list } = props;
    const theme = useTheme();
    // TODO JSX Comments
    return (
        <View style={[styles.container,props.containerStyle]}>
            <TouchableHighlight 
                style={styles.highlight} 
                underlayColor={theme['background-basic-color-2']}
                onPress={props.onPress} 
            >
                <View style={[styles.button, props.style]}>
                    <View style={[styles.button, props.style]}>
                        <Image 
                            source={iconImages[list.icon]} 
                            style={styles.imageStyle}
                        />
                        <View>
                            <Text category="h6" style={{ fontWeight: '700' }}>
                                    {list.name}
                                </Text>
                            <Text category="c1" style={styles.text}>
                                {list.items.length} items
                            </Text>
                        </View>
                    </View>
                    <View style={props.style}>
                        <View style={[styles.button, props.style]}>
                        <Icon
                            style={styles.starIcon}
                            fill={theme['color-primary-default']}
                            name='star'
                        />
                            <View>
                                <Text 
                                    category="c1" 
                                    style={{ fontWeight: '700' }}
                                >
                                    Due Date
                                </Text>
                                <Text 
                                    category="c1" 
                                    style={{ fontWeight: '700' }}
                                >
                                    { format(list.duedate, 'dd/MM/yy') }
                                </Text>
                            </View>
                            <Button 
                                style={styles.nextButton}
                                color="white"
                                appearance='ghost' 
                                accessoryLeft={() => 
                                    <NextIcon 
                                        colour={theme[
                                            'background-alternative-color-1']}
                                    />} 
                                onPress={props.onPress}
                            />
                        </View>  
                    </View>       
                </View>
            </TouchableHighlight>
        </View>
    );
};

export default withStyles(ActiveList, styles);