declare module 'userResponse' {
  export interface Info {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    melliCode: string;
    address: string;
    melliCardScanFront?: FileResponse;
    melliCardScanBack?: FileResponse;
    payrollScan?: FileResponse;
  }

  export interface UserData {
    id: string;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    role: string;
    phone: string;
    avatar?: FileResponse;
    info?: Info;
  }

  export interface UserDataMinimal {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: FileResponse;
    melliCode: string;
  }

  export interface VehicleResponse {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ownerName: string;
    ownerLastName: string;
    address: string;
    engineNumber: string;
    chassisNumber: string;
    plateFirstTwoNumbers: string;
    plateLetter: string;
    plateLastThreeNumbers: string;
    plateIRNumber: string;
    insurer?: UserData;
  }

  export interface TPIResponse {
    id: string;
    bimeNumber: string;
    startDate: Date;
    endDate: Date;
    isCash: boolean;
    fullAmount: number;
    insurer: UserData;
    vehicle: VehicleResponse;
    insurance: string;
    attachment: FileResponse;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface BodyInsuranceResponse {
    id: string;
    bimeNumber: string;
    startDate: Date;
    endDate: Date;
    isCash: boolean;
    fullAmount: number;
    insurer: UserData;
    vehicle: VehicleResponse;
    insurance: string;
    attachment: FileResponse;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Paginated<T> {
    readonly data: T[];
    readonly meta: PageMeta;
  }

  export interface Token {
    expiresIn: number;
    accessToken: string;
  }

  export interface UserResponse {
    user: UserData;
    token: Token;
  }

  export interface PageMeta {
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
  }

  export interface ErrorResponse {
    readonly statusCode?: number;
    readonly message: string | string[];
    readonly error?: string;
  }
  export interface FileResponse {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description?: any;
    creator: Creator;
    url: string;
  }
}
