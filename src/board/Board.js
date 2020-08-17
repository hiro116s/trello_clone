import React, { useEffect } from 'react';
import useFirebase from '../hook/useFirebase';
import useBoardTitle from '../hook/useBoardTitle';
import CreateNewList, { createList } from './CraeteNewList';
import CreateNewCard from './CreateNewCard';
import Cards from './Cards';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import useCounter from '../hook/useCounter';
import { COLLECTION_LIST, FIREBASE_TOP_FIELD } from '../const';

function Board(props) {
    const { id } = useParams();
    const boardTitle = useBoardTitle(props.boardList, id);
    const [lists, setLists, isInitialized] = useFirebase(
        props.db,
        COLLECTION_LIST,
        toListsDataStorageKey(id)
    );

    const counter = useCounter(lists, () => lists
        .map(list => list.cards.map(card => card.id).reduce((id1, id2) => Math.max(id1, id2) + 1, 0))
        .reduce((id1, id2) => Math.max(id1, id2), 0))

    useEffect(() => {
        if (isInitialized.current) {
            props.db.collection(COLLECTION_LIST).doc(toListsDataStorageKey(id)).set({ [FIREBASE_TOP_FIELD]: lists });
        }
    }, [lists, props.db, id, isInitialized]);

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