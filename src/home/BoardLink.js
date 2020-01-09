import React from 'react';
import { Link } from 'react-router-dom';

function BoardLink(props) {
  return (
    <Link to={`/b/${props.board.id}`}>
      <div key={props.board.id} className='Board'>
        {props.board.name}
      </div>
    </Link>
  );
}

export default BoardLink;