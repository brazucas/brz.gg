import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const useAuthToken = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['authToken', 'authTokenExpiresIn', 'authTokenType', 'refreshToken']);
    const [authToken, updateAuthToken] = useState(null);
    const [refreshToken, updateRefreshToken] = useState(null);
    const [authTokenExpiresIn, updateAuthTokenExpiresIn] = useState(null);
    const [authTokenType, updateTokenType] = useState(null);

    const setAuthToken = (token: string) => setCookie('authToken', token);
    const setRefreshToken = (type: string) => setCookie('refreshToken', type);
    const setAuthTokenExpiresIn = (expiresIn: string) => setCookie('authTokenExpiresIn', expiresIn);
    const setAuthTokenType = (type: string) => setCookie('authTokenType', type);

    const removeAuthTokens = () => {
        removeCookie('authToken', {path:'/'});
        removeCookie('authTokenExpiresIn', {path:'/'});
        removeCookie('authTokenType', {path:'/'});
        removeCookie('refreshToken', {path:'/'});
    };
    
    useEffect(() => {
        const { authToken, authTokenExpiresIn, authTokenType, refreshToken } = cookies;
        updateAuthToken(authToken);
        updateRefreshToken(refreshToken);
        updateAuthTokenExpiresIn(authTokenExpiresIn);
        updateTokenType(authTokenType);
    }, [cookies]);

    return {
        authToken, setAuthToken, authTokenExpiresIn, setAuthTokenExpiresIn, authTokenType, setAuthTokenType, removeAuthTokens, refreshToken, setRefreshToken
    };
};
