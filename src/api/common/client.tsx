import { Env } from '@env';
import axios from 'axios';
export const client = axios.create({
  baseURL: Env.BACKEND_URL,
});
