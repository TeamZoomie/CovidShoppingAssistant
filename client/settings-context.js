import React from 'react';
import * as eva from '@eva-design/eva';

export const SettingsContext = React.createContext( {

    // Set light theme as default
    theme: 'light',

    // Function to switch between light and dark themes
    toggleTheme: () => {}
});