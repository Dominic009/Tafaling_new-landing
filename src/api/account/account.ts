import { AuthUser } from '@/types/Auth';
import axiosClient from '../config';
import { AxiosResponse } from 'axios';

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
    token: string
  ): Promise<AxiosResponse<any, ResponseType>> {
    return await axiosClient.post('/account/email/resend', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
    });
  }