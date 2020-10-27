import React from 'react';
import { Image } from 'react-native';

export const categories = [
    {
        title: 'Dairy',
        category: 'Dairy',
        icon: (style) => <Image 
            source={require('./assets/categories/dairy.png')} 
            fill="black" style={style} 
        />
    },
    {
        title: 'Meat',
        category: 'Meat',
        icon: (style) => <Image 
            source={require('./assets/categories/meat.png')} 
            fill="black" style={style} 
        />
    },
    {
        title: 'Fruit & Vegetables',
        category: 'Fruit & Vegetables',
        icon: (style) => <Image 
            source={require('./assets/categories/fruit.png')} 
            fill="black" style={style} 
        />
    },
    {
        title: 'Bakery',
        category: 'Bakery',
        icon: (style) => <Image 
            source={require('./assets/categories/bakery.png')} 
            fill="black" style={style} 
        />
    },
    {
        title: 'Laundry Products',
        category: 'Laundry Products',
        icon: (style) => <Image 
            source={require('./assets/categories/cleaning.png')} 
            fill="black" style={style} 
        />
    },
    {
        title: 'Clothes',
        category: 'Clothes',
        icon: (style) => <Image 
            source={require('./assets/categories/clothes.png')} 
            fill="black" style={style} 
        />
    },
    {
        title: 'Frozen',
        category: 'Frozen',
        icon: (style) => <Image 
            source={require('./assets/categories/frozen2.png')} 
            fill="black" style={style} 
        />
    },
    {
        title: 'Natural',
        category: 'Natural',
        icon: (style) => <Image 
            source={require('./assets/categories/natural.png')} 
            fill="black" style={style} 
        />
    },
    {
        title: 'Personal Hygiene',
        category: 'Personal Hygiene',
        icon: (style) => <Image 
            source={require('./assets/categories/cleaning2.png')} 
            fill="black" style={style} 
        />
    },
    {
        title: 'Sweets',
        category: 'Sweets',
        icon: (style) => <Image 
            source={require('./assets/categories/candies.png')} 
            fill="black" style={style} 
        />
    }
];