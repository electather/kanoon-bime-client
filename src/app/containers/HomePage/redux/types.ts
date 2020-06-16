import { ErrorResponse, UserData, UserDataMinimal } from 'userResponse';

export type QuerySchema = {};

export interface HomePageState {
  readonly stats?: UserDataMinimal;
  readonly expireList?: UserData;
  readonly error?: ErrorResponse;
  readonly loading: boolean;
}
