import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { Button } from '@ui-kitten/components';
import Svg, {
    G,
    Circle,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Text
  } from 'react-native-svg';
import ZoomableSvg from 'zoomable-svg';
import polylabel from 'polylabel';
import stores from '../store-maps/stores';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    root: {
        paddingBottom: 8
    },
    container: {
        backgroundColor: '#ecf0f1',
    },
});

const theme = {
    background: '#E6E6E6',
    base: '#fff',
    shelves: '#DDDDDD',
    registers: '#ADADAD',
    categories: {
        fruitVeg: '#A1FFBC'
    },
    path: '#3b8ada'
};


const SCALE_FACTOR = 15;

function Tooltip(props) {
    const { type, geo, position } = props;
    const labels = {
        fruitVeg: 'Fruit & Vegetables'
    };
    const [x, y] = polylabel([geo], 1.0);
    const [pointerWidth, pointerHeight] = [30, 20];
    const pointer = [
        [x - pointerWidth / 2, y - pointerHeight], 
        [x, y], 
        [x + pointerWidth / 2, y - pointerHeight]
    ];
    const [boxWidth, boxHeight] = [160, 80]
    const fontSize = 25;
    
    return (
        <G font-size={fontSize}>
            <Rect 
                x={x - boxWidth / 2}
                y={y - boxHeight - pointerHeight} 
                width={boxWidth}
                height={boxHeight}
                fill="#fff"
                stroke='#ADADAD'
                strokeWidth="1"
                
            />
            <Polygon
                points={pointer.map(p => p.join(',')).join(' ')}
                fill="#fff"
                stroke='#ADADAD'
                strokeWidth="1"
            />
            <Text  
                x={x} 
                y={y - pointerHeight - boxHeight / 2 + fontSize / 2} 
                fill="black"
                textAnchor="middle"
                height={fontSize}
                width={boxWidth}
                dy={fontSize * -0.25}
                // style={{textAlignVertical: 'center'}}
            >
                    {labels[type]}
                    <Button>
                        Add detour
                    </Button>
            </Text>
        </G>
    )
} 


class MapSVG extends Component {

    state = {
        selected: undefined
    }

    onPress = (id, type) => {
        console.log('selected geo ' + id + ' type ' + type)
        this.setState({ selected: { id, type } })
    }

    onBackgroundPress = () => {
        console.log('background press')
        this.setState({ selected: undefined });
    }

    render() {
        const { store, theme, paths, transform } = this.props;
        let selected = this.state.selected !== undefined;
        const selectedGeo = selected ? 
                            store.categories[this.state.selected.type][this.state.selected.id].geo :
                            [];
        return (
            <Svg width={width} height={500} onPress={this.onBackgroundPress}>
                <G transform={transform}>
                    <Polygon
                        points={store.background.map(p => p.map(a => a * SCALE_FACTOR).join(',')).join(' ')}
                        fill={theme.base}
                    />
                    {store.shelves.map((shelf, id) => (
                        <Polygon
                            key={id}
                            points={shelf.map(p => p.map(a => a * SCALE_FACTOR).join(',')).join(' ')}
                            fill={theme.shelves}
                            // stroke = "#e1e2e6"
                            // strokeWidth= "1"
                            // stroke = "grey"
                            // strokeWidth= "2"
                            // stroke = "#ccc"
                            // strokeWidth= "1"
                        />
                    ))}
                    {store.registers.map((r, id) => (
                        <Polygon
                            key={id}
                            points={r.geo.map(p => p.map(a => a * SCALE_FACTOR).join(',')).join(' ')}
                            fill={theme.registers}
                        />
                    ))}
                    {store.selfServe.map((counter, id) => (
                        <Polygon
                            key={id}
                            points={counter.geo.map(p => p.map(a => a * SCALE_FACTOR).join(',')).join(' ')}
                            fill={theme.registers}
                        />
                    ))}
                    {Object.entries(store.categories).map(([k, v]) => (
                        v.map((entry, id) => {
                            const selected = this.state.selected && this.state.selected.id === id && this.state.selected.type === k;
                            const selectProps = selected ? { strokeWidth: 1, stroke: '#aaa'} : { key: id};
                            const points = entry.geo.map(p => p.map(a => a * SCALE_FACTOR));
                            return (
                                <Polygon
                                    key={id}
                                    points={points.map(p => p.join(',')).join(' ')}
                                    fill={theme.categories[k]}
                                    onPress={() => this.onPress(id, k)}
                                    {...selectProps}
                                />
                            );
                        })
                    ))}
                    {selected && (
                        <Tooltip 
                            type={this.state.selected.type} 
                            geo={selectedGeo.map(p => p.map(a => a * SCALE_FACTOR))}
                        />
                    )}
                    {paths && paths.map((path, id) => (
                        <Line 
                            key={id} 
                            stroke={theme.path}
                            strokeWidth={5}
                            strokeDasharray='50, 8' 
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
        <View style={{ backgroundColor: theme.background }} onPress={this.onBackgroundPress}>
            <ZoomableSvg
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
                childProps={{ 
                    store: stores.coles, 
                    theme,
                    paths: [
                        [[10, 19], [10, 25]],
                        [[10, 19], [20.5, 19]],
                        [[20.5, 19], [20.5, 9.5]]
                    ]
                }}
                constrain={constrain ? constraints : null}
            />
        </View>
      );
    }
}