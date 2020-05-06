import { Loader } from 'app/components/Loader';
import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { privateRoutes } from '../Routing/routes';

export function DashboardRoutes() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {privateRoutes.map((route, idx) => (
          <Route
            exact={route.exact === undefined ? true : route.exact}
            key={idx}
            path={`${url}/${route.key}`}
          >
            <route.component />
          </Route>
        ))}
        <Route component={Loader} />
      </Switch>
    </Suspense>
  );
}
