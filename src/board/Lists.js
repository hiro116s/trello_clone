import React from 'react';
import Cards from './Cards';

function Lists(props) {
    return (
        <div>
            <ul>
                {props.lists.map((list, index) =>
                    <li key={index}>
                        <div>
                            {list.name}
                            <Cards cards={['a', 'b']} />
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Lists;