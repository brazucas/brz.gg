import { useEffect, useState } from "react";
import { useAuthToken } from "./useAuthToken";

type UserInfo = {
    nickname: string;
    name: string;
    email: string;
    picture: string;
    email_verified: string;
}

export const useUser = () => {
    const { authToken, authTokenExpiresIn } = useAuthToken();
    const [ isUserAuthenticated, setIsAuthenticated ] = useState(false);
    const [ userInfo, setUserInfo ] = useState<UserInfo | null>(null);

    useEffect(() => {
        const isTokenExpired = new Date() > new Date(authTokenExpiresIn);
        setIsAuthenticated(authToken && !isTokenExpired);
    }, [authToken, authTokenExpiresIn]);

    useEffect(() => {
        if(isUserAuthenticated) {
            fetch(`https://${import.meta.env.PUBLIC_AUTH0_DOMAIN}/userinfo`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
                })
                .then(response => response.json())
                .then(data => setUserInfo(data)
            );
        }
    }, [isUserAuthenticated]);

    return {
        isUserAuthenticated, userInfo
    };
};
