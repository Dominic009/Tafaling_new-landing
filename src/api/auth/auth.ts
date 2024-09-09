import { AuthUser } from '@/types/Auth';
import axiosClient from '../config';
import { AxiosResponse } from 'axios';

export async function loginUser(
  data: AuthUser
): Promise<AxiosResponse<any, any>> {
  return await axiosClient.post('auth/login', JSON.stringify(data));
}
export async function registerUser(data: AuthUser) {
  return await axiosClient.post('auth/register', JSON.stringify(data));
}
