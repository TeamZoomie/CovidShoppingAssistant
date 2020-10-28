import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAsyncSetState } from "use-async-setstate";
import data from './data';


const initialLists = Object.assign({}, data.lists);

export const ListsContext = React.createContext();

export const ListsProvider = ({ children }) => {

    const [lists, setLists] = useAsyncSetState(initialLists);
    const [activeList, setActiveList] = useState(0);
    const [nextId, setNextId] = useAsyncSetState(Object.values(initialLists).length + 1);

    addList = async ({ name, duedate, active, icon }, cb) => {

        await setLists(prevLists => ({
            ...prevLists, 
            [nextId]: { 
                id: nextId,
                name,
                duedate,
                active,
                date: new Date(),
                icon,
                items: []
            }
        }));
        await setNextId(id => id + 1);
        cb(nextId);
    }
    
    addListItem = (listId, item) => {
        if (!(listId in lists)) {
			return;
        }
        const list = lists[listId];
        const items = list.items;
        
        setLists({
            ...lists,
            [listId]: { 
                ...list, 
                items: [...items, item] 
            }
        });
    } 

    updateListItem = (listId, itemIndex, newItem) => {
		if (!(listId in lists)) {
			return;
		}
		const list = lists[listId];
		const items = list.items.map((item, i) => i == itemIndex ? newItem : item);
		setLists({
			...lists, [listId]: { ...list, items }
        });
    }
    
    removeListItem = (listId, itemIndex) => {
		const list = lists[listId];
		setLists({
            ...lists, 
            [listId]: { ...list, items: list.items.filter((_, index) => index != itemIndex) }
		});
	}

	removeList = (listId) => {
        const { [listId]: value, ...listsWithout } = lists;
        setLists(listsWithout)
	};

    return (
        <ListsContext.Provider
            value={{
                activeList: lists[activeList],
                addList,
                addListItem,
                removeListItem,
                removeList,
                updateListItem,
                lists,
			    setListActive: setActiveList
            }}
        >
            {children}
        </ListsContext.Provider>
    );
};