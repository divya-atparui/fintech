import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { type UserResponse } from './types';

type Variables = {username: string; password: string};
type Response = UserResponse;

export const useGetAuthToken = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const response = await fetch('https://api.finverse3.com/fineract-provider/api/v1/authentication', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'fineract-platform-tenantid': 'default',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: variables.username, password:variables.password }),
    })
    const data = await response.json()
    return data
  }
});