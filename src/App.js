import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import BoardCreate from './home/BoardCreate';
import BoardList from './home/BoardList';
import Home from './home/Home';

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
          <Home
            boardList={boardList}
            onBoardAdded={newBoard => setBoardList([...boardList, newBoard])}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
