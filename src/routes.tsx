import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main'
import Login from './pages/login'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/app" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;