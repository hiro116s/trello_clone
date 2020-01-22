import React, { useState, useEffect } from 'react';
import CreateNewList, { createList } from './CraeteNewList';
import CreateNewCard from './CreateNewCard';
import Cards from './Cards';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

function Board(props) {
    const { id } = useParams();
    const boardTitle = props.findTitle(id);
    const [lists, setLists] = useState(
        JSON.parse(localStorage.getItem(toListsDataStorageKey(id))) || []);
    const [counter, setCounter] = useState(lists
        .map(list => list.cards.map(card => card.id).reduce((id1, id2) => Math.max(id1, id2), 0))
        .reduce((id1, id2) => Math.max(id1, id2), 0) + 1)

    useEffect(() => {
        localStorage.setItem(toListsDataStorageKey(id), JSON.stringify(lists));
    });

    function toListsDataStorageKey(id) {
        return `LISTS_${id}`;
    }

    function createNewCard(cardName, id) {
        return {
            "name": cardName,
            "id": id
        };
    }

    function reorder(result, lists) {
        const sIdx = result.source.index;
        const sDroppable = parseInt(result.source.droppableId.split("-").pop())
        const dIdx = result.destination.index;
        const dDroppable = parseInt(result.destination.droppableId.split("-").pop())

        if (sDroppable !== dDroppable) {
            const newSourceCards = Array.from(lists[sDroppable].cards);
            const newDestCards = Array.from(lists[dDroppable].cards);
            const [removed] = newSourceCards.splice(sIdx, 1);
            newDestCards.splice(dIdx, 0, removed);
            const newLists = Array.from(lists);
            newLists.splice(sDroppable, 1, createList(lists[sDroppable].id, lists[sDroppable].name, newSourceCards));
            newLists.splice(dDroppable, 1, createList(lists[dDroppable].id, lists[dDroppable].name, newDestCards));
            return newLists;
        } else {
            if (sIdx === dIdx) {
                return lists;
            }

            const newCards = Array.from(lists[sDroppable].cards);
            const [removed] = newCards.splice(sIdx, 1);
            newCards.splice(dIdx, 0, removed);
            const newLists = Array.from(lists);
            newLists.splice(sDroppable, 1, createList(lists[sDroppable].id, lists[sDroppable].name, newCards));
            return newLists;
        }
    }

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        setLists(reorder(result, lists));
    }

    return (
        <div className='Board-top' >
            <h1>{boardTitle}</h1>
            <div className='Board-contents'>
                <DragDropContext onDragEnd={onDragEnd}>
                    {lists.map((list, index) =>
                        <div key={index}>
                            <div className='Board-List'>
                                <p className='Board-List-name'>{list.name}</p>
                                <hr />
                                <CreateNewCard addNewCard={(cardName) => {
                                    setLists([
                                        ...lists.slice(0, index),
                                        createList(
                                            lists[index].id,
                                            lists[index].name,
                                            [...lists[index].cards, createNewCard(cardName, counter)]
                                        ),
                                        ...lists.slice(index + 1)
                                    ]);
                                    setCounter(counter + 1);
                                }} />
                                <Cards listId={index} cards={list.cards} />
                            </div>
                        </div>
                    )}
                </DragDropContext>
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