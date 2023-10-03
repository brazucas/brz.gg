import React, { useEffect } from "react";
import { useAuthToken } from "../hooks/useAuthToken";

export const LogoutCallbackHandler = () => {
    const { removeAuthTokens } = useAuthToken();

    useEffect(() => {
        removeAuthTokens();

        window.location.href = '/';
    }, [])

    return (
        <></>
    )
}