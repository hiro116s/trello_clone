import React, { useState } from 'react';
import useCounter from '../hook/useCounter';

function BoardCreate(props) {
  const counter = useCounter(props.boardList, () => props.boardList.map(b => b.id).reduce((id1, id2) => Math.max(id1, id2) + 1, 0));
  const [isFocused, setIsFocused] = useState(false);
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  const [boardName, setBoardName] = useState("");

  function clearState() {
    setBoardName("");
    setIsFocused(false);
    setIsInvalidInput(false);
  }

  function handleSubmit(event) {
    if (boardName === '') {
      setIsInvalidInput(true);
    } else {
      props.onBoardAdded(createBoard(counter, boardName));
      clearState();
    }
    event.preventDefault();
  }

  return (
    <div className="Home-CreateBoard">
      <div className="Home-CreateBoard-button" onClick={() => setIsFocused(true)}>
        <h3>Create board</h3>
      </div>
      {isFocused && <form onSubmit={handleSubmit} onReset={() => clearState()} className="Home-CreateBoard-form">
        <label>
          What shall we call the board? <br />
          <input type="text" className='Home-CreateBoard-input' name='board_name' value={boardName} onChange={(e) => setBoardName(e.target.value)} />
          <p className='Home-CreateBoard-error' aria-live='polite'>
            {isInvalidInput && 'Oops! Looks like you forgot the name!'}
          </p>
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