declare module 'userRequest' {
  export interface CreateUser {
    ownerName: string;
    lastName: string;
    melliCode: string;
    phone: string;
    address: string;
    avatarId: string;
    melliCardScanFrontId: string;
    melliCardScanBackId: string;
    payrollScanId: string;
  }
}
