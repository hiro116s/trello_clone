import React from 'react';

function Cards(props) {
    return (
        <div>
            <ul>
                {props.cards.map((card, index) =>
                    <li key={index}>
                        {card}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Cards;