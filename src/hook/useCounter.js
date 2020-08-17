import { useEffect, useState } from 'react';

function useCounter(obj, getCounter) {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const currentCounter = getCounter();
        setCounter(currentCounter);
    }, [obj]);

    return counter;
}

export default useCounter;