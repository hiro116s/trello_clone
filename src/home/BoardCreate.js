import React, { useState } from 'react';

function BoardCreate(props) {
  const [counter, setCounter] = useState(props.currentCounter);
  const [isFocused, setIsFocused] = useState(false);
  const [boardName, setBoardName] = useState("");

  function clearState() {
    setBoardName("");
    setIsFocused(false);
  }

  function handleSubmit(event) {
    props.onBoardAdded(createBoard(counter, boardName));
    setCounter(counter + 1);
    clearState();
    event.preventDefault();
  }

  if (isFocused) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
              <input type="text" name='board_name' value={boardName} onChange={(e) => setBoardName(e.target.value)} />
          </label>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  } else {
    return (
      <div onClick={() => setIsFocused(true)}>
        Create board
        </div>
    );
  }
}

export function createBoard(id, name) {
  return {
    "id": id,
    "name": name
  };
}

export default BoardCreate;