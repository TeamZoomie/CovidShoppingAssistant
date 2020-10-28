import React from 'react';
import { View, Image, PixelRatio } from 'react-native';
import { 
    Button,
    CheckBox,
    Datepicker,
    Divider, 
    Input,
    IndexPath,
    Icon, 
    Layout, 
    TopNavigation, 
    TopNavigationAction,
    Text,
    Select,
    SelectItem,
    withStyles
} from '@ui-kitten/components';
import Heading from '../components/Heading';
import { ListsContext } from '../lists-context';
import { iconImages } from '../icon-images';

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
    },
    imageStyle: {
        padding: 10,
        marginRight: 5,
        height: PixelRatio.getPixelSizeForLayoutSize(5),
        width: '10%',
    }
});

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
);

const CreateListScreen = ({ eva, navigation }) => {

    const styles = eva.style;
    const [name, setName] = React.useState('');
    const [duedate, setDuedate] = React.useState(new Date());
    const [iconName, setIconName] = React.useState('Shopping');
    const [inconIndex, setIconIndex] = React.useState(new IndexPath(0));

    const icons = ['Shopping', 'Christmas', 'Party', 'Calendar', 'Shrimp'];

    const listsContext = React.useContext(ListsContext);

    const createList = () => {
        listsContext.addList({ name, duedate, active: true, icon: iconName }, listId => {
            navigation.navigate("List", {
                screen: "Main",
                params: { listId }
            });
        });
    }

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/>
    );  

    const IconListItem = (props) => (
        <View style={{ flexDirection: 'row' }}>
            <Image source={iconImages[props.name]} style={styles.imageStyle}/>
            <Text>{props.name}</Text>
        </View>
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
                        style={{ paddingBottom: 8 }}
                    />
                    <Heading category="c2">Due Date</Heading>
                    <Datepicker
                        date={duedate}
                        onSelect={nextDate => setDuedate(nextDate)}
                        style={{ paddingBottom: 8 }}
                    />
                    <Heading category="c2">Icon</Heading>
                    <Select
                        selectedIndex={inconIndex}
                        onSelect={index => {
                            setIconIndex(index);
                            setIconName(icons[index - 1])
                        }}
                        value={() => <IconListItem name={iconName} />}
                    >
                        {icons.map((name, i) => (
                            <SelectItem
                                key={i} 
                                title={() => <IconListItem name={name} />} 
                            />
                        ))}
                    </Select>
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