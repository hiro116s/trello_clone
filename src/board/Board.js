import React, { useState } from 'react';
import CreateNewList from './CraeteNewList';
import Lists from './Lists';

function Board(props) {
    const [lists, setLists] = useState([]);

    return (
        <div>
            <CreateNewList
                setLists={(newList) => setLists([...lists, newList])}
            />
            <Lists
                lists={lists}
            />
        </div>
    );
}

export default Board;