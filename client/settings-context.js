import React, { useState } from 'react';

export const SettingsContext = React.createContext();

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