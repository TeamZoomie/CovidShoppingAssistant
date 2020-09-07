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
import ActiveList from '../components/ActiveList';
import ShoppingLists from '../components/ShoppingLists';
import Heading from '../components/Heading';
import { ListsContext } from '../lists-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = (theme) => ({
    root: {
        flex: 1,
        // backgroundColor: theme['background-basic-color-1']
    },
    content: {
        padding: 24,
        height: '100%',
        backgroundColor: theme['background-basic-color-1'],
        flex: 1,
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
            <TopNavigation 
                title='Home' 
                alignment='center' 
                accessoryLeft={DrawerAction}
                accessoryRight={CreateAction}
            />
            <Divider/>
            <Layout style={styles.content}>
                <Heading category="h6" style={styles.heading}>My Active List</Heading>
                <ActiveList 
                    list={activeList}
                    onPress={() => navigation.navigate('List', { listId: activeList.id })}
                />
                <Heading category="h6" style={[styles.heading, { paddingTop: 24 }]}>Recent Lists</Heading>
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