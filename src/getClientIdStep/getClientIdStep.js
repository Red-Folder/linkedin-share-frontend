import React, { useState } from 'react';
import Step from '../step/step.js';

import './getClientIdStep.css';

const STATE_KEY = 'LINKEDIN-SHARE';

const defaultState = {
    completed: false,
    clientId: null,
    authenticationUrl: null
}

const getSessionState = () => {
    const sessionState = sessionStorage.getItem(STATE_KEY);
    return sessionState ? JSON.parse(sessionState) : defaultState;
}

const setSessionState = (sessionState) => {
    sessionStorage.setItem(STATE_KEY, JSON.stringify(sessionState));
}

const onGo = (clientId) => {
    const sessionState = getSessionState();
    sessionState.clientId = clientId;
    sessionState.authenticationUrl = 'https://www.linkedin.com/oauth/v2/authorization?' +
        'response_type=code&' +
        `client_id=${clientId}&` +
        'scope=r_liteprofile w_member_social&' +
        'redirect_uri=http://localhost:3000/auth/callback';
    sessionState.completed = true;

    setSessionState(sessionState);

    window.location = sessionState.authenticationUrl;

    return null;
}

const GetClientIdStep = () => {
    const sessionState = getSessionState();

    const [clientId, setClientId] = useState('');

    const isActive = !sessionState.completed;

    const heading = sessionState.completed ? 'This is what we did' : 'We need your LinkedIn Client Id';

    return (
        <Step id={1} isActive={isActive} onGo={() => onGo(clientId)}>
            <div className='client-id-step'>
                <h2>{heading}</h2>
                <form>
                    <div className='form-group'>
                        <label htmlFor='client-id'> LinkedIn Client Id:</label>
                        <input id='client-id'
                            name='client-id'
                            className='form-control'
                            value={clientId}
                            onChange={(event) => setClientId(event.target.value)}
                            placeholder='Enter your LinkedIn Client Id' />
                    </div>
                </form>
                <p>
                    On submit the following will happen:
                </p>
                <ul>
                    <li>Use the LinkedIn Client Id to generate a LinkedIn Authorisation Url</li>
                    <li>Redirect the browser to that Url</li>
                    <li>User will complete authentication of a LinkedIn site</li>
                    <li>LinkedIn will redirect the browser back to here with a code</li>
                    <li>A request is then made, via our Request Access Token backend to convert that code to an Access Token</li>
                </ul>
            </div>
        </Step>
    );
}

export default GetClientIdStep;