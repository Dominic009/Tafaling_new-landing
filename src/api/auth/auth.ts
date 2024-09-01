import { AuthUser } from '@/types/Auth';
import axiosClient from '../config';

export async function loginUser(data: AuthUser) {
  return await axiosClient.post('auth/login', JSON.stringify(data));
}
