import React, { useEffect } from 'react';
import useFirebase from './hook/useFirebase';
import { BOARD_DATA_STORAGE_KEY, COLLECTION_BOARD, FIREBASE_TOP_FIELD } from './const';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './home/Home';
import logo from './logo.svg';
import Board from './board/Board';

function App(props) {
  const [boardList, setBoardList, isInitialized] = useFirebase(props.db, COLLECTION_BOARD, BOARD_DATA_STORAGE_KEY);

  useEffect(() => {
    if (isInitialized.current) {
      // TODO: After fetching board list, always the store in firstore is updated.  It's unnecessary update.
      props.db.collection(COLLECTION_BOARD).doc(BOARD_DATA_STORAGE_KEY).set({ [FIREBASE_TOP_FIELD]: boardList });
    }
  }, [boardList, props.db, isInitialized]);

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" className="Header-link">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <Switch>
        <Route path="/b/:id">
          <Board
            boardList={boardList}
            db={props.db}
          />
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
