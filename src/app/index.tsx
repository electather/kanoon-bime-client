/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { AuthPage } from './containers/AuthPage/Loadable';
import { MainRoute } from './containers/Routing/MainRoute';
import { PrivateRoute } from './containers/Routing/Private';
import { PrivateRoutes, PublicRoutes } from './containers/Routing/routes';
import { UnAuthenticatedRoute } from './containers/Routing/UnAuthenticated';
export function App() {
  return (
    <>
      <Helmet
        titleTemplate="%s - Dashboard project"
        defaultTitle="Dashboard project"
      >
        <meta name="description" content="A React Dashboard application" />
      </Helmet>
      <Switch>
        <Route path="/" exact component={MainRoute} />
        <UnAuthenticatedRoute
          path={PublicRoutes.LOGIN}
          unAuthenticatedComponent={AuthPage}
        />
        <PrivateRoute
          privateComponent={NotFoundPage}
          path={PrivateRoutes.DASHBOARD}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
