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


export async function verifyUserEmail(
  data: any,
  token: string
): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post('account/email/verify', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    },
  });
}
export async function resendEmailVerifyOtp(
  data: any,
  token: string
): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post('/account/email/resend', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    },
  });
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
