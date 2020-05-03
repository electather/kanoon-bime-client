import { Loader } from 'app/components/Loader';
import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';
import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const routes = [
  {
    path: '',
    component: NotFoundPage,
    exact: true,
  },
];

export function DashboardRoutes() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
