import React from 'react';
import { ScrollView, View } from 'react-native';
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
    Card
} from '@ui-kitten/components';
import GridList from '../components/GridList';
import ShoppingLists from '../components/ShoppingLists';
import { ListsContext } from '../lists-context';

const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2']
    },
    content: {
        padding: 16,
    },
    header: {
        paddingBottom: 16
    },
    text: {
        // fontWeight: '700',
        textAlign: 'left',
        marginHorizontal: 8
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});

const uiData = [
    {
        title: 'Start Shopping',
        route: 'List',
        icon: (style) => <Icon name='shopping-bag-outline' fill="black" style={style} />
    },
    {
        title: 'Create List',
        route: 'List',
        icon: (style) => <Icon name='plus-circle-outline' fill="black" style={style} />
    },
]

const HamburgerIcon = (props) => (
    <Icon {...props} name='menu-outline' />
);

const AddIcon = (props) => (
    <Icon {...props} name='plus-outline' />
);

const HomeScreen = ({ eva, navigation, route }) => {

    const styles = eva.style;
    const listsContext = React.useContext(ListsContext);

    // const { callback } = route.params;
    // if (callback) {
    //     callback();
    // }
    // const { state } = navigation;
    // if (state && state.params && state.params.callBack)
        // state.params.callBack();

    // if (route.params && 'callback' in route.params) {
    //     navigation.getParams('callback');
    //     route.params.callback();
    // }

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
            <TopNavigation 
                title='Home' 
                alignment='center' 
                accessoryLeft={DrawerAction}
                accessoryRight={CreateAction}
            />
            <Divider/>
            <Layout style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.text} category="h4">Welcome</Text>
                </View>
                {/* <Input
                    placeholder='Search...'
                    value={value}
                    onChangeText={nextValue => setValue(nextValue)}
                /> */}
                {/* <GridList 
                    data={uiData} 
                    onPress={id => navigation.navigate(uiData[id].route)}
                />
                <Divider/> */}

                {/*This is for a popup warning*/}
                <Button onPress={() => setVisible(true)}>
                    Be Warned About Shopping
                </Button>
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

                <View style={{ height: '100%' }}>
                    <ShoppingLists 
                        data={listsContext.lists} 
                        onPress={listId => {
                            navigation.navigate('List', { listId });
                        }} 
                    />
                </View>
            </Layout>
        </View>
    );
}

export default withStyles(HomeScreen, styles);