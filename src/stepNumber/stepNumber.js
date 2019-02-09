import React from 'react';

import './stepNumber.css';

const StepNumber = ({id}) => {
    return (
        <div className='step-number'>
            {id}
        </div>
    );
}

export default StepNumber;