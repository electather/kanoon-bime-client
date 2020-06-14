import { Descriptions, Drawer } from 'antd';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, formatMoney } from 'utils';

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
          {formatDate(selectedInsurance?.createdAt)}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.startDate())} span={1}>
          {formatDate(selectedInsurance?.startDate)}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.endDate())} span={1}>
          {formatDate(selectedInsurance?.endDate)}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.value())} span={2}>
          {formatMoney(selectedInsurance?.fullAmount)}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.isCash())} span={2}>
          {selectedInsurance?.isCash ? 'نقد' : 'اقساط'}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.insurer())} span={2}>
          {selectedInsurance?.insurer?.firstName}{' '}
          {selectedInsurance?.insurer?.lastName}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.owner())} span={2}>
          {selectedInsurance?.vehicle?.ownerName}{' '}
          {selectedInsurance?.vehicle?.ownerLastName}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.address())} span={2}>
          {selectedInsurance?.vehicle?.address}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.engineNumber())} span={2}>
          {selectedInsurance?.vehicle?.engineNumber}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
}
