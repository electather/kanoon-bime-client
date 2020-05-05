// eslint-disable-next-line simple-import-sort/sort
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';

import { AuthContainer } from './components/AuthContainer';
import { Loader } from 'app/components/Loader';
import { LoginPage } from './Login';
import { NotFoundPage } from 'app/components/NotFoundPage';

export function AuthPage() {
  const { t } = useTranslation();
  const { url } = useRouteMatch();

  return (
    <AuthContainer>
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">{t(translations.global.siteName())}</Link>
          </div>
          <React.Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path={`${url}/login`} component={LoginPage} />
              <Route exact path={`${url}/register`} component={NotFoundPage} />
              <Route
                exact
                path={`${url}/forgot-password`}
                component={NotFoundPage}
              />
            </Switch>
          </React.Suspense>
        </div>
      </div>
    </AuthContainer>
  );
}
