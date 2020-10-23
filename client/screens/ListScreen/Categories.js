import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { 
    Icon,
    Text,
    Button,
    withStyles
} from '@ui-kitten/components';
import GridList from '../../components/GridList';
import Page from '../../components/Page';
import { categories } from '../../categories';

// const categories = [
//     {
//         title: 'Dairy',
//         category: 'Dairy',
//         icon: (style) => <Image 
//             source={require('../../assets/categories/dairy.png')} 
//             fill="black" style={style} 
//         />
//     },
//     {
//         title: 'Meat',
//         category: 'Meat',
//         icon: (style) => <Image 
//             source={require('../../assets/categories/meat.png')} 
//             fill="black" style={style} 
//         />
//     },
//     {
//         title: 'Fruit & Vegetables',
//         category: 'Fruit & Vegetables',
//         icon: (style) => <Image 
//             source={require('../../assets/categories/fruit.png')} 
//             fill="black" style={style} 
//         />
//     },
//     {
//         title: 'Bakery',
//         category: 'Bakery',
//         icon: (style) => <Image 
//             source={require('../../assets/categories/bakery.png')} 
//             fill="black" style={style} 
//         />
//     },
//     {
//         title: 'Laundry Accessories',
//         category: 'laundry',
//         icon: (style) => <Image 
//             source={require('../../assets/categories/cleaning.png')} 
//             fill="black" style={style} 
//         />
//     },
//     {
//         title: 'Clothes',
//         category: 'clothes',
//         icon: (style) => <Image 
//             source={require('../../assets/categories/clothes.png')} 
//             fill="black" style={style} 
//         />
//     },
//     {
//         title: 'Frozen',
//         category: 'frozen',
//         icon: (style) => <Image 
//             source={require('../../assets/categories/frozen.png')} 
//             fill="black" style={style} 
//         />
//     },
//     {
//         title: 'Natural',
//         category: 'Natural',
//         icon: (style) => <Image 
//             source={require('../../assets/categories/natural.png')} 
//             fill="black" style={style} 
//         />
//     },
//     {
//         title: 'Hygiene',
//         category: 'soap',
//         icon: (style) => <Image 
//             source={require('../../assets/categories/soap.png')} 
//             fill="black" style={style} 
//         />
//     },
//     {
//         title: 'Sweets',
//         category: 'junk food',
//         icon: (style) => <Image 
//             source={require('../../assets/categories/soap.png')} 
//             fill="black" style={style} 
//         />
//     }
// ];

const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
});

const ModalScreen = ({ navigation }) => {
    return (
        <Page 
            header="Set category"
            showDivider={false}
            navigation={navigation}
        >
            <GridList 
                data={categories}
                onPress={id => navigation.navigate('Main', {
                    category: categories[id].category
                })}
            />
        </Page>
    );
}

export default withStyles(ModalScreen, styles);