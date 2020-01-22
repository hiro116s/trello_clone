import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function Cards(props) {
    return (
        <Droppable droppableId={`droppable-${props.listId}`}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {props.cards.map((card, index) =>
                        <Draggable key={card.id} draggableId={`card-${card.id}`} index={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className='Board-Card'
                                >
                                    <span>{card.name}</span>
                                </div>
                            )}
                        </Draggable>
                    )}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default Cards;