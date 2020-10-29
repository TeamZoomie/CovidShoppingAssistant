/**
 * Defines the component on the bottom of the map screen to hold the user's
 * current list.
 */

import React from 'react';
import { TouchableHighlight } from 'react-native';
import { TouchableHighlight as RNGHTouchableHighlight } 
        from "react-native-gesture-handler";


/**
 * Defines the main component.
 */
export default BottomSheetTouchable = (props) => {
    if (Platform.OS === "android") {
      return (
        <RNGHTouchableHighlight {...props} />
      );
    }
    return <TouchableHighlight {...props} />
};