import React from 'react';
import { useSelector } from 'react-redux';
import { useInjectReducer } from 'redux-injectors';
import { selectDirection } from 'settings/slice';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';

import { reducer, selectTheme, themeSliceKey } from './slice';

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  useInjectReducer({ key: themeSliceKey, reducer: reducer });

  const theme = useSelector(selectTheme);
  const direction = useSelector(selectDirection);
  theme.dir = direction;
  return (
    <OriginalThemeProvider theme={theme}>
      {React.Children.only(props.children)}
    </OriginalThemeProvider>
  );
};
