import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import Svg, {
    G,
    Circle,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
  } from 'react-native-svg';
import ZoomableSvg from 'zoomable-svg';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    root: {
        paddingBottom: 8
    },
    container: {
        backgroundColor: '#ecf0f1',
    },
});

// const theme = {
//     background: '#F6F7FB',
//     // shelves: '#EBEEF3',
//     shelves: '#E6E9EE',
//     path: '#FFD547'
// };

// const theme = {
//     background: '#f7f7f7',
//     base: '#f5f6fa',
//     // base: '#e8e9eb',
//     // shelves: '#EBEEF3',
//     shelves: '#e8e9eb',
//     path: '#FFD547'
// };

const theme = {
    background: '#fafafa',
    // base: '#f7f8fa',
    base: '#f7f8fa',
    // base: '#e8e9eb',
    // shelves: '#EBEEF3',
    shelves: '#ebedf0',
    // path: '#FFD547'
    path: '#3b8ada'
};

const store = {
    // background: [[6,0], [61,0], [61,18], [0,18]],
    background: [[0, 6], [6, 0], [61,0], [61, 25], [0, 25]],
    shelves: [
        [[10,17], [11,17], [11,11], [10,11]],       // A1
        [[10,8], [11,8], [11,2], [10,2]],           // A1b
        [[14,17], [15,17], [15,11], [14,11]],       // A2
        [[14,8], [15,8], [15,2], [14,2]],       // A2b
        [[18,17], [19,17], [19,11], [18,11]],       // A3
        [[18,8], [19,8], [19,2], [18,2]],           // A3b
        [[22,17], [23,17], [23,11], [22,11]],       // A4
        [[22,8], [23,8], [23,2], [22,2]],           // A4b
        [[26,17], [27,17], [27,11], [26,11]],       // A5
        [[26,8], [27,8], [27,2], [26,2]],           // A5b
        [[30,17], [31,17], [31,11], [30,11]],       // A6
        [[30,8], [31,8], [31,2], [30,2]],           // A6b
        [[34,17], [35,17], [35,11], [34,11]],       // A7
        [[34,8], [35,8], [35,2], [34,2]],           // A7b
        [[38,17], [39,17], [39,11], [38,11]],       // A8
        [[38,8], [39,8], [39,2], [38,2]],           // A8b
        [[42,17], [43,17], [43,11], [42,11]],       // A9
        [[42,8], [43,8], [43,2], [42,2]],           // A9b
        [[46,17], [47,17], [47,11], [46,11]],       // A10
        [[50,17], [51,17], [51,11], [50,11]],       // A11
        [[54,17], [55,17], [55,11], [54,11]],       // A12

        // Registers
        [[18,20], [19,20], [19,23], [18,23]],
        [[22,20], [23,20], [23,23], [22,23]],
        [[26,20], [27,20], [27,23], [26,23]],
        [[30,20], [31,20], [31,23], [30,23]],
        [[34,20], [35,20], [35,23], [34,23]],
        [[38,20], [39,20], [39,23], [38,23]],
        [[42,20], [43,20], [43,23], [42,23]],
        [[46,20], [47,20], [47,23], [46,23]],

        // Self-serve
        [[12,20],[16,20],[16,23],[12,23]],

        // Fruit / Veg
        [[2,23], [5,23], [5,22.5], [2,22.5]],
        [[5,4], [5,3], [7,3], [7,4]],
        [[3,20], [3,19], [7,19], [7,20]],
        [[3,16], [3,15], [7,15], [7,16]],
        [[3,12], [3,11], [7,11], [7,12]],
        [[3,8], [3,7], [7,7], [7,8]]
    ],
    paths: [
        [[10, 19], [10, 25]],
        [[10, 19], [20.5, 19]],
        [[20.5, 19], [20.5, 9.5]]
    ]
}

const WIDTH = 500;
const HEIGHT = 500;
const SCALE_FACTOR = 15;

class MapSVG extends Component {
    render() {
        const { store, theme, transform } = this.props;
        return (
            <Svg width={500} height={500}>
                <G transform={transform}>
                    <Polygon
                        points={store.background.map(p => p.map(a => a * SCALE_FACTOR).join(',')).join(' ')}
                        fill={theme.base}
                        stroke = "lightgrey"
                        strokeWidth= "0.5"
                    />
                    {store.shelves.map((shelf, id) => (
                        <Polygon
                            key={id}
                            points={shelf.map(p => p.map(a => a * SCALE_FACTOR).join(',')).join(' ')}
                            fill={theme.shelves}
                            // stroke = "#e1e2e6"
                            // strokeWidth= "1"
                            // stroke = "grey"
                            // strokeWidth= "1.5"
                            stroke = "lightgrey"
                            strokeWidth= "1"
                        />
                    ))}
                    {store.paths.map((path, id) => (
                        <Line 
                            key={id} 
                            stroke={theme.path}
                            strokeWidth={4}
                            strokeDasharray='15, 8' 
                            x1={path[0][0] * SCALE_FACTOR} 
                            y1={path[0][1] * SCALE_FACTOR} 
                            x2={path[1][0] * SCALE_FACTOR} 
                            y2={path[1][1] * SCALE_FACTOR} 
                        />
                    ))}
                </G>
            </Svg>
        );  
    }
}
  
export default class Map extends Component {
    state = {
        type: 1,
        constrain: true,
        constraints: {
            // combine: 'dynamic',
            // scaleExtent: [width / height, 5],
            // translateExtent: [[0, 0], [100, 100]],
        },
    };
  
    render() {
      const { constrain, constraints } = this.state;
      return (
        <View style={{ backgroundColor: theme.background }}>
            <ZoomableSvg
                // align="mid"
                vbWidth={500}
                vbHeight={500}
                width={width}
                height={height}
                initialTop={-150}
                initialLeft={-50}
                initialZoom={1.2}
                // doubleTapThreshold={300}
                meetOrSlice="meet"
                svgRoot={MapSVG}
                childProps={{ store, theme }}
                constrain={constrain ? constraints : null}
            />
        </View>
      );
    }
}