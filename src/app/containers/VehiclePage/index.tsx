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

import { SelectedVehicle } from './Drawer';
import { InsuranceList } from './List';
import { NewInsuranceRequest } from './New';
import { StatisticsTab } from './StatisticsTab';

export function Vehicle() {
  const { vehicle: vehicleTranslations } = translations.pages;
  const { t } = useTranslation();
  return (
    <PageContainer title={t(vehicleTranslations.title())}>
      <Tabs defaultActiveKey="data">
        <Tabs.TabPane
          tab={
            <span>
              <BarChartOutlined />
              {t(vehicleTranslations.overViewTab.title())}
            </span>
          }
          key="statistics"
          disabled
        >
          <StatisticsTab />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <ContainerOutlined />
              {t(vehicleTranslations.dataTab.title())}
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
              {t(vehicleTranslations.newTab.title())}
            </span>
          }
          key="new"
        >
          <NewInsuranceRequest />
        </Tabs.TabPane>
      </Tabs>
      <SelectedVehicle />
    </PageContainer>
  );
}
