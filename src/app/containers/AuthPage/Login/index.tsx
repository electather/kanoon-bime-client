import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { PublicRoutes } from 'app/containers/Routing/routes';
import { actions, selectAuthState } from 'auth/slice';
import { translations } from 'locales/i18n';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);

  const onFinish = values => {
    dispatch(actions.login(values));
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{t(translations.authPage.login.pageTitle())}</title>
        <meta
          name="description"
          content={t(translations.authPage.login.pageDescription())}
        />
      </Helmet>

      <div className="isoSignInForm">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            className="isoInputWrapper"
            rules={[
              {
                required: true,
                message: t(translations.authPage.login.usernameError()),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t(translations.authPage.login.username())}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            className="isoInputWrapper"
            rules={[
              {
                required: true,
                message: t(translations.authPage.login.passwordError()),
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t(translations.authPage.login.password())}
              size="large"
            />
          </Form.Item>

          <Form.Item className="isoLoginButton">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>
                {t(translations.authPage.login.rememberCheckBox())}
              </Checkbox>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={authState === 'fetchingInfo'}
            >
              {t(translations.authPage.login.signIn())}
            </Button>
          </Form.Item>

          <p className="isoHelperText">
            {t(translations.authPage.login.help())}
          </p>
        </Form>
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
          <Link to={PublicRoutes.FORGOT_PASSWORD} className="isoForgotPass">
            {t(translations.authPage.login.forgotPass())}
          </Link>
          <Link to={PublicRoutes.REGISTER}>
            {t(translations.authPage.login.createAcc())}
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
