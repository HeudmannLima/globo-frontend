import './style.css'


function Login() {
  return (
    <div className="login">
      <img src="https://media-exp1.licdn.com/dms/image/C4E0BAQHt9lbIi6GpEw/company-logo_200_200/0/1619098691521?e=1632355200&v=beta&t=rloi0Ly78pE6JBT1mR5olaGSDxak9phKgZ3UHWNnfs0" alt="" />
      <h1>Login</h1>

      <input type="text" placeholder="E-mail" />
      <input type="text" placeholder="Senha" />

      <button>Entrar</button>
    </div>
  );
}

export default Login;
