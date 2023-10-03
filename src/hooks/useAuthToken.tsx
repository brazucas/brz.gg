import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const useAuthToken = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['authToken', 'authTokenExpiresIn', 'authTokenType']);
    const [authToken, updateAuthToken] = useState(null);
    const [authTokenExpiresIn, updateAuthTokenExpiresIn] = useState(null);
    const [authTokenType, updateTokenType] = useState(null);

    const setAuthToken = (token: string) => setCookie('authToken', token);
    const setAuthTokenExpiresIn = (expiresIn: string) => setCookie('authTokenExpiresIn', expiresIn);
    const setAuthTokenType = (type: string) => setCookie('authTokenType', type);

    const removeAuthTokens = () => {
        removeCookie('authToken');
        removeCookie('authTokenExpiresIn');
        removeCookie('authTokenType');
    };
    
    useEffect(() => {
        const { authToken, authTokenExpiresIn, authTokenType } = cookies;
        updateAuthToken(authToken);
        updateAuthTokenExpiresIn(authTokenExpiresIn);
        updateTokenType(authTokenType);
    }, [cookies]);

    return {
        authToken, setAuthToken, authTokenExpiresIn, setAuthTokenExpiresIn, authTokenType, setAuthTokenType, removeAuthTokens
    };
};
