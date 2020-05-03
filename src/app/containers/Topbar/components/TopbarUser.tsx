import { Avatar, Badge, Popover } from 'antd';
import { actions } from 'auth/slice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { TopbarDropdownWrapper } from './TopbarDropdownWrapper';

export function TopbarUser() {
  const [visible, setVisibility] = React.useState(false);
  const dispatch = useDispatch();
  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }
  const handleLogout = React.useCallback(() => dispatch(actions.logout()), [
    dispatch,
  ]);

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <Link className="isoDropdownLink" to="/dashboard/my-profile">
        my profile
      </Link>
      <a className="isoDropdownLink" href="# ">
        settings
      </a>
      <a className="isoDropdownLink" href="# ">
        feedback
      </a>
      <a className="isoDropdownLink" href="# ">
        help
      </a>
      <span className="isoDropdownLink" onClick={handleLogout}>
        logout
      </span>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomLeft"
    >
      <Badge dot color="blue">
        <Avatar size="large" shape="circle">
          {'User'.charAt(0).toUpperCase()}
        </Avatar>
      </Badge>
    </Popover>
  );
}
