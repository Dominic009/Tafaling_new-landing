import axiosClient from '../config';

export type AuthUser = {
  email: string;
  password: string;
};

export async function loginUser(data: AuthUser) {
  return await axiosClient.post('auth/login', JSON.stringify(data));
}
