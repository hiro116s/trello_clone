import React from 'react';
import { Link } from 'react-router-dom';

function BoardLink(props) {
  return (
    <div>
      <Link to={`/b/${props.board.id}`} className='Home-Board-link'>
        <div key={props.board.id} className='Home-Board'>
          <h2>
            {props.board.name}
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default BoardLink;