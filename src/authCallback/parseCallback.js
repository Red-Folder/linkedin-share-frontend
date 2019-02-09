const noParameters = parameters => !parameters;
const neitherErrorOrCode = parameters => !(parameters.error || parameters.code);
const missingCode = parameters => (parameters.state && !parameters.code);

const invalidParameters = parameters => {
    return noParameters(parameters) ||
        neitherErrorOrCode(parameters) ||
        missingCode(parameters);
}

const validateForMissingParameters = next => parameters => {
    if (invalidParameters(parameters)) {
        return {
            error: true,
            errorHeader: 'An error receiving parameters fron LinkedIn has occurred',
            errorDescription: 'Would expect parameters as specificied in https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/consumer/context#step-2-request-an-authorization-code'
        }
    }

    if (next) {
        return next(parameters);
    }

    return undefined;
}

const validateUserDidNotCancelLogin = next => parameters => {
    if (parameters.error && parameters.error === 'user_cancelled_login') {
        return {
            error: true,
            errorHeader: 'Authentication cancelled due to user login cancellation',
            errorDescription: parameters.error_description
        }
    }

    if (next) {
        return next(parameters);
    }

    return undefined;
}

const validateUserAuthorisedApp = next => parameters => {
    if (parameters.error && parameters.error === 'user_cancelled_authorize') {
        return {
            error: true,
            errorHeader: 'Authorisation not given by user',
            errorDescription: parameters.error_description
        }
    }

    if (next) {
        return next(parameters);
    }

    return undefined;
}

const parseValidParameters = parameters => {
    return {
        error: false,
        code: parameters.code
    };
}

const parseCallback = (parameters) => {
    const step3 = validateUserAuthorisedApp(parseValidParameters);
    const step2 = validateUserDidNotCancelLogin(step3);
    const step1 = validateForMissingParameters(step2);
    const result = step1(parameters);

    if (result) {
        return result;       
    }

    return {
        error: true,
        errorHeader: 'Unexpected error occurred',
        errorDescription: 'An unexpected error has occurred.'
    };
}

export default parseCallback;