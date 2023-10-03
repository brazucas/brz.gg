import React from "react";
import { useAuthProvider } from "../../hooks/useAuthProvider";
import { useUser } from "../../hooks/useUser";

const LoginButton = () => {
    const { isUserAuthenticated} = useUser();
    const { loginAction, logoutAction } = useAuthProvider();

    const handleClick = () => {
        loginAction();
    }
    
    if (!isUserAuthenticated) {
        return (
            <button
                onClick={handleClick}
                className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                <span className="relative text-sm font-semibold text-white">
                    Entrar
                </span>
            </button>
        );
    } else {
        return (
            <span className="relative text-sm font-semibold text-white">
                Autenticado (<button className="underline" onClick={logoutAction}>Sair</button>)
            </span>
        );
    }
}

export default LoginButton;