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
    const [productName, setProductName] = React.useState('');

    // Barcode
    const [barcode, setBarcode] = React.useState(0);

    // Is this product food? Useful for nutrition info
    const [isFood, setIsFood] = React.useState(false);

    // Energy
    const [energy, setEnergy] = React.useState();

    return (
        <View style={styles.root}>
            <Layout style={styles.content}>
                <Heading 
                    category={headingCat} 
                    style={{ fontWeight: "700", padding: 16 }}>
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
                    onChangeText={nextValue => setEnergy(nextValue)}
                />

                <Heading category={headingCat} style={{ fontWeight: "700", padding: 16 }}>
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