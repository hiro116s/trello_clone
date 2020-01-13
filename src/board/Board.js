import React, { useState, useEffect } from 'react';
import CreateNewList, { createList } from './CraeteNewList';
import CreateNewCard from './CreateNewCard';
import Cards from './Cards';
import { useParams } from 'react-router-dom';

function Board(props) {
    const { id } = useParams();
    const boardTitle = props.findTitle(id);
    const [lists, setLists] = useState(
        JSON.parse(localStorage.getItem(toListsDataStorageKey(id))) || []);

    useEffect(() => {
        localStorage.setItem(toListsDataStorageKey(id), JSON.stringify(lists));
    });

    function toListsDataStorageKey(id) {
        return `LISTS_${id}`;
    }

    return (
        <div className='Board-top' >
            <h1>{boardTitle}</h1>
            <div className='Board-contents'>
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
        </div>
    );
}

export default Board;