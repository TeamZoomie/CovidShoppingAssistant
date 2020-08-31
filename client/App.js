import React, { Component, Fragment } from 'react';
import * as eva from '@eva-design/eva';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation';
import { SettingsContext } from './settings-context';
import { ListsContext } from './lists-context';
import data from './data';


export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			theme: 'light',
			lists: Object.assign(data.lists),
			username: 'Zoomie'
		}
	}

	// Do () => when you want it binded to the class.
	toggleTheme = () => {
		this.setState(prevState => ({ theme: prevState.theme === 'light' ? 'dark' : 'light' }));
	}

	addList = ({ name }) => {

	}

	getList = (listId) => {
		return this.state.lists[listId];
	}

	addListItem = (listId, item) => {
		if (!(listId in this.state.lists)) {
			return;
		}
		const list = this.state.lists[listId];
		const items = list.items;
		this.setState(prevState => ({
			lists: { ...prevState.lists, [listId]: { ...list, items: [...items, item] }}
		}));
	}

	updateListItem = (listId, itemIndex) => {

	}

	removeListItem = (listId, itemIndex) => {
		const list = this.state.lists[listId];
		this.setState(prevState => ({
			lists: { 
				...prevState.lists, 
				[listId]: { ...list, items:list.items.filter((el, index) => index != itemIndex) }
			}
		}));
	}

	render() {
		const listContextValues = {
			addList: this.addList,
			addListItem: this.addListItem,
			removeListItem: this.removeListItem,
			getList: this.getList
		};
		const settingsContextValues = {
			theme: this.state.theme, 
			toggleTheme: this.toggleTheme, 
			username: this.state.username
		};
		return (
			<Fragment>
				<IconRegistry icons={EvaIconsPack}/>
				<SettingsContext.Provider value={settingsContextValues}>
					<ApplicationProvider {...eva} theme={eva[this.state.theme]}>
						<SafeAreaProvider>
							<StatusBar hidden/>
							<ListsContext.Provider value={listContextValues}>
								<AppNavigator/>
							</ListsContext.Provider>
						</SafeAreaProvider>
					</ApplicationProvider>
				</SettingsContext.Provider>
			</Fragment>
		);
	}
}