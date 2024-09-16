import axiosClient from '../config';
import { AxiosResponse } from 'axios';

export async function updateProfilePicture(
  data: any,
  token: string
): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post('user/profile/picture/update', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    },
  });
}
