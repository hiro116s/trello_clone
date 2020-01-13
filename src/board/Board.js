import React, { useState, useEffect } from 'react';
import CreateNewList, { createList } from './CraeteNewList';
import CreateNewCard from './CreateNewCard';
import Cards from './Cards';

function Board(props) {
    const [lists, setLists] = useState(
        JSON.parse(localStorage.getItem(toListsDataStorageKey(window.location.pathname.split("/").pop()))) || []);

    useEffect(() => {
        localStorage.setItem(toListsDataStorageKey(window.location.pathname.split("/").pop()), JSON.stringify(lists));
    });

    function toListsDataStorageKey(id) {
        return `LISTS_${id}`;
    }

    // TODO: Add board title
    return (
        <div className='Board-top'>
            {lists.map((list, index) =>
                <div>
                    <div className='Board-List' key={index}>
                        <p className='Board-List-name'>{list.name}</p>
                        <hr />
                        <CreateNewCard addNewCard={(newCard) => setLists([
                            ...lists.slice(0, index),
                            createList(
                                lists[index].id,
                                lists[index].name,
                                [...lists[index].cards, newCard]
                            ),
                            ...lists.slice(index + 1)
                        ])} />
                        <Cards cards={list.cards} />
                    </div>
                </div>
            )}
            <div>
                <CreateNewList
                    setLists={(newList) => setLists([...lists, newList])}
                />
            </div>
        </div>
    );
}

export default Board;