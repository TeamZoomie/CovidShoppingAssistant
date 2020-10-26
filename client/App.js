import React, { Component, Fragment } from 'react';
import * as eva from '@eva-design/eva';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation';
import { SettingsContext } from './settings-context';
import { ListsContext } from './lists-context';
import { createUser, getAPIToken } from './api/BackendServicesAPI';
import data from './data';


export default class App extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			theme: 'light',
			lists: Object.assign({}, data.lists),
			activeList: 0,
			
			password: 'Zoomie',
			username: 'Zoomie',
			serverIdentifier: '',
			serverToken: '',
			// Do this for now, but eventually generate serverside
			nextId: Object.values(data.lists).length + 1,
			test: 'test'
		}
		this.getToken();
	}

	// Do () => when you want it binded to the class.
	toggleTheme = () => {
		this.setState(prevState => ({ theme: prevState.theme === 'light' ? 'dark' : 'light' }));
	}

	addList = ({ name, duedate, active, icon, category }, cb) => {
		this.setState(prevState => ({
			lists: { 
				...prevState.lists, 
				[prevState.nextId]: { 
					id: prevState.nextId,
					name,
					duedate,
					active,
					date: new Date(),
					icon,
					items: []
				},
			},
			nextId: prevState.nextId + 1
		}), () => cb(this.state.nextId - 1));
	}

	getList = (listId) => {
		return this.state.lists[listId];
	}

	getLists = () => {
		return this.state.lists;
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

	updateListItem = (listId, itemIndex, newItem) => {
		if (!(listId in this.state.lists)) {
			return;
		}
		const list = this.state.lists[listId];
		const items = list.items.map((item, i) => i == itemIndex ? newItem : item);
		this.setState(prevState => ({
			lists: { ...prevState.lists, [listId]: { ...list, items }}
		}));
	}

	removeListItem = (listId, itemIndex) => {
		const list = this.state.lists[listId];
		this.setState(prevState => ({
			lists: { 
				...prevState.lists, 
				[listId]: { ...list, items: list.items.filter((_, index) => index != itemIndex) }
			}
		}));
	}

	setListActive = (listId) => {
		this.setState({ activeList: listId });
	}

	removeList = (listId) => {
		const { [listId]: value, ...listsWithout } = this.state.lists;
		this.setState({ lists: listsWithout });
	};

	getToken = () => {
		createUser(this.state.username, this.state.password)
			.then(data => {
				//console.log(data.username)
				const username = data.username
				this.setState({ serverIdentifier: username })

				getAPIToken(username, this.state.password)
					.then(payload => {
						this.setState({ serverToken: payload.token})
						console.log(payload)
				});
			});
			
		
		//console.log(this.state.username)
		
				
	}

	render() {
		const listContextValues = {
			activeList: this.state.lists[this.state.activeList],
			addList: this.addList,
			addListItem: this.addListItem,
			removeListItem: this.removeListItem,
			removeList: this.removeList,
			updateListItem: this.updateListItem,
			lists: this.state.lists,
			setListActive: this.setListActive,
			getToken: this.getToken,
		};
		const settingsContextValues = {
			theme: this.state.theme, 
			toggleTheme: this.toggleTheme, 
			username: this.state.username,
			serverIdentifier: this.state.serverIdentifier,
			serverToken: this.state.serverToken
		};
		return (
			<Fragment>
				<IconRegistry icons={EvaIconsPack}/>
				<ApplicationProvider {...eva} theme={eva[this.state.theme]}>
					<SafeAreaProvider>
						<SettingsContext.Provider value={settingsContextValues}>
							<StatusBar hidden/>
							<ListsContext.Provider value={listContextValues}>
								<AppNavigator/>
							</ListsContext.Provider>
						</SettingsContext.Provider>
					</SafeAreaProvider>
				</ApplicationProvider>
			</Fragment>
		);
	}
}