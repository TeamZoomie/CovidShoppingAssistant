import React, { PureComponent, Component, Fragment } from 'react';
// import * as eva from '@eva-design/eva';
import { light, dark, mapping } from '@eva-design/eva';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation';
import { SettingsContext } from './settings-context';
import { ListsContext } from './lists-context';
import { getCountry, getTimezone } from 'countries-and-timezones';
import data from './data';

// import './wdyu';

class AppMain extends PureComponent {
	render() {
		return <AppNavigator/>;
	}
}


export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			theme: 'light',
			lists: Object.assign({}, data.lists),
			activeList: 0,
			username: 'Zoomie',
			country: 'AU',
			// Do this for now, but eventually generate serverside
			nextId: Object.values(data.lists).length + 1
		}
	}

	// Do () => when you want it binded to the class.
	toggleTheme = () => {
		this.setState(prevState => ({ theme: prevState.theme === 'light' ? 'dark' : 'light' }));
	}

	setCountry = (country) => {
		this.setState(({country: country}))
	}

	setTimezone = (country) => {
		this.setState({timezone: getTimezone(country)})
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
		// let t0 = new Date().getTime();
		if (!(listId in this.state.lists)) {
			return;
		}
		const list = this.state.lists[listId];
		const items = list.items.map((item, i) => i == itemIndex ? newItem : item);
		this.setState(prevState => ({
			lists: { ...prevState.lists, [listId]: { ...list, items }}
		}));

		// , () => {
			// let t1 = new Date().getTime();
			// console.log("Took " + (t1 - t0) + " ms")
		// }
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
		};
		const settingsContextValues = {
			theme: this.state.theme, 
			toggleTheme: this.toggleTheme, 
			username: this.state.username,
			country: this.state.country
		};
		return (
			<Fragment>
				<IconRegistry icons={EvaIconsPack}/>
				<ApplicationProvider mapping={mapping} theme={this.state.theme === 'light' ? light : dark}>
						<SettingsContext.Provider value={settingsContextValues}>
							<StatusBar hidden/>
							<ListsContext.Provider value={listContextValues}>
								<AppMain/>
							</ListsContext.Provider>
						</SettingsContext.Provider>
				</ApplicationProvider>
			</Fragment>
		);
	}
}
