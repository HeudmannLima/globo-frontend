import React, { createContext, useState, FC } from 'react';

export interface userData {
    email: string,
    senha: string
}

export const contextDefaultValues: userData = {
    email: '',
    senha: ''
};

const Context = createContext<userData>(contextDefaultValues);

const AuthProvider: FC = ({ children }) => {
    const [email, setEmail] = useState(contextDefaultValues.email);
    const [senha, setSenha] = useState(contextDefaultValues.senha);

    return (
        <Context.Provider value={{ email, senha }}>
            { children }
        </Context.Provider>
    )
}

export { Context, AuthProvider };
