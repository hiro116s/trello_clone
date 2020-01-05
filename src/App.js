import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import BoardCreate from './BoardCreate';
import BoardList from './BoardList';

function App() {
  const BOARD_DATA_STORAGE_KEY = "board_data";
  const [boardList, setBoardList] = useState(JSON.parse(localStorage.getItem(BOARD_DATA_STORAGE_KEY)) || []);

  useEffect(() => {
    localStorage.setItem(BOARD_DATA_STORAGE_KEY, JSON.stringify(boardList));
  });
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" className="Header-link">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
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
