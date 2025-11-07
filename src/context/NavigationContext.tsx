"use client";

import { validateSession, getMyAccount } from "@/app/auth/actions";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type HeaderTheme = "dark" | "light";

export interface PessoaInfo {
    id: number;
    num_documento: string | null;
    tipo_documento: string | null;
    nome: string;
    data_nasc: string | null;
    nome_mae: string | null;
    nome_pai: string | null;
    dt_validade: string | null;
    dt_emissao: string | null;
    estado_civil: string | null;
    sexo: string;
    nif: string;
    nacionalidade_id: string;
    naturalidade_id: string;
    concelho_id: string;
    ilha: string;
    pais: string;
    telefone: string;
    bairro: string;
    email: string;
    foto: string;
    freguesia: string;
    freguesia_id: string;
    ilha_id: string;
    localidade: string;
    localidade_id: string;
    naturalidade: string;
    nacionalidade: string;
}

interface User {
    user_id: number;
    session_token: string;
    email: string;
    name: string;
    pessoa_info: PessoaInfo;
}

export interface NavigationContextProps {
    headerTheme: HeaderTheme;
    setHeaderTheme: (theme: HeaderTheme) => void;
    hasSession: boolean;
    user?: User | undefined;
    setUser: (value: User | undefined) => void
    setHasSession: (value: boolean) => void
    refreshSession: () => Promise<void>;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

interface NavigationProviderProps {
    children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
    const [headerTheme, setHeaderTheme] = useState<HeaderTheme>("light");
    const [hasSession, setHasSession] = useState<boolean>(false);
    const [user, setUser] = useState<NavigationContextProps["user"]>(undefined);

    const refreshSession = async () => {
        try {
            const sessionIsValid = await validateSession("valor-do-fingerprint");
            if (sessionIsValid) {
                const userData = await getMyAccount("valor-do-fingerprint");
                setHasSession(true);
                setUser(userData);
            } else {
                setHasSession(false);
                setUser(undefined);
            }
        } catch (error) {
            console.error("Erro ao validar a sessão:", error);
            setHasSession(false);
            setUser(undefined);
        }
    };

    useEffect(() => {
        refreshSession();
    }, []);

    return (
        <NavigationContext.Provider
            value={{ headerTheme, setHeaderTheme, hasSession, user, refreshSession, setUser, setHasSession }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error("useNavigation must be used within a NavigationProvider");
    }
    return context;
};
