import React, { useState } from 'react';
import Cards from './Cards';
import CreateNewCard from './CreateNewCard';

function Lists(props) {
    const [cards, setCards] = useState([]);

    return (
        <div>
            <ul>
                {props.lists.map((list, index) =>
                    <li key={index}>
                        <div>
                            {list.name}
                            <CreateNewCard addNewCard={(newCard) => setCards([...cards, newCard])} />
                            <Cards cards={cards} />
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Lists;