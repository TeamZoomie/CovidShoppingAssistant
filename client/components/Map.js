/**
 * Defines the component that displays store data, including items on the
 * user's shopping list and the optimal (shortest) route between each of these 
 * items.
 */

import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, {
    G,
    Circle,
    Path,
    Polygon,
    Rect,
    Text
  } from 'react-native-svg';
import ZoomableSvg from 'zoomable-svg';
import polylabel from 'polylabel';


const { width } = Dimensions.get('window');
const SCALE_FACTOR = 15;

/**
 * A function to make the underlying gemoetry data larger for display 
 * purposes.
 */
function rescale(geo) {
    return geo.map(([x, y]) => [x * SCALE_FACTOR, y * SCALE_FACTOR]);
}

/**
 * A function that defines the path between each item (in terms of actually
 * displaying it).
 */
function Tooltip(props) {
    const { text, width, height, position, theme } = props;
    const [x, y] = position;
    const pointerWidth = props.pointerWidth || 20;
    const pointerHeight = props.pointerHeight || 7;
    const pointer = [
        [x - pointerWidth / 2, y - pointerHeight], 
        [x, y], 
        [x + pointerWidth / 2, y - pointerHeight]
    ];
    const fontSize = props.fontSize || 25;

    return (
        <G font-size={fontSize}>
            <Path
                d={`M${x - width / 2 + 5},${y - height - pointerHeight}
                    h${width - 10}
                    q5,0 5,5
                    v${height - 10}
                    q0,5 -5,5
                    h${(-width / 2 + pointerWidth / 2) + 5}
                    L${x},${y}
                    L${pointer[0][0]},${pointer[0][1]}
                    h${(-width / 2 + pointerWidth / 2) + 5}
                    q-5,0 -5,-5
                    v${-height + 10}
                    q0,-5 5,-5
                    z
                `}
                fill="#fff"
                stroke={theme.tooltipBorder}
                strokeWidth={3}
            />
            <Text  
                x={x} 
                y={y - pointerHeight - height / 2 + fontSize / 2} 
                fill="black"
                textAnchor="middle"
                height={fontSize}
                width={width}
                dy={fontSize * -0.25}
                // style={{textAlignVertical: 'center'}}
            >
                    {text}
            </Text>
        </G>
    )
} 

/**
 * The main component definition.
 */
class MapSVG extends Component {

    state = {
        selected: undefined,
        walkablePoints: []
    }

    onPress = (id, type) => {
        this.setState({ selected: { id, type } })
    }

    onBackgroundPress = () => {
        this.setState({ selected: undefined });
    }

    render() {
        const { 
            store, theme, path, tooltips, entrance, transform 
        } = this.props;

        const debug = this.props.debug || false;
        let selected = this.state.selected !== undefined;

        const selectedGeo = selected ? 
                            store.categories[this.state.selected.type][
                                this.state.selected.id].geo : [];

        const rescaledPath = path.length > 0 ? rescale(path) : [];

        return (
            <Svg width={width} height={500} onPress={this.onBackgroundPress}>
                <G transform={transform}>
                    <Polygon
                        points={
                            store.background.map(p => p.map(
                                a => a * SCALE_FACTOR).join(',')
                            ).join(' ')
                        }
                        fill={theme.base}
                    />
                    {store.shelves.map((shelf, id) => (
                        <Polygon
                            key={id}
                            points={
                                shelf.geo.map(p => p.map(
                                    a => a * SCALE_FACTOR).join(',')
                                ).join(' ')
                            }
                            fill={theme.shelves}
                        />
                    ))}
                    {store.registers.map((r, id) => (
                        <Polygon
                            key={id}
                            points={
                                r.geo.map(p => p.map(
                                    a => a * SCALE_FACTOR).join(',')
                                ).join(' ')
                            }
                            fill={theme.registers}
                        />
                    ))}
                    {store.selfServe.map((counter, id) => (
                        <Polygon
                            key={id}
                            points={
                                counter.geo.map(p => p.map(
                                    a => a * SCALE_FACTOR).join(',')
                                ).join(' ')
                            }
                            fill={theme.registers}
                        />
                    ))}
                    {Object.entries(store.categories).map(([k, v]) => (
                        v.map((entry, id) => {
                            const points = entry.geo.map(p => p.map(
                                a => a * SCALE_FACTOR)
                            );
                            return (
                                <Polygon
                                    key={id}
                                    points={points.map(
                                        p => p.join(',')
                                    ).join(' ')}
                                    fill={theme.categories[k]}
                                    onPress={() => this.onPress(id, k)}
                                />
                            );
                        })
                    ))}
                    {path.length > 0 && (
                        <Path
                            d={"M " 
                                + rescaledPath[0].join(',') 
                                + rescaledPath.slice(1).map(([x, y]) => 
                                    `L ${x},${y}`).join(" ")
                            }
                            stroke={theme.path}
                            strokeWidth={7}
                            strokeDasharray='25, 2'
                            pointerEvents={'none'}
                        />
                    )}
                    <Rect
                        x={entrance[0] - 25}
                        y={entrance[1] - 25}
                        width={50}
                        height={30}
                        rx={5}
                        fill="#fff"
                        stroke={theme.tooltipBorder}
                        strokeWidth={3}
                    />
                    <Text
                        x={entrance[0]} 
                        y={entrance[1]} 
                        fill="black"
                        textAnchor="middle"
                        height={30}
                        width={70}
                        dy={25 * -0.25}
                    >
                        Entry
                    </Text>
                    {tooltips && tooltips.map((tooltip, i) => (
                        <Tooltip 
                            key={i}
                            theme={theme}
                            width={25}
                            height={25}
                            pointerWidth={10}
                            text={tooltip.order + 1} 
                            position={tooltip.position}
                        />
                    ))}
                    {selected && (
                        <Tooltip 
                            theme={theme}
                            width={130}
                            height={40}
                            text={this.state.selected.type} 
                            position={polylabel([selectedGeo], 1.0).map(
                                e => e * SCALE_FACTOR
                            )}
                        />
                    )}
                    {debug && this.props.walkablePoints.map(([x, y], id) => (
                        <Circle
                            key={id}
                            r={1}
                            cx={x}
                            cy={y}
                            fill="red"
                        />
                    ))}
                </G>
            </Svg>
        );  
    }
}

export default class Map extends Component {

    render() {
        const { theme, scaleFactor } = this.props;
        return (
            <View 
                style={{ 
                    backgroundColor: theme.background, 
                    height: this.props.height 
                }} 
                onPress={this.onBackgroundPress}
            >
                <ZoomableSvg
                    vbWidth={500}
                    vbHeight={this.props.height}
                    width={width}
                    height={this.props.height}
                    initialTop={50}
                    initialLeft={50}
                    initialZoom={1}
                    meetOrSlice="meet"
                    svgRoot={MapSVG}
                    childProps={{ 
                        store: this.props.store, 
                        theme,
                        path: this.props.path,
                        tooltips: this.props.tooltips,
                        debug: false,
                        entrance: this.props.store.entries[0].map(
                            e => e * scaleFactor
                        )
                    }}
                />
            </View>
        );
    }
}