import React from 'react';
import '../App.css';
import BoardCreate from './BoardCreate';
import BoardList from './BoardList';

function Home(props) {
    return (
        <div>
            <BoardCreate
                onBoardAdded={props.onBoardAdded}
                currentCounter={props.boardList.map(b => b.id).reduce((id1, id2) => Math.max(id1, id2) + 1, 0)}
            />
            <BoardList boardList={props.boardList}/>
        </div>
    );
}

export default Home;