/**
 * Defines a context to keep track of the user's settings.
 */

import React, { useState } from 'react';

export const SettingsContext = React.createContext();

/**
 * The main definition of the settings context.
 */
export const SettingsProvider = ({ children, onThemeChange }) => {

    const [theme, setTheme] = useState('light');
    const [username, setUsername] = useState('Zoomie');
    const [country, setCountry] = useState('AU');

    toggleTheme = (theme) => {
        setTheme(theme);
        onThemeChange(theme);
    }
  
    return (
        <SettingsContext.Provider
            value={{
                theme,
                toggleTheme,
                username,
                setUsername,
                country,
                setCountry
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};