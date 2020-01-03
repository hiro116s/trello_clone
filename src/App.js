import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';

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

function BoardList(props) {
  return(
    <div>
      <ul className="BoardList">
        {props.boardList.map((board, index) =>
          <li key={board.id}>
            <Link to={`/b/${board.id}`}>{board.name}</Link>
          </li>)
        }
      </ul>
    </div>
  );
}

function App() {
  const BOARD_DATA_STORAGE_KEY = "board_data";
  const [boardList, setBoardList] = useState(JSON.parse(localStorage.getItem(BOARD_DATA_STORAGE_KEY)) || []);

  useEffect(() => {
    localStorage.setItem(BOARD_DATA_STORAGE_KEY, JSON.stringify(boardList));
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Switch>
        <Route path="/b/:id">
          Hello
        </Route>
        <Route path="/">
          <BoardCreate
            onBoardAdded={newBoard => setBoardList([...boardList, newBoard])}
            currentCounter={boardList.map(b => b.id).reduce((id1, id2) => Math.max(id1, id2) + 1, 0)}
          />
          <BoardList boardList={boardList}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
