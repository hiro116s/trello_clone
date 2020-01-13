import React, { useState } from 'react';

function CreateNewList(props) {
    const [listName, setListName] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [counter, setCounter] = useState(0);

    function handleSubmit(event) {
        props.setLists(createList(counter, listName, []));
        setCounter(counter + 1);
        setListName("");
        event.preventDefault();
    }

    return (
        <div className="Board-CreateLists">
            {!isFocused &&
                <div className="Board-CreateLists-button" onClick={() => setIsFocused(true)}>
                    Add a list...
            </div>}
            {isFocused && <form className='Board-CreateLists-form' onSubmit={handleSubmit}>
                <input type="text" name='list_name' value={listName} autoFocus onChange={(e) => setListName(e.target.value)} />
            </form>}
        </div>
    );
}

export function createList(id, name, cards) {
    return {
        "id": id,
        "name": name,
        "cards": cards
    };
}
export default CreateNewList;