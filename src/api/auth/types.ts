export type UserResponse = {
  username: string;
  userId: number;
  base64EncodedAuthenticationKey: string;
  authenticated: boolean;
  officeId: number;
  officeName: string;
  roles: {
    id: number;
    name: string;
    description: string;
    disabled: boolean;
  }[];
  permissions: string[];
  shouldRenewPassword: boolean;
  isTwoFactorAuthenticationRequired: boolean;
};
