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
import { ListsContext } from '../lists-context';


const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2']
    },
    content: {
        padding: 16,
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

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);

const CreateListScreen = ({ eva, navigation }) => {

    const styles = eva.style;
    const [name, setName] = React.useState('');
    const [dueDate, setDueDate] = React.useState(new Date());

    const listsContext = React.useContext(ListsContext);

    const createList = () => {
        listsContext.addList({ name, dueDate, active: true }, listId => {
            navigation.pop();
            navigation.navigate("List", { listId });
        });
    }

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/>
    );  

    return (
        <View style={styles.root}>
            <TopNavigation 
                title="Create List" 
                alignment='center' 
                accessoryLeft={BackAction}
            />
            <Divider/>
            <Layout style={styles.content}>
                <View>
                    <Heading category="c2">Enter List Name</Heading>
                    <Input
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
                    />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 32 }}>
                    <Button
                        onPress={createList}
                        style={{ width: '50%' }}
                    >
                        Create
                    </Button>
                </View>
            </Layout>
        </View>
    );
}

export default withStyles(CreateListScreen, styles);