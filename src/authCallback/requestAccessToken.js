const requestAccessToken = (code) => {
    var payload = {
        code: code
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(payload)
    };

    return {
        accessToken: 'ABC-123'
    };
    /*
    return fetch("http://localhost:7071/api/RequestLinkedInAccessToken", options)
        .then(res => {
            return res.json();
        });
    */
}

export default requestAccessToken;