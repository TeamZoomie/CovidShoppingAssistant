import React, { Fragment } from 'react';
import { 
    View,
    Image,
    Dimensions 
} from 'react-native';
import { 
    Text, 
    Divider, 
    Layout, 
    withStyles,
    Icon
} from '@ui-kitten/components';
import ActiveList from '../components/ActiveList';
import ShoppingLists from '../components/ShoppingLists';
import Heading from '../components/Heading';
import { ListsContext } from '../lists-context';
import { FloatingAction } from 'react-native-floating-action';


const WIN_DIM = Dimensions.get('window');

// Define the necessary styling variables for different components
const styles = (theme) => ({
    root: {
        flex: 1,
        // backgroundColor: theme['background-basic-color-1']
    },
    content: {
        padding: 12,
        height: '100%',
        backgroundColor: theme['background-basic-color-1'],
        flex: 1,
    },
    headingBackground: {
        backgroundColor: theme['color-primary-default'],
        height: WIN_DIM.height * 0.15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    headingFont:{
        color: '#FFFFFF',
        fontWeight:'700'
    },
    imageStyle: {
        height: WIN_DIM.height * 0.15 - 40,
        width: WIN_DIM.height * 0.15,
        resizeMode: 'contain'
    },
    heading: {
        paddingBottom: 8
    },
    text: {
        // fontWeight: '700',
        textAlign: 'left',
        marginHorizontal: 8
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    bottomNavigation: {
        marginVertical: 8,
    },
});

// Actions for the floating button to do
const floatingButtonActions = [
    {
        text: 'Create list',
        name:'createListButton',
        icon: require('../assets/list.png'),
        position: 1
    }
]

function HomeScreen(props) {

    const { eva, navigation } = props;
    const styles = eva.style;
    const listsContext = React.useContext(ListsContext);
    const activeList = listsContext.activeList;

    // For the modal pop up warning
    const [visible, setVisible] = React.useState(false);
    return (
        <View style={styles.root}>
            {/* The top header bar */}
            <View style={styles.headingBackground}>
                <Text category="h2" style={styles.headingFont}>
                    ShopSafe
                </Text>
                <View>
                    <Image source={require('../assets/logo.png')} style={styles.imageStyle}/>
                </View>
            </View>
            {/* The list display */}
            <Layout style={styles.content}>
                <Heading category="h6" style={[styles.heading, { paddingTop: 5, fontWeight:'bold'}]}>Your Lists</Heading>
                {activeList && (
                    <Fragment>
                        <ActiveList 
                            list={activeList}
                            onPress={() => navigation.navigate('List', { 
                                screen: 'Main', params: { listId: activeList.id }
                            })}
                        />
                        <Divider style={{height: 3}} />
                    </Fragment>
                )}
                <ShoppingLists 
                    data={listsContext.lists}
                    activeList={activeList}
                    onPress={listId => {
                        navigation.navigate('List', { 
                            screen: 'Main',
                            params: { listId }
                        });
                    }}
                />
            </Layout>
            {/* The button to create lists */}
            <FloatingAction
                actions={floatingButtonActions}
                onPressItem={name => {
                    navigation.navigate('CreateList');
                }}
            />
        </View>
        
    );
}

export default React.memo(withStyles(HomeScreen, styles), (props, nextProps) => {
    return !props.navigation.isFocused();
});