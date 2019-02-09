import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './goButton.css';

const GoButton = ({onGo}) => {
    return (
        <button className="go-button" onClick={onGo}>
            <FontAwesomeIcon icon="play-circle" />
        </button>
    );
}

export default GoButton;

