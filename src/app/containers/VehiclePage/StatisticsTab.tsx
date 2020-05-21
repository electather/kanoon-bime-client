import { Col, Row, Statistic } from 'antd';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';

export function StatisticsTab() {
  const { t } = useTranslation();
  const { overViewTab } = translations.pages.vehicle;

  return (
    <React.Fragment>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Statistic
            title={t(overViewTab.submittedVehicles())}
            value={112893}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Statistic
            title={t(overViewTab.revenue())}
            value={120000}
            suffix={t(translations.global.rials())}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
