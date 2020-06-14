import { Col, Row, Statistic } from 'antd';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';

export function StatisticsTab() {
  const { t } = useTranslation();
  const { overViewTab } = translations.pages.bodyInsurance;

  return (
    <React.Fragment>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Statistic
            title={t(overViewTab.submittedInsurances())}
            value={112893}
          />
        </Col>
        <Col span={8}>
          <Statistic title={t(overViewTab.iranInsuranceCases())} value={510} />
        </Col>
        <Col span={8}>
          <Statistic title={t(overViewTab.kosarInsuranceCases())} value={550} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Statistic
            title={t(overViewTab.revenue())}
            value={120000}
            suffix={t(translations.global.rials())}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title={t(overViewTab.iranInsuranceRevenue())}
            value={500000}
            suffix={t(translations.global.rials())}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title={t(overViewTab.kosarInsuranceRevenue())}
            value={700000}
            suffix={t(translations.global.rials())}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
