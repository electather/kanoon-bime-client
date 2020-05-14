import { Row } from 'antd';
import { PageContainer } from 'app/components/utils/PageContainer';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';

export function TPI() {
  const { t } = useTranslation();
  return (
    <PageContainer title={t(translations.pages.thirdPartyInsurance())}>
      <Row gutter={[16, 16]}></Row>
    </PageContainer>
  );
}
