import React, { useState } from 'react';

function CreateNewList(props) {
    const [listName, setListName] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [counter, setCounter] = useState(0);

    function handleSubmit(event) {
        props.setLists(createList(counter, listName));
        setCounter(counter + 1);
        setIsFocused(false);
        event.preventDefault();
    }

    if (isFocused) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name='list_name' value={listName} onChange={(e) => setListName(e.target.value)} />
                    </label>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    } else {
        return (
            <div onClick={() => setIsFocused(true)}>
                Create new list
            </div>
        );
    }
}

export function createList(id, name) {
    return {
        "id": id,
        "name": name,
        "cards": []
    };
}
export default CreateNewList;