import Routes from './routes';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { AuthProvider } from './contexts/AuthContext';

import './global.css'

export const history = createBrowserHistory();

function App() {
  
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
