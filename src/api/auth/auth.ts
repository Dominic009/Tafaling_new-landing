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

export async function forgotPassword(data: AuthUser): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post('auth/forgot-password', JSON.stringify(data));
}
export async function verifyForgetPasswordOTP(data: AuthUser): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post('auth/verify-forgot-password-otp', JSON.stringify(data));
}
export async function resendForgetPasswordOTP(data: AuthUser): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post('/auth/resend-forgot-password-otp', JSON.stringify(data));
}

export async function resetPassword(data: AuthUser): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post('/auth/reset-password', JSON.stringify(data));
}

export async function logoutUser(
  token: string
): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.get('auth/logout', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export async function changePassword(
  data: any,
  token: string
): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post('/auth/password-change', data, {
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
