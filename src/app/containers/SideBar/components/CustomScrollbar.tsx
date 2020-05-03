import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export const CustomScrollBar: React.FC<{
  id?: string;
  style: React.CSSProperties;
  className?: string;
}> = ({ id, style, children, className }) => (
  <Scrollbars
    id={id}
    className={className}
    style={style}
    autoHide
    autoHideTimeout={1000}
    autoHideDuration={200}
    autoHeightMin={0}
    autoHeightMax={200}
    thumbMinSize={30}
    universal={true}
  >
    {children}
  </Scrollbars>
);
