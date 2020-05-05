import { Avatar, Badge, Popover } from 'antd';
import { actions } from 'auth/slice';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { TopBarDropdownWrapper } from './components/TopBarDropdownWrapper';

export function TopBarUser() {
  const [visible, setVisibility] = React.useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }
  const handleLogout = React.useCallback(() => dispatch(actions.logout()), [
    dispatch,
  ]);

  const content = (
    <TopBarDropdownWrapper className="isoUserDropdown">
      <Link className="isoDropdownLink" to="/dashboard/my-profile">
        {t(translations.topBar.userDropDown.myProfile())}
      </Link>
      <span className="isoDropdownLink">
        {t(translations.topBar.userDropDown.settings())}
      </span>
      <span className="isoDropdownLink">
        {' '}
        {t(translations.topBar.userDropDown.feedback())}
      </span>
      <span className="isoDropdownLink">
        {' '}
        {t(translations.topBar.userDropDown.help())}
      </span>
      <span className="isoDropdownLink" onClick={handleLogout}>
        {t(translations.topBar.userDropDown.logout())}
      </span>
    </TopBarDropdownWrapper>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomRight"
    >
      <Badge dot color="blue">
        <Avatar size="large" shape="circle">
          {'User'.charAt(0).toUpperCase()}
        </Avatar>
      </Badge>
    </Popover>
  );
}
