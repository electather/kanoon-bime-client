import { Descriptions, Drawer } from 'antd';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { actions, selectDrawerData } from './redux/slice';

export function SelectedInsurance() {
  const { t } = useTranslation();
  const { findOne } = translations.pages.thirdPartyInsurance.dataTab;
  const selectedInsurance = useSelector(selectDrawerData);
  const dispatch = useDispatch();

  return (
    <Drawer
      width={700}
      placement="right"
      title={t(findOne.title())}
      closable={true}
      onClose={() => dispatch(actions.clearSelectedInsurance())}
      visible={!!selectedInsurance}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label={t(findOne.elements.createdAt())} span={2}>
          {selectedInsurance?.createdAt}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
}
