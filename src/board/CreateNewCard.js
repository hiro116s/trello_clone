import React, { useState } from 'react';

function CreateNewCard(props) {
    const [cardName, setCardName] = useState('');

    function handleSubmit(event) {
        props.addNewCard(cardName);
        setCardName('');
        event.preventDefault();
    }

    return (
        <div>
            <form className='Board-CreateCard' onSubmit={handleSubmit}>
                <input type="text" name='card_name' className='Board-CreateCard-input' value={cardName} onChange={(e) => setCardName(e.target.value)} />
            </form>
        </div>
    )
}

export default CreateNewCard;