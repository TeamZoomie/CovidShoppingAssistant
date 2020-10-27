import React from 'react';

export const SettingsContext = React.createContext( {

    // Set light theme as default
    theme: 'light',

    // Function to switch between light and dark themes
    toggleTheme: () => {},

    // Display name for user
    username: 'Zoomie',

    // Default settings for lists
    defaultPriority: 'Low',
    notifications: true,
    use24HourTime: false,

    country: 'Australia',
    timezone: 0,

    setCountry: () => {},

    setTimezone: () => {}
    
});