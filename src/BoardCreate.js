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
      props.onBoardAdded({
        "id":counter,
        "name":boardName
      });
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
              <input type="text" value={boardName} onChange={(e) => setBoardName(e.target.value)}/>
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

export default BoardCreate;