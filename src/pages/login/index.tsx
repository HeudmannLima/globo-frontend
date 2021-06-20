import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../contexts/AuthContext';

import './style.css'


function Login() {
  const authenticated = useContext(Context);

  console.log('Loginassa', authenticated);

  return (
    <div className="page">
      <div className="login">
        <img className="logo-login" src="https://media-exp1.licdn.com/dms/image/C4E0BAQHt9lbIi6GpEw/company-logo_200_200/0/1619098691521?e=1632355200&v=beta&t=rloi0Ly78pE6JBT1mR5olaGSDxak9phKgZ3UHWNnfs0" alt="avatar" />
        <h1>Login</h1>

        <input type="email" required placeholder="E-mail" />
        <input type="password" required placeholder="Senha" />
        
        <button>Entrar</button>        
      </div>
    </div>
  );
}

export default Login;
