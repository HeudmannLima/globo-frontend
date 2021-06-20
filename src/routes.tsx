import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './pages/main'
import Login from './pages/login'

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/main" component={Main} />
    </Switch>
  );
}

export default Routes;