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

export async function getUserPost(
  token: string
): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.get('posts/user/1?start_record=1&page_size=3', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
