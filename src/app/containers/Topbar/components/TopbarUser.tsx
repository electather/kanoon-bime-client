import { Popover } from 'antd';
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

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <Link className="isoDropdownLink" to={'/dashboard/my-profile'}>
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
      <a className="isoDropdownLink">logout</a>
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
      <div className="isoImgWrapper">
        <img alt="user" />
        <span className="userActivity online" />
      </div>
    </Popover>
  );
}
