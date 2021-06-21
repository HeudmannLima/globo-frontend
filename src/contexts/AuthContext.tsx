import React, { createContext, useState, FC, BaseSyntheticEvent, useEffect } from 'react';
import api from '../services/api';  
import { history } from '../App';

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
      api.defaults.headers.Authorization = `Bearer ${JSON.stringify(token)}`;
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
      const userAuthorizedData = await api.post('/login', data);

      if (userAuthorizedData.data) {
        const { token } = userAuthorizedData.data;
        
        localStorage.setItem('token', JSON.stringify(token))
        api.defaults.headers.Authorization = `Bearer ${token}`;
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
    api.defaults.headers.Authorization = undefined;
    history.push('/');
    await api.post('/logout');  
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
