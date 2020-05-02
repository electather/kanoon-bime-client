import { Layout } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TopbarUser } from './components/TopbarUser';
import { TopbarWrapper } from './components/TopbarWrapper';

export function Topbar() {
  const [selectedItem, setSelectedItem] = React.useState('');
  const { collapsed, openDrawer } = useSelector(state => state.App);
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [
    dispatch,
  ]);
  const isCollapsed = collapsed && !openDrawer;
  const styling: React.CSSProperties = {
    position: 'fixed',
    width: '100%',
    height: 70,
  };
  return (
    <TopbarWrapper>
      <Layout.Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <button
            className={
              isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            style={{ color: customizedTheme.textColor }}
            onClick={handleToggle}
          />
        </div>

        <ul className="isoRight">
          {/* <li className="isoSearch">
            <TopbarSearch />
          </li> */}

          {/* <li
            onClick={() => setSelectedItem('notification')}
            className="isoNotify"
          >
            <TopbarNotification />
          </li> */}
          {/* 
          <li onClick={() => setSelectedItem('message')} className="isoMsg">
            <TopbarMessage />
          </li>
          <li onClick={() => setSelectedItem('addToCart')} className="isoCart">
            <TopbarAddtoCart />
          </li> */}

          <li onClick={() => setSelectedItem('user')} className="isoUser">
            <TopbarUser />
          </li>
        </ul>
      </Layout.Header>
    </TopbarWrapper>
  );
}
