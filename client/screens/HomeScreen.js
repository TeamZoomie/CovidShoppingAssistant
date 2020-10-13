import React from 'react';
import { 
    View,
    Image,
    PixelRatio,
    Dimensions 
} from 'react-native';
import { 
    Text, 
    Input, 
    Divider, 
    Icon, 
    Layout, 
    TopNavigation, 
    TopNavigationAction, 
    withStyles,
    Button,
    Modal,
    Card,
} from '@ui-kitten/components';
import ActiveList from '../components/ActiveList';
import ShoppingLists from '../components/ShoppingLists';
import Heading from '../components/Heading';
import { ListsContext } from '../lists-context';

const WIN_DIM = Dimensions.get('window');

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

const HamburgerIcon = (props) => (
    <Icon {...props} name='menu-outline' />
);

const AddIcon = (props) => (
    <Icon {...props} name='plus-outline' />
);

const HomeScreen = ({ eva, navigation }) => {

    const styles = eva.style;
    const listsContext = React.useContext(ListsContext);
    const activeList = listsContext.activeList;
    
    const DrawerAction = () => (
        <TopNavigationAction icon={HamburgerIcon} onPress={() => navigation.openDrawer()}/>
    );
    const CreateAction = () => (
        <TopNavigationAction icon={AddIcon} onPress={() => navigation.navigate('CreateList')}/>
    );

    // For the modal pop up warning
    const [visible, setVisible] = React.useState(false);
    return (
        <View style={styles.root}>
            {/*}
            <TopNavigation 
                title='Home' 
                alignment='center' 
                accessoryLeft={DrawerAction}
                accessoryRight={CreateAction}
            />*/}
            <View style={styles.headingBackground}>
                <Text category="h2" style={styles.headingFont}>
                    ShopSafe
                </Text>
                <View>
                    <Image source={require('../assets/logo.png')} style={styles.imageStyle}/>
                </View>
                {/* <View style={{ maxHeight: '100%' }}>
                </View> */}
            </View>
            <Layout style={styles.content}>
                <Heading category="h6" style={[styles.heading, { paddingTop: 5, fontWeight:'bold'}]}>Your Lists</Heading>
                <ActiveList 
                    list={activeList}
                    onPress={() => navigation.navigate('List', { listId: activeList.id })}
                />
                <Divider style={{height: 3}} />
                <ShoppingLists 
                    data={listsContext.lists} 
                    onPress={listId => {
                        navigation.navigate('List', { listId });
                    }}
                />
                
                {/* Warning */}
                <Modal
                    visible={visible}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => setVisible(false)}
                >
                    <Card disabled={true}>
                    <Text>Be sure to stay away from people and don't
                        touch your face.
                    </Text>
                    <Button onPress={() => setVisible(false)}>
                        Begin Shopping
                    </Button>
                    </Card>
                </Modal>
            </Layout>
        </View>
        
    );
}

export default withStyles(HomeScreen, styles);