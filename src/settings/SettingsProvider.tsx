import { ConfigProvider } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';

import { reducer, selectDirection, sliceKey } from './slice';

export const SettingsProvider = (props: { children: React.ReactChild }) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  const { children } = props;

  const direction = useSelector(selectDirection);
  return (
    <ConfigProvider direction={direction}>
      {React.Children.only(children)}
    </ConfigProvider>
  );
};
