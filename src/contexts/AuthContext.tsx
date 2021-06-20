import React, { createContext, useState, FC } from 'react';

export interface userData {
  email: string,
  senha: string,
  nivel_acesso: string,
}

export const contextDefaultValues: userData = {
  email: '',
  senha: '',
  nivel_acesso: '',
};

const Context = createContext<userData>(contextDefaultValues);

const AuthProvider: FC = ({ children }) => {
  const [email, setEmail] = useState(contextDefaultValues.email);
  const [senha, setSenha] = useState(contextDefaultValues.senha);
  const [nivel_acesso, setNivelAcesso] = useState(contextDefaultValues.nivel_acesso);

  return (
    <Context.Provider value={{ email, senha, nivel_acesso }}>
      { children }
    </Context.Provider>
  )
}

export { Context, AuthProvider };
