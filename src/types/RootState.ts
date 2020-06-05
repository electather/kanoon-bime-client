import { TPIState } from 'app/containers/TPIPage/redux/types';
import { UsersState } from 'app/containers/Users/redux/types';
import { VehicleState } from 'app/containers/VehiclePage/redux/types';
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
  tpi?: TPIState;
  users?: UsersState;
  vehicles?: VehicleState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
