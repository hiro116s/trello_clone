import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function BoardCreate(props) {
  const [isFocused, setIsFocused] = useState(false);
  const [boardName, setBoardName] = useState("");

  function clearState() {
    setBoardName("");
    setIsFocused(false);
  }

  function handleSubmit(event) {
    props.onBoardAdded(boardName);
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

function BoardList(props) {
  return(
    <div>
      <ul className="BoardList">
        {props.boardList.map((board) => 
          <li>{board}</li>)
        }
      </ul>
    </div>
  );
}

function App() {
  const [boardList, setBoardList] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BoardCreate onBoardAdded={newBoard => setBoardList([...boardList, newBoard])}/>
      <BoardList boardList={boardList}/>
    </div>
  );
}

export default App;
