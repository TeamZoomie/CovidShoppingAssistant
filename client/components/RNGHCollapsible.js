import React, { Component, Fragment } from 'react';
import { View, Animated } from 'react-native';
import {
    CheckBox,
    Icon, 
    Text,
    Divider,
    useTheme,
    withStyles
} from '@ui-kitten/components';
import BottomSheetTouchable from './BottomSheetTouchable';


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

    renderItems() {
        return this.props.subItems.map((subItem, id) => this.props.renderItem(subItem, id));
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
        const AccessoryLeft = this.props.headerAccessoryLeft;

        return (
            <View>
                <BottomSheetTouchable 
                    underlayColor={theme['background-basic-color-2']}
                    onPress={this.onPressHeader}
                    style={{ height: this.ITEM_HEIGHT }}
                >   
                    <View
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: 16 }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {AccessoryLeft && <AccessoryLeft/>}
                            <Text style={AccessoryLeft ? { paddingLeft: 8 } : {}} category="p1">
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
            </View>
        );
    }
}

export default withStyles(CollapsibleMenu);