import { useEffect, useState, useRef } from 'react';
import { FIREBASE_TOP_FIELD } from '../const';

function useFirebase(db, collectionName, docName) {
    const isInitialized = useRef(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        let ignore = false;
        if (!isInitialized.current) {
            // Reference: https://www.robinwieruch.de/react-hooks-fetch-data
            async function fetchData() {
                const doc = await db.collection(collectionName).doc(docName).get();
                if (!ignore) {
                    if (doc.data() !== undefined) {
                        setData(doc.data()[FIREBASE_TOP_FIELD]);
                    }
                    isInitialized.current = true;
                }
            }
            fetchData();
        }
        return () => { ignore = true; }
    }, [data, db, collectionName, docName]);

    return [data, setData, isInitialized];
}

export default useFirebase;