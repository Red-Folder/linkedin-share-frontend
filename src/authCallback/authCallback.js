import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import parseCallback from './parseCallback.js';
import requestAccessToken from './requestAccessToken.js';

const AuthCallback = ({location, onReceivedAccessToken}) => {
    const parameters = location && location.search ? queryString.parse(location.search): undefined;
    const linkedInResponse = parseCallback(parameters);

    const [waitingForResponse, setResponse] = useState(true);

    const fetchAccessKey = async () => {
        const data = await requestAccessToken(linkedInResponse.code);
        onReceivedAccessToken(data);
        setResponse(false);
    };

    if (!linkedInResponse.error) {
        useEffect(() => {
            fetchAccessKey()
        }, [linkedInResponse.code]);
    }

    return (
        <div>
            {
                !linkedInResponse.error &&
                <div>
                    { waitingForResponse && <p>Loading...</p> }
                    { !waitingForResponse && <Redirect to={"/"} /> }
                </div>
            }
            {
                linkedInResponse.error &&
                <div>
                    <h2>{linkedInResponse.errorHeader}</h2>
                    <p>{linkedInResponse.errorDescription}</p>
                </div>
            }
        </div>
    );
}

export default AuthCallback;