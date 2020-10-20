import React, { Component, Fragment } from 'react';
import { View, Animated, TouchableHighlight } from 'react-native';
import {
    CheckBox,
    Icon, 
    Text,
    Divider,
    useTheme,
    withStyles
} from '@ui-kitten/components';
import { TouchableHighlight as RNGHTouchableHighlight } from "react-native-gesture-handler";


const BottomSheetTouchable = (props) => {
    if (Platform.OS === "android") {
      return (
        <RNGHTouchableHighlight {...props} />
      );
    }
    return <TouchableHighlight {...props} />
};


const CollapsibleItem = (props) => {

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

class CollapsibleMenu extends Component {
    
    ITEM_HEIGHT = 60;

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
            <CollapsibleItem {...subItem} key={id} id={id} />
        ));
    }

    render() {
        const theme = this.props.eva.theme;
        const interpolateRotation = this.state.expandAnimation.interpolate({
            inputRange: [-1, 0],
            outputRange: [`-180deg`, `0deg`],
        });
        const interpolateMenu = this.state.expandAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.ITEM_HEIGHT * this.props.subItems.length],
        });
        const completed = this.props.completed || false;
        const unknown = this.props.unknown || true;
        return (
            <Fragment>
                <BottomSheetTouchable 
                    underlayColor={theme['background-basic-color-2']}
                    onPress={this.onPressHeader}
                >   
                    <View
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 16 }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {completed && <Icon name="checkmark-square-outline" width={18} height={18} fill={theme['color-primary-default']}/>}
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
                <Animated.View 
                    style={{ overflow: 'hidden', height: interpolateMenu }} 
                >
                    {this.renderItems()}
                </Animated.View>
                <Divider/>
            </Fragment>
        );
    }
}

export default withStyles(CollapsibleMenu);