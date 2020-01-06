import React from 'react';

function Cards(props) {
    return (
        <div>
            <ul>
                {props.cards.map((card, index) =>
                    <li key={index}>
                        abc
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Cards;