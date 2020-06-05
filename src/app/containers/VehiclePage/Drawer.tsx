import { Descriptions, Drawer } from 'antd';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { alphabet } from './constants/alphabet';
import { actions, selectDrawerData } from './redux/slice';

export function SelectedVehicle() {
  const { t } = useTranslation();
  const { findOne } = translations.pages.vehicle.dataTab;
  const selectedVehicle = useSelector(selectDrawerData);
  const dispatch = useDispatch();

  return (
    <Drawer
      width={700}
      placement="right"
      title={t(findOne.title())}
      closable={true}
      onClose={() => dispatch(actions.clearSelectedVehicle())}
      visible={!!selectedVehicle}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label={t(findOne.elements.createdAt())} span={2}>
          {selectedVehicle?.createdAt}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.insurer())} span={2}>
          {selectedVehicle?.insurer?.firstName}{' '}
          {selectedVehicle?.insurer?.lastName}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.owner())} span={2}>
          {selectedVehicle?.ownerName} {selectedVehicle?.ownerLastName}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.address())} span={2}>
          {selectedVehicle?.address}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.engineNumber())} span={2}>
          +98{selectedVehicle?.engineNumber}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.chassisNumber())} span={2}>
          {selectedVehicle?.chassisNumber}
        </Descriptions.Item>
        <Descriptions.Item label={t(findOne.elements.plate())} span={2}>
          {selectedVehicle?.plateFirstTwoNumbers}{' '}
          {alphabet[selectedVehicle?.plateLetter || 1]}{' '}
          {selectedVehicle?.plateLastThreeNumbers}-
          {selectedVehicle?.plateIRNumber}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
}
