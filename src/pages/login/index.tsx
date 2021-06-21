import React, { useContext, useEffect } from 'react';
import { history } from '../../App';
import { Context } from '../../contexts/AuthContext';

import './style.css'

function Login() {
  const { handleLogin } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      history.push("/main");
      alert(`Usuário com Login ainda Ativo.\nClique em SAIR para deslogar e acessar a tela de Login novamente.`)
    }
  }, []);

  return (
    <div className="page">
      <div className="login">
        <img className="logo-login" src="https://media-exp1.licdn.com/dms/image/C4E0BAQHt9lbIi6GpEw/company-logo_200_200/0/1619098691521?e=1632355200&v=beta&t=rloi0Ly78pE6JBT1mR5olaGSDxak9phKgZ3UHWNnfs0" alt="avatar" />
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <input id="email" type="email" required placeholder="E-mail" />
          <input id="senha" type="password" required placeholder="Senha" />
          <button className="btn-login">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
