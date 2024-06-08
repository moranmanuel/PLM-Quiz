import './OptionsList.css';
import React from 'react';

function OptionsList({ children }) {
    return (
        <ul className='options-list'>
            {children}
        </ul>
    );
}

export { OptionsList };