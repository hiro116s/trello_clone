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
            <form onSubmit={handleSubmit}>
                <input type="text" name='card_name' value={cardName} onChange={(e) => setCardName(e.target.value)} />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default CreateNewCard;