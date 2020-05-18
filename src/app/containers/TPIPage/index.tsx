import {
  BarChartOutlined,
  ContainerOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Col, Row, Statistic, Tabs } from 'antd';
import { PageContainer } from 'app/components/utils/PageContainer';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { InsuranceList } from './InsuranceList';
import { NewInsuranceRequest } from './NewInsurance';

export function TPI() {
  const { t } = useTranslation();
  return (
    <PageContainer title={t(translations.pages.thirdPartyInsurance.title())}>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          tab={
            <span>
              <BarChartOutlined />
              {t(translations.pages.thirdPartyInsurance.overViewTab.title())}
            </span>
          }
          key="1"
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Statistic
                title={t(
                  translations.pages.thirdPartyInsurance.overViewTab.submittedInsurances(),
                )}
                value={112893}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={t(
                  translations.pages.thirdPartyInsurance.overViewTab.iranInsuranceCases(),
                )}
                value={510}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={t(
                  translations.pages.thirdPartyInsurance.overViewTab.kosarInsuranceCases(),
                )}
                value={550}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Statistic
                title={t(
                  translations.pages.thirdPartyInsurance.overViewTab.revenue(),
                )}
                value={120000}
                suffix={t(translations.global.rials())}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={t(
                  translations.pages.thirdPartyInsurance.overViewTab.iranInsuranceRevenue(),
                )}
                value={500000}
                suffix={t(translations.global.rials())}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title={t(
                  translations.pages.thirdPartyInsurance.overViewTab.kosarInsuranceRevenue(),
                )}
                value={700000}
                suffix={t(translations.global.rials())}
              />
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <ContainerOutlined />
              {t(translations.pages.thirdPartyInsurance.dataTab.title())}
            </span>
          }
          key="2"
        >
          <InsuranceList />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FormOutlined />
              {t(translations.pages.thirdPartyInsurance.newTab.title())}
            </span>
          }
          key="3"
        >
          <NewInsuranceRequest />
        </Tabs.TabPane>
      </Tabs>
    </PageContainer>
  );
}
