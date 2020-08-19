import React from 'react';
import * as eva from '@eva-design/eva';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation';

export default function App() {
	return (
		<>
			<IconRegistry icons={EvaIconsPack}/>
			<ApplicationProvider {...eva} theme={eva.light}>
				<SafeAreaProvider>
					<StatusBar hidden/>
					<AppNavigator/>
				</SafeAreaProvider>
			</ApplicationProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
