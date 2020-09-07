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
import ShoppingLists from '../components/ShoppingLists';
import { ListsContext } from '../lists-context';
import { BarCodeScanner} from 'expo-barcode-scanner';

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

    const DrawerAction = () => (
        <TopNavigationAction icon={HamburgerIcon} onPress={() => navigation.openDrawer()}/>
    );
    const CreateAction = () => (
        <TopNavigationAction icon={AddIcon} onPress={() => navigation.navigate('CreateList')}/>
    );

    // For the modal pop up warning
    const [visible, setVisible] = React.useState(false);

    // For barcode scanner
	const [hasPermission, setHasPermission] = React.useState(null);
	const [scanned, setScanned] = React.useState(false);

    // Get the necessary permissions to use the camera
    /*
	React.useEffect(() => {
		(async () => {
		  const { status } = await BarCodeScanner.requestPermissionsAsync();
		  setHasPermission(status === 'granted');
		})();
    }, []);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}

	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
    */
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

                {/*This is for a popup warning*/}
                {/* <Button onPress={() => setVisible(true)}> */}
                    {/* Be Warned About Shopping */}
                {/* </Button> */}
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

                {/*<BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                />
                <Button onPress={() => setScanned(false)}>
                    Scan
                </Button>*/}

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