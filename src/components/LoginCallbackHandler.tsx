import React, { useEffect } from "react";
import { useAuthToken } from "../hooks/useAuthToken";
import PropTypes from 'prop-types';
import { useUser } from "../hooks/useUser";
import type { OAuthToken, OAuthUserInfo } from "../types/oauth.types";

type ComponentProps = {
    auth: {
        token: OAuthToken;
        user: OAuthUserInfo;
    },
    state: string | null;
}

export const LoginCallbackHandler: React.FunctionComponent = ({ auth, state }: ComponentProps) => {
    const { setAuthToken, setRefreshToken, setAuthTokenExpiresIn, setAuthTokenType } = useAuthToken();
    const { storeUserInfo } = useUser();

    const { token, user } = auth;

    useEffect(() => {
        const date = new Date();

        setAuthToken(token.access_token);
        setRefreshToken(token.refresh_token);
        setAuthTokenExpiresIn(date.setTime(date.getTime() + (token.expires_in * 1000)).toString());
        setAuthTokenType(token.token_type);
        storeUserInfo(user);

        if (state) {
            window.location.href = atob(state);
        } else {
            window.location.href = '/';
        }
    }, []);

    return (
        <></>
    )
}

LoginCallbackHandler.propTypes = {
    token: PropTypes.objectOf(
        PropTypes.shape({
            access_token: PropTypes.string.isRequired,
            refresh_token: PropTypes.string.isRequired,
            id_token: PropTypes.string.isRequired,
            scope: PropTypes.string.isRequired,
            expires_in: PropTypes.number.isRequired,
            token_type: PropTypes.string.isRequired,
        })
    ).isRequired,
    state: PropTypes.string
}