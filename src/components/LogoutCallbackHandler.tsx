import React, { useEffect } from "react";
import { useAuthToken } from "../hooks/useAuthToken";

export const LogoutCallbackHandler = () => {
    const { setAuthToken, setAuthTokenExpiresIn, setAuthTokenType } = useAuthToken();

    useEffect(() => {
        setAuthToken("", {
            days: 0,
        });
        setAuthTokenExpiresIn("", {
            days: 0,
        });
        setAuthTokenType("", {
            days: 0,
        });

        window.location.href = '/';
    }, [])

    return (
        <></>
    )
}