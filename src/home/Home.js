import React from 'react';
import '../App.css';
import BoardCreate from './BoardCreate';
import BoardLink from './BoardLink';

function Home(props) {
    return (
        <div className='Home'>
            <BoardCreate
                onBoardAdded={props.onBoardAdded}
                currentCounter={props.boardList.map(b => b.id).reduce((id1, id2) => Math.max(id1, id2) + 1, 0)}
            />
            {props.boardList.map((board, index) =>
                <BoardLink board={board} />
            )}
        </div>
    );
}

export default Home;