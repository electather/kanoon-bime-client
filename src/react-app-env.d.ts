/// <reference types="react-scripts" />
declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_MOCK: boolean;
    REACT_APP_BASE_URL: string;
  }
}
