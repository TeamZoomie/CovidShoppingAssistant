export default {
    lists: {
        0: {
            id: 0,
            name: "Weekly", 
            date: new Date('2020-08-21'),
            items: [
                {
                    name: 'Apples',
                    category: 'Fruit & Vegetables',
                    quantity: 1,
                    checked: true
                },
                {
                    name: 'Carrot',
                    category: 'Fruit & Vegetables',
                    quantity: 1,
                    checked: true
                },
                {
                    name: 'Plumbus',
                    category: 'Fruit & Vegetables',
                    quantity: 1,
                    checked: true
                }
            ]
        },
        1: { 
            id: 1,
            name:'Christmas', 
            date:new Date('2019-12-22'),
            items: [
                {
                    name: 'Fruit',
                    category: 'Fruit & Vegetables',
                    quantity: 1,
                    checked: true
                }
            ]
        },
        2: {
            id: 2,
            name: 'Party', 
            date: new Date('2019-12-12'),
            items: [
                {
                    name: 'Fruit',
                    category: 'Fruit & Vegetables',
                    quantity: 1,
                    checked: false
                }
            ]
        },
        3: {
            id: 3,
            name: 'Daily', 
            date: new Date('2020-08-29'),
            items: [
                {
                    name: 'Cookies',
                    category: 'Snack',
                    quantity: 10,
                    checked: false
                }
            ]
        },
        4: {
            id: 4,
            name:'Todo: make list scrollable', 
            date: new Date('2018-08-29'),
            items: []
        },
    }
}