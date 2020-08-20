import React, { Fragment } from 'react';
import * as eva from '@eva-design/eva';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation';

export default function App() {
	return (
		<Fragment>
			<IconRegistry icons={EvaIconsPack}/>
			<ApplicationProvider {...eva} theme={eva.light}>
				<SafeAreaProvider>
					<StatusBar hidden/>
					<AppNavigator/>
				</SafeAreaProvider>
			</ApplicationProvider>
		</Fragment>
	);
}