import React from 'react';
import '../App.css';
import BoardCreate from './BoardCreate';
import BoardLink from './BoardLink';

function Home(props) {
    return (
        <div className='Home-top'>
            <div>
                <BoardCreate
                    onBoardAdded={props.onBoardAdded}
                    boardList={props.boardList}
                />
            </div>
            {props.boardList.map((board, index) =>
                <BoardLink key={index} board={board} />
            )}
        </div>
    );
}

export default Home;