import React, { Fragment, useState, useContext } from 'react';
import { View, Dimensions } from 'react-native';
import {
    Icon, 
    Text,
    Layout, 
    withStyles,
    Divider,
    useTheme
} from '@ui-kitten/components';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import Heading from '../components/Heading';
import Map from '../components/Map';
import Collapsible from '../components/RNGHCollapsible';
import { ListsContext } from '../lists-context';

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
        paddingBottom: 8, 
        height: 65,
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
    headerContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%', 
        paddingRight: 24, 
        paddingLeft: 24
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
    alignRowCentre: {
        flexDirection: 'row', 
        alignItems: 'center'
    }
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

const Handle = (props) => {

    const styles = props.eva.style;
    return (
        <Fragment>
            <View style={styles.header}>
                <View style={styles.panelHandle} />
                <View style={styles.headerContainer}>
                    <View style={styles.alignRowCentre}>
                        <Text style={{ paddingLeft: 8 }}>
                            17 items
                        </Text>
                    </View>
                    <View style={styles.alignRowCentre}>
                        <Icon width={16} height={16} fill="black" name="pin-outline" />
                        <Text style={{ paddingLeft: 4, fontWeight: 'bold' }}>
                            4 stops
                        </Text>
                    </View>
                </View>
            </View>
            <Divider/>
        </Fragment>
    );
}

const ThemedHandle = withStyles(Handle, styles);

const MapScreen = ({ eva, navigation, route }) => {

    const styles = eva.style;
    const [selectedIndex, setSelectedIndex] = useState(null);
    const listsContext = useContext(ListsContext);

    // const { listId } = route.params;
    // const list = listsContext.lists[listId];

    // Not the best way, but easiest.
    const theme = useTheme();
    navigation.setOptions({ tabBarVisible: false })
    const updateSection = (sectionId, item) => {

    };

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
                        renderHandle={() => <ThemedHandle />}
                        data={Array.from({ length: 10 }).map((_, i) => ({ 
                            id: i, 
                            header: "Header " + String(i), 
                            subItems: Array.from({ length: 2 }).map((_, j) => ({ text: 'Item ' + String(j) }))
                        }))}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                            <Collapsible 
                                header={item.header} 
                                subItems={item.subItems} 
                            />
                        )}
                        contentContainerStyle={styles.contentContainerStyle}
                    />
                </View>
            </Layout>
        </View>
    )
};

export default withStyles(MapScreen, styles);
