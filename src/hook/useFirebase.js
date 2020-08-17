import { useEffect, useState, useRef } from 'react';
import { BOARD_DATA_STORAGE_KEY } from '../const';

function useFirebase(db, collectionName, docName) {
    const isInitialized = useRef(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        let ignore = false;
        if (!isInitialized.current) {
            // Reference: https://www.robinwieruch.de/react-hooks-fetch-data
            async function fetchData() {
                const doc = await db.collection(collectionName).doc(docName).get();
                console.log(doc, doc.data());
                if (!ignore) {
                    if (doc.data() !== undefined) {
                        setData(doc.data().data);
                    }
                    isInitialized.current = true;
                }
            }
            fetchData();
        }
        return () => { ignore = true; }
    }, [data, db]);

    return [data, setData, isInitialized];
}

export default useFirebase;