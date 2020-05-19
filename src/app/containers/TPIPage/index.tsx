import {
  BarChartOutlined,
  ContainerOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Tabs } from 'antd';
import { PageContainer } from 'app/components/utils/PageContainer';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { InsuranceList } from './InsuranceList';
import { NewInsuranceRequest } from './NewInsurance';
import { StatisticsTab } from './StatisticsTab';

export function TPI() {
  const { t } = useTranslation();
  return (
    <PageContainer title={t(translations.pages.thirdPartyInsurance.title())}>
      <Tabs defaultActiveKey="statistics">
        <Tabs.TabPane
          tab={
            <span>
              <BarChartOutlined />
              {t(translations.pages.thirdPartyInsurance.overViewTab.title())}
            </span>
          }
          key="statistics"
        >
          <StatisticsTab />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <ContainerOutlined />
              {t(translations.pages.thirdPartyInsurance.dataTab.title())}
            </span>
          }
          key="data"
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
          key="new"
        >
          <NewInsuranceRequest />
        </Tabs.TabPane>
      </Tabs>
    </PageContainer>
  );
}
