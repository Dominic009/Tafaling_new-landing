import { AuthUser } from '@/types/Auth';
import axiosClient from '../config';
import { AxiosResponse } from 'axios';

export async function loginUser(
  data: AuthUser
): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post('auth/login', JSON.stringify(data));
}
export async function registerUser(
  data: AuthUser
): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post('auth/register', JSON.stringify(data));
}

// refetch user data
export async function getAuthUser(
  token: string
): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.get('auth/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
