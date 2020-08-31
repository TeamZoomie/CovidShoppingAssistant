import React from 'react';
import { ScrollView, View } from 'react-native';
import { 
    Input, 
    Divider, 
    Icon,
    Button,
    Layout, 
    TopNavigation, 
    TopNavigationAction, 
    Datepicker,
    withStyles 
} from '@ui-kitten/components';
import ShoppingList from '../components/ShoppingList';
import { ListsContext } from '../lists-context';


const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
    },
    content: {
        justifyContent: 'center',
        padding: 16,
    },
    searchField: {
        width: '100%'
    }
});

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);

const AddIcon = (props) => (
    <Icon {...props} height={16} name='plus-circle-outline' />
);

const ListScreen = ({ route, navigation, eva }) => {

    const styles = eva.style;
    const { listId } = route.params;

    const [addText, setAddText] = React.useState('');
    const listsContext = React.useContext(ListsContext);
    const list = listsContext.getList(listId);

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/>
    );
    const AddAction = () => (
        <TopNavigationAction icon={AddIcon} onPress={() => addListItem({ name: 'Banananaas' })}/>
    );

    const addListItem = () => {
        listsContext.addListItem(listId, { name: addText, checked: false });
        setAddText('');
    }

    const onRemoveItem = (index) => {
        listsContext.removeListItem(listId, index);
    }

    const [date, setDate] = React.useState(list.date);

    // const renderCheckbox = ({item}) => (
    //     <CheckBox
    //         checked={item.checked}
    //         onChange={nextChecked => item.checked}>
    //     </CheckBox>
    // )

    // const renderItem = ({item}) => (
    //     <ListItem
    //         title={`${item.name}`}    
    //         description={`${item.category}`}
    //         //accessoryLeft={`${renderCheckbox}`}    
    //     />
    // )

    return (
        <View style={styles.root}>
            <TopNavigation 
                title={list.name} 
                alignment='center' 
                accessoryLeft={BackAction}
                accessoryRight={AddAction}
            />
            <Divider/>
            <Layout style={styles.content}>
                {/* <Text category='h1'>List</Text> */}
                {/* <Divider/> */}
                <Datepicker
                    date={list.date}
                    onSelect={nextDate => setDate(nextDate)}
                />
                <Divider/>
                {/* <List>
                    data={list.items}
                    renderItem={renderItem}
                </List> */}
                <View>
                    <Input
                        style={styles.searchField}
                        placeholder='Add new item...'
                        value={addText}
                        onChangeText={nextValue => setAddText(nextValue)}
                        onSubmitEditing={addListItem}
                    />
                    <Button 
                        style={styles.button} 
                        appearance='filled' 
                        accessoryLeft={AddIcon}
                        onPress={addListItem}
                    />
                </View>
                <ScrollView style={{ height: '100%' }}>
                    <ShoppingList data={list.items} onRemoveItem={onRemoveItem}/>
                </ScrollView>
            </Layout>
        </View>
    );
}

export default withStyles(ListScreen, styles);