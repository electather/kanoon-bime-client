export type UserState =
  | 'loggedIn'
  | 'fetchingInfo'
  | 'locked'
  | 'unAuthenticated';
export interface AuthState {
  readonly authState: UserState;
}
