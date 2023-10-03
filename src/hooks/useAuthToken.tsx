import useCookie from "react-use-cookie";

export const useAuthToken = () => {
    const [authToken, setAuthToken] = useCookie('authToken', null);
    const [authTokenExpiresIn, setAuthTokenExpiresIn] = useCookie('authTokenExpiresIn', null);
    const [authTokenType, setAuthTokenType] = useCookie('authTokenType', null);

    return {
        authToken, setAuthToken, authTokenExpiresIn, setAuthTokenExpiresIn, authTokenType, setAuthTokenType
    };
};
