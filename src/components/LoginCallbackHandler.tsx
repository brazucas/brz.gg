import React, { useEffect } from "react";
import { useAuthToken } from "../hooks/useAuthToken";
import PropTypes from 'prop-types';

type ComponentProps = {
    token: {
        access_token: string;
        refresh_token: string;
        id_token: string;
        scope: string;
        expires_in: number;
        token_type: string;
    },
    state: string | null;
}

export const LoginCallbackHandler: React.FunctionComponent = ({ token, state }: ComponentProps) => {
    const { setAuthToken, setRefreshToken, setAuthTokenExpiresIn, setAuthTokenType } = useAuthToken();

    useEffect(() => {
        const date = new Date();

        setAuthToken(token.access_token);
        setRefreshToken(token.refresh_token);
        setAuthTokenExpiresIn(date.setTime(date.getTime() + (token.expires_in * 1000)).toString());
        setAuthTokenType(token.token_type);

        if (state) {
            window.location.href = atob(state);
        } else {
            window.location.href = '/';
        }
    }, [])

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