import React from 'react';
import { Link } from 'react-router-dom';

function BoardLink(props) {
  return (
    <Link to={`/b/${props.board.id}`} className='Board-link'>
      <div key={props.board.id} className='Board'>
        <h2>
          {props.board.name}
        </h2>
      </div>
    </Link>
  );
}

export default BoardLink;