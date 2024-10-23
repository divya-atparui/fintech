import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { type UserResponse } from './types';

type Variables = {username: string; password: string};
type Response = UserResponse;

// export const useGetAuthToken = createMutation<Response, Variables, AxiosError>({
//   mutationFn: async (variables) => {
//     const response = await axios.post<Response>(
//       "https://api.finverse3.com/fineract-provider/api/v1/authentication",
//       {
//         username: variables.username,
//         password: variables.password
//       },
//       {
//         headers: {
          // 'Content-Type': 'application/json',
          // 'Accept': 'application/json',
          // 'Fineract-Platform-TenantId': 'default'
//         }
//       }
//     );
//     return response.data;
//   },
// });
export const useGetAuthToken = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'authentication',
      method: 'POST',
      data: {
        username: variables.username,
        password: variables.password
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Fineract-Platform-TenantId': 'default'
      }
    }).then((response) => response.data)
});