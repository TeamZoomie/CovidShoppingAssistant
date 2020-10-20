import React, { Fragment, useState, useRef } from 'react';
import { View, Dimensions, Animated, TouchableHighlight, StyleSheet } from 'react-native';
import {
    CheckBox,
    Button, 
    Icon, 
    Text,
    Menu, 
    MenuGroup, 
    MenuItem,
    Layout, 
    withStyles,
    Divider,
    useTheme
} from '@ui-kitten/components';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableHighlight as RNGHTouchableHighlight } from "react-native-gesture-handler";
import Heading from '../components/Heading';
import Map from '../components/Map';

const { width, height } = Dimensions.get('window')
const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
        // flexGrow: 1,
        // height: '100%',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    content: {
        // padding: 16,
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    text: {
        fontWeight: "700",
        textAlign: 'left',
        marginHorizontal: 8
    },
    container: {
        flex: 1,
    },
    contentContainerStyle: {
        padding: 16,
        backgroundColor: theme['background-basic-color-1'],
    },
    header: {
        alignItems: 'center',
        backgroundColor: theme['background-basic-color-1'],
        paddingVertical: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 10,

        // ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
    },
    panelHandle: {
        width: 30,
        height: 5,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 4
    },
    item: {
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        marginVertical: 10,
    },
});

const lightMapTheme = {
    // background: '#E6E6E6',
    background: '#598BFF',
    base: '#fff',
    shelves: '#DDDDDD',
    registers: '#ADADAD',
    categories: {
        fruitVeg: '#A1FFBC',
        naturalWholeFoods: '#68A379',
        kitchenAccessories: '#5C5C5C',
        canned: '#5C5C5C',
        gardenAccessories: '#C9F3BF'
    },
    path: '#3b8ada',
    tooltipBorder: '#656565'
};

const BottomSheetTouchable = (props) => {
    if (Platform.OS === "android") {
      return (
        <RNGHTouchableHighlight {...props} />
      );
    }
    return <TouchableHighlight {...props} />
};

const MapScreen = ({ eva, navigation }) => {

    const styles = eva.style;
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    // Not the best way, but easiest.
    const theme = useTheme();

    navigation.setOptions({ tabBarVisible: false })

    return (
        <View style={styles.root}>
            <Layout style={styles.content}>
                <View style={{ height: '100%' }}>
                    <Heading category="h2" style={{ fontWeight: "700", padding: 16 }}>Coles</Heading>
                    <Map 
                        height={height} 
                        theme={lightMapTheme}
                        tasks={['gardenAccessories', 'kitchenAccessories', 'fruitVeg', 'canned']}
                    />
                    <ScrollBottomSheet
                        componentType="FlatList"
                        snapPoints={[128, '50%', '70%']}
                        initialSnapIndex={2}
                        renderHandle={() => (
                            <Fragment>
                                <View style={[styles.header, { paddingBottom: 8, height: 65 }]}>
                                    <View style={styles.panelHandle} />
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingRight: 24, paddingLeft: 24 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ paddingLeft: 8 }}>
                                                17 items
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon width={16} height={16} fill="black" name="pin-outline" />
                                            <Text style={{ paddingLeft: 4, fontWeight: 'bold' }}>
                                                4 stops
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <Divider/>
                            </Fragment>
                        )}
                        data={Array.from({ length: 10 }).map((_, i) => ({ 
                            id: i, 
                            header: "Header " + String(i), 
                            subItems: Array.from({ length: 2 }).map((_, j) => ({ text: 'Item ' + String(j) }))
                        }))}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                            <DropDownMenu header={item.header} subItems={item.subItems} theme={theme} />
                        )}
                        contentContainerStyle={styles.contentContainerStyle}
                    />
                </View>
            </Layout>
        </View>
    )
};


const DropDownItem = (props) => {

    const [checked, setChecked] = React.useState(false);
    const theme = useTheme();

    return (
        <BottomSheetTouchable 
            {...props}
            underlayColor={theme['background-basic-color-2']}
            onPress={() => {
                if (props.onPressItem) {
                    props.onPressItem(props.id);
                }
                setChecked(!checked);
            }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 16 }}>
                <CheckBox
                    checked={checked}
                    style={{ overflow: 'hidden' }}
                >
                    <Text style={checked ? { textDecorationLine: 'line-through' } : {}}>
                        {props.text}
                    </Text>
                </CheckBox>
            </View>
        </BottomSheetTouchable>
    );
}

class DropDownMenu extends React.Component {
    
    state = {
        expanded: this.props.expanded || false,
        expandAnimation: new Animated.Value(this.props.expanded ? 1 : 0),
        sectionChecked: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.expanded !== this.props.expanded) {
            this.setState({ expanded: this.props.expanded}, () => this.createAnimation(this.props.expanded ? 1 : 0));
        }
    }

    createAnimation = (value) => {
        Animated.timing(this.state.expandAnimation, {
            toValue: value,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }

    onPressHeader = () => {
        this.setState({ expanded: !this.state.expanded }, () => {
            this.createAnimation(this.state.expanded ? 1 : 0);
        });
    }

    onPressItem = (id) => {
        console.log(id);
    }

    renderItems() {
        return this.props.subItems.map((subItem, id) => (
            <DropDownItem {...subItem} key={id} id={id} />
        ));
    }

    render() {
        const interpolateRotation = this.state.expandAnimation.interpolate({
            inputRange: [-1, 0],
            outputRange: [`-180deg`, `0deg`],
        });
        const interpolateMenu = this.state.expandAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100],
        });
        const completed = this.props.completed || false;
        const unknown = this.props.unknown || true;
        return (
            <Fragment>
                <BottomSheetTouchable 
                    underlayColor={this.props.theme['background-basic-color-2']}
                    onPress={this.onPressHeader}
                >   
                    <View
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 16 }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {completed && <Icon name="checkmark-square-outline" width={18} height={18} fill={this.props.theme['color-primary-default']}/>}
                            {!completed && <Icon name="pin-outline" width={18} height={18} fill="darkred" />}
                            {/* {unknown && <Icon name="question-mark-circle-outline" width={18} height={18} fill="black" />} */}
                            <Text category="p1">
                                {this.props.header}
                            </Text>
                        </View>
                        <Animated.View style={{ transform: [{ rotate: interpolateRotation }] }}>
                            <Icon name="chevron-down-outline" width={18} height={18} fill="grey"/>
                        </Animated.View>
                    </View>
                </BottomSheetTouchable>
                <Animated.View style={{ overflow: 'hidden', height: interpolateMenu }}>
                    {this.renderItems()}
                </Animated.View>
                <Divider/>
            </Fragment>
        );
    }
}

export default withStyles(MapScreen, styles);
