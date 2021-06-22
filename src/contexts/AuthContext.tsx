import React, { createContext, useState, FC, BaseSyntheticEvent, useEffect } from 'react';
import api from '../services/api';  
import { history } from '../App';


export enum nivelAcesso {
  FUNCIONARIO = 'funcionario',
  ADMINISTRADOR = 'administrador',
}

export interface userData {
  _id: string,
  email: string;
  nivel_acesso: string;
}

interface IContextProps {
  authenticated: boolean;
  handleLogin: (event: BaseSyntheticEvent) => {};
  handleLogout: () => void;
}

const Context = createContext({} as IContextProps);

const AuthProvider: FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.apiBackend.defaults.headers.Authorization = `Bearer ${JSON.stringify(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  function handleLoginError() {
    alert('Dados de Email/Senha Incorretos.\nTente novamente.');
    window.location.reload();
  }

  async function handleLogin(event: BaseSyntheticEvent) {
    event.preventDefault();

    const data = { 
      email: event.target["email"].value, 
      senha: event.target["senha"].value
    };

    try {
      const userAuthorizedData = await api.apiBackend.post('/login', data);

      if (userAuthorizedData.data) {       
        const { token, email, nivel_acesso } = userAuthorizedData.data;
        
        localStorage.setItem('token', JSON.stringify(token))
        api.apiBackend.defaults.headers.Authorization = `Bearer ${token}`;

        localStorage.setItem('email', email);
        localStorage.setItem('nivel_acesso', nivel_acesso);
        setAuthenticated(true);

        history.push('/main');
      } else {
        handleLoginError();
        setAuthenticated(false);
      }
    } catch(err) {
      setAuthenticated(false);
      handleLoginError();
      console.error(err);
    }
  }

  async function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('nivel_acesso');
    api.apiBackend.defaults.headers.Authorization = undefined;
    history.push('/');
    await api.apiBackend.post('/logout');  
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <Context.Provider value={{ authenticated, handleLogin, handleLogout }}>
      { children }
    </Context.Provider>
  )
}

export { Context, AuthProvider };
