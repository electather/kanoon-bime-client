import { Button, Checkbox, Input } from 'antd';
import { translations } from 'locales/i18n';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function LoginPage() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Helmet>
        <title>{t(translations.authPage.login.pageTitle())}</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>

      <div className="isoSignInForm">
        <form>
          <div className="isoInputWrapper">
            <Input
              size="large"
              placeholder={t(translations.authPage.login.username())}
              autoComplete="true"
            />
          </div>

          <div className="isoInputWrapper">
            <Input.Password
              size="large"
              type="password"
              placeholder={t(translations.authPage.login.password())}
              autoComplete="false"
            />
          </div>

          <div className="isoInputWrapper isoLeftRightComponent">
            <Checkbox>
              {t(translations.authPage.login.rememberCheckBox())}
            </Checkbox>
            <Button type="primary">
              {t(translations.authPage.login.signIn())}
            </Button>
          </div>

          <p className="isoHelperText">
            {t(translations.authPage.login.help())}
          </p>
        </form>
        <div className="isoInputWrapper isoOtherLogin">
          <Button type="primary" className="btnFacebook">
            {t(translations.authPage.login.facebook())}
          </Button>
          <Button type="primary" className="btnGooglePlus">
            {t(translations.authPage.login.google())}
          </Button>

          <Button type="primary" className="btnAuthZero">
            {t(translations.authPage.login.auth0())}
          </Button>
        </div>
        <div className="isoCenterComponent isoHelperWrapper">
          <Link to="/forgot-password" className="isoForgotPass">
            {t(translations.authPage.login.forgotPass())}
          </Link>
          <Link to="/register">
            {t(translations.authPage.login.createAcc())}
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
