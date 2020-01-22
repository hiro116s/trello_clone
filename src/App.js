import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './home/Home';
import logo from './logo.svg';
import Board from './board/Board';

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
          <Board findTitle={id => boardList.find(b => b.id.toString() === id).name} />
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
