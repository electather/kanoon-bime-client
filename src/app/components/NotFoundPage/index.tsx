import { translations } from 'locales/i18n';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

import { P } from './P';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t(translations.errorPages[404].title())}</title>
        <meta
          name="description"
          content={t(translations.errorPages[404].subTitle())}
        />
      </Helmet>
      <Wrapper>
        <Title>{t(translations.errorPages[404].title())}</Title>
        <P>{t(translations.errorPages[404].subTitle())}</P>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: ${p => p.theme.text};
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;
