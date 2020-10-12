import React from 'react';
import { View } from 'react-native';
import Heading from '../components/Heading';
import { Input, Layout, CheckBox, withStyles } from '@ui-kitten/components';

const styles = (theme) => ({
    root: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2']
    },
    content: {
        width: '72%',
        flex: 1,
        padding: 2,
        backgroundColor: theme['background-basic-color-2']
    }
});

const AddItemScreen = ({ eva, navigation }) => {

    const styles = eva.style;

    // Keep headings consistent between items
    const headingCat = "h6";

    // Product Name
    const [productName, setProductName] = React.useState();

    // Barcode
    const [barcode, setBarcode] = React.useState();

    // Category - int as defined in ../store-maps/encoding.txt
    const [category, setCategory] = React.useState();

    // Is this product food? Useful for nutrition info
    const [isFood, setIsFood] = React.useState(false);

    // Energy
    const [energy, setEnergy] = React.useState();

    // Protein
    const [protein, setProtein] = React.useState();

    // Fat
    const [fat, setFat] = React.useState();

    // Carbs
    const [carbs, setCarbs] = React.useState();

    // Fibre
    const [fibre, setFibre] = React.useState();

    // Sodium
    const [sodium, setSodium] = React.useState();

    // Vegetarian
    const [vegetarian, setVegetarian] = React.useState();

    // Vegan
    const [vegan, setVegan] = React.useState();

    // Ingredients TODO Need to make a good way of doing this one as well
    const [ingerdients, setIngredients] = React.useState();



    return (
        <View style={styles.root}>
            <Layout style={styles.content}>
                <Heading 
                    category={headingCat} 
                    style={{ fontWeight: "700", padding: 16 }}
                >
                        Product Name
                </Heading>
                <Input
                    placeholder={productName}
                    value={productName}
                    onChangeText={nextValue => setProductName(nextValue)}    
                />
                
                <Heading 
                    category={headingCat} 
                    style={{ fontWeight: "700", padding: 16 }}>
                        Nutritional Information
                </Heading>
                <CheckBox
                    checked={isFood}
                    onChange={nextChecked => setIsFood(nextChecked)}>
                        {`Is this product food?`}
                </CheckBox>
                <Input
                    placeholder={`energy`}
                    value={energy}
                    disabled={!isFood}
                    onChangeText={nextValue => setEnergy(nextValue)}
                />
                <Input
                    placeholder={`protein`}
                    value={protein}
                    disabled={!isFood}
                    onChangeText={nextValue => setProtein(nextValue)}
                />
                <Input
                    placeholder={`fat`}
                    value={fat}
                    disabled={!isFood}
                    onChangeText={nextValue => setFat(nextValue)}
                />
                <Input
                    placeholder={`carbohydrates`}
                    value={carbs}
                    disabled={!isFood}
                    onChangeText={nextValue => setCarbs(nextValue)}
                />
                <Input
                    placeholder={`sodium`}
                    value={sodium}
                    disabled={!isFood}
                    onChangeText={nextValue => setSodium(nextValue)}
                />

                
                
                <CheckBox
                    checked={vegetarian}
                    onChange={nextChecked => setVegetarian(nextChecked)}>
                        {`Is this product vegetarian?`}
                </CheckBox>
                <CheckBox
                    checked={vegan}
                    onChange={nextChecked => setVegan(nextChecked)}>
                        {`Is this product vegan?`}
                </CheckBox>

                {/*TODO Definitely need a better way for this one*/}
                <Input
                    placeholder={`Choose a category.`}
                    value={category}
                    onChangeText={nextValue => setCategory(nextValue)}    
                />

                <Heading 
                    category={headingCat} 
                    style={{ fontWeight: "700", padding: 16 }}
                >
                        Barcode
                </Heading>

                <Input
                    placeholder={barcode}
                    value={barcode}
                    onChangeText={nextValue => setBarcode(nextValue)}    
                />
            </Layout>
        </View>
    );
};

export default withStyles(AddItemScreen, styles);