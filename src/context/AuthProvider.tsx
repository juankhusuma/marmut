"use client"

import { createContext, useState } from "react";

interface IAuth {
    email: string;
    role: string;
}

interface IAuthContext {
    auth: IAuth | null;
    login: (email: string, role: string) => void;
    logout: () => void;
}

export const AuthContext = createContext({
    auth: null,
    login: (email: string, role: string) => { },
    logout: () => { },
} as IAuthContext);

export default function AuthProvier({ children }: {
    children: React.ReactNode;
}) {

    const [auth, setAuth] = useState<IAuth | null>(null);

    const login = (email: string, role: string) => {
        setAuth({ email, role });
    };
    const logout = () => {
        setAuth(null);
    }

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}