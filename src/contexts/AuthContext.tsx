import React, { createContext, useState, FC } from 'react';

export interface userData {
  email: string,
  senha: string, //?
  nivel_acesso: string,
}

export const contextDefaultValues: userData = {
  email: '',
  senha: '',
  nivel_acesso: '',
};

// const Context = createContext<userData>(contextDefaultValues);

// const authenticated: boolean = true;
// const Context = createContext(authenticated);

interface IContextProps {
  authenticated: boolean;
}

const Context = createContext({} as IContextProps);

const AuthProvider: FC = ({ children }) => {
  // const [email, setEmail] = useState(contextDefaultValues.email);
  // const [senha, setSenha] = useState(contextDefaultValues.senha);
  // const [nivel_acesso, setNivelAcesso] = useState(contextDefaultValues.nivel_acesso);
  const [authenticated, setAuthenticated] = useState(false);

  return (
    // <Context.Provider value={{ email, nivel_acesso }}>

    <Context.Provider value={{ authenticated }}>
      { children }
    </Context.Provider>
  )
}

export { Context, AuthProvider };

