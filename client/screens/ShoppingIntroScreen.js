import React from 'react';
import { ScrollView, View, Image, Dimensions, PixelRatio } from 'react-native';
import { 
    Button,
    withStyles,
} from '@ui-kitten/components';
import Heading from '../components/Heading';

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
        marginVertical: 30,
    },
    imageStyle: {
        height: PixelRatio.getPixelSizeForLayoutSize(135),
        width: '100%',
    },
    paginationWrapper: {
        position: 'absolute',
        bottom: 200,
        left: 0,
        right: 0,
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

const ShoppingIntroScreen = ({ eva, navigation }) => {

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
                    {/* A cool infographic would look nice here */}
                    <Image source={require('../assets/covidscreen1.jpg')} style={styles.imageStyle} />
                    <View style={styles.wrapper}>
                        <Heading style={styles.heading} category="h4">Remember to social distance</Heading>
                        <Heading style={styles.subHeading} category="p1">
                            You will be reminded every 5 minutes!
                        </Heading>
                        {/* Make this look better / think about display */}
                        <Heading style={styles.subHeading} category="p1">
                            There has been x cases in that area.
                        </Heading>
                    </View>
                </View>
                <View style={{ width, height }}>
                    <Image source={require('../assets/covidscreen1.jpg')} style={styles.imageStyle} />
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
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 32, paddingBottom: 48 }}>
                <Button style={{ width: '50%' }} onPress={() => navigation.navigate("List", { shoppingMode: true })}>
                    Let me shop!
                </Button>
            </View>
        </View>
    );
};

export default withStyles(ShoppingIntroScreen, styles);