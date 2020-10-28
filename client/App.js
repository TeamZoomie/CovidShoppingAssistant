import React, { PureComponent, Component, Fragment } from 'react';
import { light, dark, mapping } from '@eva-design/eva';
import { StatusBar } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation';
import { SettingsProvider } from './settings-context';
import { ListsProvider } from './lists-context';
// import './wdyu';


class AppMain extends PureComponent {
	render() {
		return <AppNavigator/>;
	}
}

export default class App extends Component {

	state = { 
		theme: 'light' 
	}

	render() {
		return (
			<Fragment>
				<IconRegistry icons={EvaIconsPack}/>
				<ApplicationProvider mapping={mapping} theme={this.state.theme === 'light' ? light : dark}>
					<SettingsProvider onThemeChange={nextTheme => this.setState({ theme: nextTheme })}>
						<StatusBar hidden/>
						<ListsProvider>
							<AppMain/>
						</ListsProvider>
					</SettingsProvider>
				</ApplicationProvider>
			</Fragment>
		);
	}
}
