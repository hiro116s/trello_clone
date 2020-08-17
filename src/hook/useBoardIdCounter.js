import { useEffect, useState } from 'react';

function useBoardIdCounter(boardList) {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const currentCounter = boardList.map(b => b.id).reduce((id1, id2) => Math.max(id1, id2) + 1, 0);
        setCounter(currentCounter);
    }, [boardList]);

    return counter;
}

export default useBoardIdCounter;