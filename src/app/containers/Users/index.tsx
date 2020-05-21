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
import { useInjectReducer } from 'redux-injectors';

import { InsuranceList } from './List';
import { NewInsuranceRequest } from './New';
// import { tpiSaga } from './redux/saga';
import { reducer, sliceKey } from './redux/slice';
import { StatisticsTab } from './StatisticsTab';

export function Users() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  // useInjectSaga({ key: sliceKey, saga: tpiSaga });

  const { users: usersTranslations } = translations.pages;
  const { t } = useTranslation();
  return (
    <PageContainer title={t(usersTranslations.title())}>
      <Tabs defaultActiveKey="statistics">
        <Tabs.TabPane
          tab={
            <span>
              <BarChartOutlined />
              {t(usersTranslations.overViewTab.title())}
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
              {t(usersTranslations.dataTab.title())}
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
              {t(usersTranslations.newTab.title())}
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
