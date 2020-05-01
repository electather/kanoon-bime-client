import { AuthState } from 'auth/types';
import { RouterState } from 'connected-react-router';
import { SettingsState } from 'settings/types';
import { ThemeState } from 'styles/theme/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  router?: RouterState;
  settings?: SettingsState;
  auth?: AuthState;
  theme?: ThemeState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
