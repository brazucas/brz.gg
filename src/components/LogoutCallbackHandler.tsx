import React, { useEffect } from "react";
import { useAuthToken } from "../hooks/useAuthToken";
import { useUser } from "../hooks/useUser";

export const LogoutCallbackHandler = () => {
    const { removeAuthTokens } = useAuthToken();
    const { removeUserInfo } = useUser();

    useEffect(() => {
        removeAuthTokens();
        removeUserInfo();

        window.location.href = '/';
    }, [])

    return (
        <></>
    )
}