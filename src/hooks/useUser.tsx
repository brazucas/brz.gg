import { useEffect, useState } from "react";
import { useAuthToken } from "./useAuthToken";

export const useUser = () => {
    const { authToken, authTokenExpiresIn } = useAuthToken();
    const [ isUserAuthenticated, setIsAuthenticated ] = useState(false);

    useEffect(() => {
        const isTokenExpired = new Date() > new Date(authTokenExpiresIn);
        setIsAuthenticated(authToken && !isTokenExpired);
    }, [authToken, authTokenExpiresIn]);

    return {
        isUserAuthenticated
    };
};
