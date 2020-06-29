import {
  BarChartOutlined,
  ContainerOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import { PageContainer } from 'app/components/utils/PageContainer';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { SelectedInsurance } from './Drawer';
import { InsuranceList } from './List';
import { NewInsuranceRequest } from './New';
import { tpiSaga } from './redux/saga';
import { actions, reducer, sliceKey } from './redux/slice';
import { StatisticsTab } from './StatisticsTab';

export function TPI() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: tpiSaga });

  const dispatch = useDispatch();

  const refreshList = () => {
    dispatch(actions.fetchList({ page: 1 }));
  };

  const operations = <Button onClick={refreshList}>بروز رسانی لیست</Button>;

  const { t } = useTranslation();
  return (
    <PageContainer title={t(translations.pages.thirdPartyInsurance.title())}>
      <Tabs defaultActiveKey="data" tabBarExtraContent={operations}>
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
      <SelectedInsurance />
    </PageContainer>
  );
}
