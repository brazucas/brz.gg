import React, { useEffect, useState } from "react";
import { useAuthToken } from "../hooks/useAuthToken";

export const LoginCallbackHandler = () => {
    const { setAuthToken, setAuthTokenExpiresIn, setAuthTokenType } = useAuthToken();

    const [error, setError] = useState(false);

    useEffect(() => {
        const url = new URL(window.location.href);
        const hash = url.hash.substr(1);
        const params = new URLSearchParams(hash);

        const accessToken = params.get('access_token');
        const expiresIn = Number(params.get('expires_in'));
        const type = params.get('token_type');
        const state = params.get('state');

        if (!accessToken || !expiresIn || !type) {
            setError(true);
        }

        const date = new Date();

        setAuthToken(accessToken);
        setAuthTokenExpiresIn(date.setTime(date.getTime() + (expiresIn * 1000)).toString());
        setAuthTokenType(type);

        if (state) {
            window.location.href = atob(state);
        } else {
            window.location.href = '/';
        }
    }, [])

    return (
        <>
            {error && (
                <div>
                    <h1>Erro ao fazer login</h1>
                    <p>Por favor, tente novamente.</p>
                </div>
            )}
        </>
    )
}