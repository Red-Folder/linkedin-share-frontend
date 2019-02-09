import React from 'react';
import StepNumber from '../stepNumber/stepNumber.js';
import GoButton from '../goButton/goButton.js';

import './step.css';

const Step = ({isActive, children, onGo}) => {
    return (
        <div className="row">
            <div className={`col-12 step ${isActive ? 'active-step': 'inactive-step'}`}>
                <div className="row">
                    <div className="col-2">
                        <StepNumber id={1} />
                    </div>
                    <div className="col-8">
                        <div className='step-content'>
                            {children}
                        </div>
                    </div>
                    <div className="col-2">
                        <GoButton onGo={onGo}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Step;