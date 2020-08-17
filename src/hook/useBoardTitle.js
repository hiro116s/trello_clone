import { useEffect, useState } from 'react';

function useBoardTitle(boardList, id) {
    const [boardTitle, setBoardTitle] = useState('');

    useEffect(() => {
        const board = boardList.find(b => b.id.toString() === id);
        if (board !== undefined && board.name !== undefined) {
            setBoardTitle(board.name);
        }
    }, [boardList, id]);

    return boardTitle;
}

export default useBoardTitle;