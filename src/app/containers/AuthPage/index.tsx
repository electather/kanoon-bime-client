// eslint-disable-next-line simple-import-sort/sort
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Switch, Route } from 'react-router-dom';

import { AuthContainer } from './components/AuthContainer';
import { Loader } from 'app/components/Loader';
import { NotFoundPage } from 'app/components/NotFoundPage';
import { PublicRoutes } from '../Routing/routes';
import { LoginPage } from './Login/Loadable';
import { ForgotPasswordPage } from './ForgotPass/Loadable';
import { RegisterPage } from './Register/Loadable';

export function AuthPage() {
  const { t } = useTranslation();

  return (
    <AuthContainer>
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link to="/dashboard">{t(translations.global.siteName())}</Link>
          </div>
          <React.Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path={PublicRoutes.LOGIN} component={LoginPage} />
              <Route
                exact
                path={PublicRoutes.REGISTER}
                component={RegisterPage}
              />
              <Route
                exact
                path={PublicRoutes.FORGOT_PASSWORD}
                component={ForgotPasswordPage}
              />
            </Switch>
          </React.Suspense>
        </div>
      </div>
    </AuthContainer>
  );
}
