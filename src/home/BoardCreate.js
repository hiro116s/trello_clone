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

  return (
    <div className="CreateBoard">
      <div className="CreateBoard-button" onClick={() => setIsFocused(!isFocused)}>
        <h3>Create board</h3>
      </div>
      {isFocused && <form onSubmit={handleSubmit} onReset={() => setIsFocused(!isFocused)} className="CreateBoard-form">
        <label>
          What shall we call the board? <br />
          <input type="text" className='CreateBoard-input' name='board_name' value={boardName} onChange={(e) => setBoardName(e.target.value)} />
        </label>
        <br />
        <input type="reset" value="Cancel"></input>
        <input type="submit" value="Submit"></input>
      </form>}
    </div>
  );
}

export function createBoard(id, name) {
  return {
    "id": id,
    "name": name
  };
}

export default BoardCreate;