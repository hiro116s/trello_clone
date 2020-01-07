import React from 'react';
import Cards from './Cards';
import CreateNewCard from './CreateNewCard';

function Lists(props) {
    return (
        <div>
            <ul>
                {props.lists.map((list, index) =>
                    <li key={index}>
                        <div>
                            {list.name}
                            <CreateNewCard addNewCard={(newCard) => props.addNewCard(index, newCard)} />
                            <Cards cards={list.cards} />
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Lists;