import React, { Fragment } from 'react';
import * as eva from '@eva-design/eva';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation';
import { SettingsContext } from './settings-context';

export default function App() {

	const [theme, setTheme] = React.useState('light');
	const toggleTheme = () => {
		const nextTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(nextTheme);
	};

	return (
		<Fragment>
			<IconRegistry icons={EvaIconsPack}/>
			<SettingsContext.Provider value={{ theme, toggleTheme }}>
				<ApplicationProvider {...eva} theme={eva[theme]}>
					<SafeAreaProvider>
						<StatusBar hidden/>
						<AppNavigator/>
					</SafeAreaProvider>
				</ApplicationProvider>
			</SettingsContext.Provider>
		</Fragment>
	);
}