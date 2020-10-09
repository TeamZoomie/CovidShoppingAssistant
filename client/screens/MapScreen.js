import React from 'react';
import { View } from 'react-native';
import { 
    Button,
    CheckBox,
    Datepicker,
    Divider, 
    Input,
    Icon, 
    Layout, 
    TopNavigation, 
    TopNavigationAction,
    Text,
    withStyles
} from '@ui-kitten/components';
import Heading from '../components/Heading';
import Map from '../components/Map';


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
    }
});


const MapScreen = ({ eva, navigation }) => {

    const styles = eva.style;
    return (
        <View style={styles.root}>
            <Layout style={styles.content}>
                <View>
                    <Heading category="c2">Map Screen</Heading>
                    <Map/>
                    {/* <Input
                        placeholder="List name"
                        value={name}
                        onChangeText={nextValue => setName(nextValue)}
                        style={{ paddingBottom: 24 }}
                    />
                    <Heading category="c2">Due Date</Heading>
                    <Datepicker
                        date={dueDate}
                        onSelect={nextDate => setDueDate(nextDate)}
                        style={{ paddingBottom: 24 }}
                    /> */}
                </View>
            </Layout>
        </View>
    )
};

export default withStyles(MapScreen, styles);
