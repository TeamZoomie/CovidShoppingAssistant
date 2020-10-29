/**
 * Defines the screens for when the user enters the shopping experience.
 */

import React from 'react';
import { 
    ScrollView, 
    View, 
    ImageBackground, 
    Dimensions
 } from 'react-native';
import { 
    Button,
    Text,
    TopNavigation,
    TopNavigationAction,
    withStyles,
    Icon
} from '@ui-kitten/components';
import {
    SlideBarChart,
  } from 'react-native-slide-charts'
import * as Haptics from 'expo-haptics'
import Heading from '../../components/Heading';
import { 
    getBusynessText,
    getCurrentBusynessFromTimezone 
} from '../../helpers';


const { height } = Dimensions.get('window')

// Define the styles for this page
const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
        justifyContent: 'space-between'
    },
    chartBackground: {
        backgroundColor: theme['background-basic-color-2']
    },
    scrollView: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2']
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        height: height * 0.33,
        width: '100%',
    },
    paginationWrapper: {
        paddingBottom: 16,
        backgroundColor: theme['background-basic-color-2'],
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    paginationDots: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: theme['color-primary-default'],
        marginLeft: 10,
    },
    heading: {
        textAlign: 'center',
        fontWeight: '700',
        padding: 32,
        paddingBottom: 0
    },
    subHeading: {
        textAlign: 'center',
        paddingLeft: 32,
        paddingRight: 32,
    }
});

/**
 * Defines the icon for the back action.
 */
const BackIcon = (props) => (
    <Icon
        height={20} 
        width={20} 
        fill="black" 
        name='arrow-ios-back-outline'
    />
);  
    

/**
 * The main definition of this screen
 */
const ShoppingIntroScreen = ({ route, eva, navigation }) => {

    const styles = eva.style;
    const { width, height } = Dimensions.get('window');

    const [sliderState, setSliderState] = React.useState({ currentPage: 0 });
    const setSliderPage = (e) => {
        const { currentPage } = sliderState;
        const { x } = e.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.round(x / width);

        if (indexOfNextScreen !== currentPage) {
          setSliderState({
            ...sliderState,
            currentPage: indexOfNextScreen,
          });
        }
    };
    
    const { currentPage: pageIndex } = sliderState;

    const gotoMap = () => {
        navigation.navigate('Map', { 
            store: route.params.store,
            storeMap: route.params.storeMap,
            listId: route.params.listId 
        });
    };

    const convertTo12HourTime = (time) => {
        let hour = time;
        if (time !== 12) {
            hour %= 12;
        }
        if (hour === 0) {
            hour = 12;
        }
        return hour.toString() + (time < 12 ? 'AM' : 'PM')
    }

    const hasData = route.params.populartimes !== undefined && 
                    route.params.populartimes.length === 7;

    let busyness = -1;
    let data = [];
    if (hasData) {
        busyness = getCurrentBusynessFromTimezone(route.params.populartimes);
        const day = (((new Date()).getDay() - 1) % 7 + 7) % 7
        data = route.params.populartimes[day].data.map((busyness, id) => ({
            x: id,
            y: busyness
        }));
    }

    const BackAction = () => (
        <TopNavigationAction 
            icon={BackIcon} 
            onPress={() => navigation.goBack()} 
        />
    );

    return (
        <View style={styles.root}>
            <ScrollView
                style={styles.scrollView}
                horizontal={true}
                scrollEventThrottle={16}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={event => {
                    setSliderPage(event);
                }}
            >
                <View style={{ width, height }}>
                    <ImageBackground source={
                            require('../../assets/social_distance_graphic2.png')
                        } style={styles.imageStyle}
                    >
                        <TopNavigation 
                            alignment='center' 
                            accessoryLeft={BackAction}
                            style={{ backgroundColor: 'transparent' }}
                        />
                    </ImageBackground>
                    <View style={styles.wrapper}>
                        <Heading 
                            style={styles.heading} 
                            category="h4">Remember to social distance
                        </Heading>
                        {hasData ? (
                            <Heading style={styles.subHeading} category="p1">
                                This store is currently 
                                <Text 
                                    style={{ fontWeight: '700' }}
                                > {getBusynessText(busyness)}
                                </Text>
                            </Heading>
                        ) : (
                            <Heading style={styles.subHeading} category="p1">
                                We currently do not have any data for that store. 
                                Please keep social distancing in mind.
                            </Heading>
                        )}

                        {hasData ? (
                            <SlideBarChart
                                selectionChangedCallback={() => 
                                    Haptics.selectionAsync()}
                                height={150}
                                paddingLeft={32}
                                paddingRight={32}
                                axisHeight={32}
                                barSelectedIndex={5}
                                xAxisProps={{
                                    axisMarkerLabels: data.map(
                                        item => convertTo12HourTime(item.x)
                                    ),
                                    markerSpacing: 2
                                }}
                                toolTipProps={{
                                    lockTriangleCenter: true,
                                    toolTipTextRenderers: [
                                        ({ selectedBarNumber }) => ({
                                            text: data[
                                                selectedBarNumber
                                            ].y.toString(),
                                        }),
                                        () => ({ text: 'Crowdedness' }),
                                    ],
                                }}
                                data={data}
                                style={styles.chartBackground}
                            />
                        ) : (
                            <Heading style={{ padding: 32 }} category='h5'>
                                No crowdedness data
                            </Heading>
                        )}
                        
                    </View>
                </View>
                <View style={{ width, height }}>
                    <ImageBackground source={require(
                            '../../assets/shopGraphic.png')
                        } style={styles.imageStyle}
                    >
                        <TopNavigation 
                            alignment='center' 
                            accessoryLeft={BackAction}
                            style={{ backgroundColor: 'transparent' }}
                        />
                    </ImageBackground>
                    <View style={styles.wrapper}>
                        <Heading 
                            style={styles.heading} 
                            category="h4">Use the map!
                        </Heading>
                        <Heading style={styles.subheading} category="p1">
                            Optimise your route in store to avoid contact!
                        </Heading>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.paginationWrapper}>
                {Array.from(Array(2).keys()).map((key, index) => (
                    <View style={[
                            styles.paginationDots, 
                            { opacity: pageIndex === index ? 1 : 0.2 }
                        ]} key={index} 
                    />
                ))}
            </View>
            <View style={{ 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    padding: 16, 
                    paddingBottom: 16 
                }}>
                <Button style={{ width: '50%' }} onPress={gotoMap}>
                    Let me shop!
                </Button>
            </View>
        </View>
    );
};

export default withStyles(ShoppingIntroScreen, styles);