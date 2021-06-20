import Routes from './routes';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { AuthProvider } from './contexts/AuthContext';

import './global.css'

function App() {
  return (
    <AuthProvider>
      <Router history={createBrowserHistory()}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
