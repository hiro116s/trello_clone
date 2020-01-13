import React from 'react';

function Cards(props) {
    return (
        <div>
            <ul className='Board-Cards'>
                {props.cards.map((card, index) =>
                    <li className='Board-Card' key={index}>
                        <span>{card}</span>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Cards;