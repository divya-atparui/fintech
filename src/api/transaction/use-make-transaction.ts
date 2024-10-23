import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';

// {
//   "toOfficeId": 1,
//   "toClientId": 115,
//   "toAccountType": 2,
//   "toAccountId": 29,
//   "transferAmount": 100,
//   "transferDate": "01 August 2024",
//   "transferDescription": "desc",
//   "dateFormat": "dd MMMM yyyy",
//   "locale": "en",
//   "fromAccountId": "28",
//   "fromAccountType": "2",
//   "fromClientId": 114,
//   "fromOfficeId": 1
// }'
type Variables = {
  authToken: string;
  toOfficeId: number;
  toClientId: number;
  toAccountType: number;
  toAccountId: number;
  transferAmount: number;
  // transferDate: string;
  transferDescription: string;

  fromAccountId: string;
  fromAccountType: string;
  fromClientId: number;
  fromOfficeId: number;
};
type Response = {
  savingsId : number;
  resourceId : number
};

export const useMakeTransaction = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async (variables) =>
    client({
      url: 'accounttransfers',
      method: 'POST',
      data: {
        toOfficeId: variables.toOfficeId,
        toClientId: variables.toClientId,
        toAccountType: variables.toAccountType,
        toAccountId: variables.toAccountId,
        transferAmount: variables.transferAmount,
        transferDate: '01 August 2024',
        transferDescription: variables.transferDescription,
        locale: 'en',
        fromAccountId: variables.fromAccountId,
        fromAccountType: variables.fromAccountType,
        fromClientId: variables.fromClientId,
        fromOfficeId: variables.fromOfficeId,
        dateFormat: 'dd MMMM yyyy',
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Fineract-Platform-TenantId': 'default',
        Authorization: `Basic ${variables.authToken}`,
      },
    }).then((response) => response.data),
});
