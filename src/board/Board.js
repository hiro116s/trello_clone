import React, { useState, useEffect } from 'react';
import CreateNewList, { createList } from './CraeteNewList';
import Lists from './Lists';

function Board(props) {
    const [lists, setLists] = useState(
        JSON.parse(localStorage.getItem(toListsDataStorageKey(window.location.pathname.split("/").pop()))) || []);

    useEffect(() => {
        localStorage.setItem(toListsDataStorageKey(window.location.pathname.split("/").pop()), JSON.stringify(lists));
    });

    function toListsDataStorageKey(id) {
        return `LISTS_${id}`;
    }

    return (
        <div>
            <CreateNewList
                setLists={(newList) => setLists([...lists, newList])}
            />
            <Lists
                lists={lists}
                addNewCard={(index, newCard) => setLists([
                    ...lists.slice(0, index),
                    createList(
                        lists[index].id,
                        lists[index].name,
                        [...lists[index].cards, newCard]
                    ),
                    ...lists.slice(index + 1)
                ])}
            />
        </div>
    );
}

export default Board;