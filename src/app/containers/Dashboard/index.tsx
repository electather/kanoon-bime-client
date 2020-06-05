import { useWindowSize } from '@react-hook/window-size';
import { Layout } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { actions, selectHeight } from 'settings/slice';

import { SideBar } from '../SideBar';
import { TopBar } from '../Topbar';
import { usersSaga } from '../Users/redux/saga';
import {
  reducer as usersReducer,
  sliceKey as usersSliceKey,
} from '../Users/redux/slice';
import { vehicleSaga } from '../VehiclePage/redux/saga';
import {
  reducer as vehiclesReducer,
  sliceKey as vehiclesSliceKey,
} from '../VehiclePage/redux/slice';
import { DashboardContainer } from './components/DashboardContainer';
import { DashboardGlobalStyles } from './components/DashboardGlobalStyles';
import { DashboardRoutes } from './DashboardRouter';

export function Dashboard() {
  const dispatch = useDispatch();
  const appHeight = useSelector(selectHeight);
  const [width, height] = useWindowSize();
  useInjectReducer({ key: usersSliceKey, reducer: usersReducer });
  useInjectSaga({ key: usersSliceKey, saga: usersSaga });
  useInjectReducer({ key: vehiclesSliceKey, reducer: vehiclesReducer });
  useInjectSaga({ key: vehiclesSliceKey, saga: vehicleSaga });

  React.useEffect(() => {
    dispatch(actions.toggleAll({ width, height }));
  }, [width, height, dispatch]);
  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={{ height: height }}>
        <TopBar />
        <Layout>
          <SideBar />
          <Layout
            className="isoContentMainLayout"
            style={{
              height: appHeight,
            }}
          >
            <Layout.Content className="isomorphicContent">
              <DashboardRoutes />
            </Layout.Content>
            {/* <Layout.Footer>{t(translations.global.footerText())}</Layout.Footer> */}
          </Layout>
        </Layout>
      </Layout>
    </DashboardContainer>
  );
}
