import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

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

export default BoardList;