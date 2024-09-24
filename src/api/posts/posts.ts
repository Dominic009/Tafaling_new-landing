import { AxiosResponse } from 'axios';
import axiosClient from '../config';

export async function createUserPost(
  data: any,
  token: string
): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post('/posts/create', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    },
  });
}
