import React from 'react';
import { ScrollView, View, Image, Dimensions } from 'react-native';
import { 
    Button,
    withStyles,
} from '@ui-kitten/components';
import {
    SlideBarChart,
  } from 'react-native-slide-charts'
import * as Haptics from 'expo-haptics'
import Heading from '../../components/Heading';

const { height } = Dimensions.get('window')


const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
        justifyContent: 'space-between'
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'white'
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
        backgroundColor: 'white',
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
        paddingLeft: 32,
        paddingRight: 32,
    }
});

const greenData = [
    {x: 'A', y: 10},
    {x: 'B', y: 5},
    {x: 'C', y: 15}
];
  
const blueData = [
    {x: 'A', y: 12},
    {x: 'B', y: 2},
    {x: 'C', y: 11}
];
  
const labelData = greenData.map((d, idx) => ({
    x: d.x,
    y: Math.max(greenData[idx].y, blueData[idx].y)
}));

const ShoppingIntroScreen = ({ route, eva, navigation }) => {

    const styles = eva.style;
    const { width, height } = Dimensions.get('window');

    const [sliderState, setSliderState] = React.useState({ currentPage: 0 });
    const setSliderPage = (e) => {
        const { currentPage } = sliderState;
        const { x } = e.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.floor(x / width);

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
            listId: route.params.listId 
        });
    };
    // const data = [
    //     { x: 0, y: 0 },
    //     { x: 1, y: 1 },
    //     { x: 2, y: 2 },
    //     { x: 3, y: 3 },
    //     { x: 4, y: 4 },
    // ];
    const hasData = route.params.populartimes !== undefined || 
                    route.params.populartimes.length !== 7;
    const day = (((new Date()).getDay() - 1) % 7 + 7) % 7
    const data = route.params.populartimes[day].data.map((busyness, id) => ({
        x: id,
        y: busyness
    })).slice(6, 22);

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
                    <Image source={require('../../assets/social_distance_graphic.png')} style={styles.imageStyle} />
                    <View style={styles.wrapper}>
                        <Heading style={styles.heading} category="h5">Remember to social distance</Heading>
                        {/* <Heading style={styles.subHeading} category="p1">
                            You will be reminded every 5 minutes!
                        </Heading> */}
                        {/* Make this look better / think about display */}
                        <Heading style={styles.subHeading} category="p1">
                            There has been 8 cases in that area.
                        </Heading>

                        {/* <Heading style={styles.heading} category="h5">Crowdedness</Heading> */}
                        {hasData && (
                            <SlideBarChart
                                selectionChangedCallback={() => Haptics.selectionAsync()}
                                height={150}
                                paddingLeft={32}
                                paddingRight={32}
                                axisHeight={32}
                                barSelectedIndex={5}
                                xAxisProps={{
                                    axisMarkerLabels: data.map(item => (item.x !== 12 ? item.x % 12 : 12).toString() + (item.x < 12 ? 'AM' : 'PM')),
                                    markerSpacing: 2
                                }}
                                toolTipProps={{
                                    lockTriangleCenter: true,
                                    toolTipTextRenderers: [
                                        ({ selectedBarNumber }) => ({
                                            text: data[selectedBarNumber].y.toString(),
                                        }),
                                        () => ({ 
                                            text: 'Crowdedness' 
                                        }),
                                    ],
                                }}
                                data={data}
                            />
                        )}
                        
                    </View>
                </View>
                <View style={{ width, height }}>
                    <Image source={require('../../assets/covidscreen1.jpg')} style={styles.imageStyle} />
                    <View style={styles.wrapper}>
                        <Heading style={styles.heading} category="h4">Scan barcodes!</Heading>
                        <Heading style={styles.subheading} category="p1">You will be reminded every 5 minutes!</Heading>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.paginationWrapper}>
                {Array.from(Array(2).keys()).map((key, index) => (
                    <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
                ))}
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 16, paddingBottom: 16 }}>
                <Button style={{ width: '50%' }} onPress={gotoMap}>
                    Let me shop!
                </Button>
            </View>
        </View>
    );
};

export default withStyles(ShoppingIntroScreen, styles);