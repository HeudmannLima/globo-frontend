import React, { useContext } from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';

<<<<<<< Updated upstream
import { Context } from './contexts/AuthContext';

import Main from './pages/main';
import Login from './pages/login';
import Management from './pages/management';

interface CustomProps extends RouteProps {
  isPrivate?: boolean,
}

function CustomRoute({ isPrivate, ...rest }: CustomProps) {
  const { authenticated } = useContext(Context);

  if (isPrivate && !authenticated) {
    return <Redirect exact to="/" />;
  }

  return <Route { ...rest } />;
}
=======
import Main from './pages/main'
import Login from './pages/login'
import Management from './pages/management'
>>>>>>> Stashed changes

function Routes() {
  return (
    <Switch>
<<<<<<< Updated upstream
      <CustomRoute exact path="/" component={Login} />
      <CustomRoute isPrivate exact path="/main" component={Main} />
      <CustomRoute isPrivate exact path="/management" component={Management} />
=======
      <Route exact path="/" component={Login} />
      <Route exact path="/main" component={Main} />
      <Route exact path="/management" component={Management} />
>>>>>>> Stashed changes
    </Switch>
  );
}

export default Routes;