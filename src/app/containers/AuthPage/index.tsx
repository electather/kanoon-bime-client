import { Button, Checkbox, Input } from 'antd';
import { translations } from 'locales/i18n';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { AuthContainer } from './components/AuthContainer';

export function AuthPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Authentication</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <AuthContainer>
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">{t(translations.authPage.header())}</Link>
            </div>
            <div className="isoSignInForm">
              <form>
                <div className="isoInputWrapper">
                  <Input
                    size="large"
                    placeholder={t(translations.authPage.username())}
                    autoComplete="true"
                  />
                </div>

                <div className="isoInputWrapper">
                  <Input.Password
                    size="large"
                    type="password"
                    placeholder={t(translations.authPage.password())}
                    autoComplete="false"
                  />
                </div>

                <div className="isoInputWrapper isoLeftRightComponent">
                  <Checkbox>
                    {t(translations.authPage.rememberCheckBox())}
                  </Checkbox>
                  <Button type="primary">
                    {t(translations.authPage.signIn())}
                  </Button>
                </div>

                <p className="isoHelperText">
                  {t(translations.authPage.help())}
                </p>
              </form>
              <div className="isoInputWrapper isoOtherLogin">
                <Button type="primary" className="btnFacebook">
                  {t(translations.authPage.facebook())}
                </Button>
                <Button type="primary" className="btnGooglePlus">
                  {t(translations.authPage.google())}
                </Button>

                <Button type="primary" className="btnAuthZero">
                  {t(translations.authPage.auth0())}
                </Button>
              </div>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  {t(translations.authPage.forgotPass())}
                </Link>
                <Link to="/signup">{t(translations.authPage.createAcc())}</Link>
              </div>
            </div>
          </div>
        </div>
      </AuthContainer>
    </>
  );
}
