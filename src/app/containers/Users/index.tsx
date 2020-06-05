import {
  BarChartOutlined,
  ContainerOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Avatar, Descriptions, Drawer, Tabs } from 'antd';
import { PageContainer } from 'app/components/utils/PageContainer';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { List } from './List';
import { NewInsuranceRequest } from './New';
import { actions, selectDrawerData } from './redux/slice';
import { StatisticsTab } from './StatisticsTab';

export function Users() {
  const selectedUser = useSelector(selectDrawerData);
  const dispatch = useDispatch();
  const { findOne } = translations.pages.users.dataTab;
  const { users: usersTranslations } = translations.pages;
  const { t } = useTranslation();
  return (
    <PageContainer title={t(usersTranslations.title())}>
      <Tabs defaultActiveKey="data">
        <Tabs.TabPane
          tab={
            <span>
              <BarChartOutlined />
              {t(usersTranslations.overViewTab.title())}
            </span>
          }
          disabled
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
          <List />
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
      <Drawer
        width={700}
        placement="right"
        title={t(findOne.title())}
        closable={true}
        onClose={() => dispatch(actions.clearSelectedUser())}
        visible={!!selectedUser}
      >
        <Descriptions bordered column={2}>
          <Descriptions.Item label={t(findOne.elements.avatar())} span={2}>
            <Avatar src={selectedUser?.avatar?.url} />
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.firstName())}>
            {selectedUser?.firstName}
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.firstName())}>
            {selectedUser?.lastName}
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.role())}>
            {selectedUser?.role}
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.phone())}>
            +98{selectedUser?.phone}
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.melliCode())}>
            {selectedUser?.info?.melliCode}
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.address())}>
            {selectedUser?.info?.address}
          </Descriptions.Item>
          <Descriptions.Item
            label={t(findOne.elements.melliCardScanFront())}
            span={2}
          >
            <img
              src={selectedUser?.info?.melliCardScanFront?.url}
              alt="melliCardScanFront"
              style={{ maxHeight: '250px', maxWidth: '100%' }}
            />
          </Descriptions.Item>
          <Descriptions.Item
            label={t(findOne.elements.melliCardScanBack())}
            span={2}
          >
            <img
              src={selectedUser?.info?.melliCardScanBack?.url}
              alt="melliCardScanBack"
              style={{ maxHeight: '250px', maxWidth: '100%' }}
            />
          </Descriptions.Item>
          <Descriptions.Item label={t(findOne.elements.payrollScan())} span={2}>
            <img
              src={selectedUser?.info?.payrollScan?.url}
              alt="payrollScan"
              style={{ maxHeight: '250px', maxWidth: '100%' }}
            />
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </PageContainer>
  );
}
