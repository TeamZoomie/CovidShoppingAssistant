import React from 'react';
import { TouchableHighlight } from 'react-native';
import { TouchableHighlight as RNGHTouchableHighlight } from "react-native-gesture-handler";

export default BottomSheetTouchable = (props) => {
    if (Platform.OS === "android") {
      return (
        <RNGHTouchableHighlight {...props} />
      );
    }
    return <TouchableHighlight {...props} />
};