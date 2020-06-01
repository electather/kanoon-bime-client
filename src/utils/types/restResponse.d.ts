declare module 'userResponse' {
  export interface Info {
    id: string;
    createdAt: string;
    updatedAt: string;
    melliCode: string;
    address?: any;
  }

  export interface UserData {
    id: string;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    role: string;
    phone: string;
    info?: Info;
  }

  export interface UsersPage {
    readonly data: UserData[];
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
    readonly statusCode: number;
    readonly message: string;
  }
}
