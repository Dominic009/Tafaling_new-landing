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

export async function updateCoverPhoto(
  data: any,
  token: string
): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post('user/cover/picture/update', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    },
  });
}

export async function followUser(
  userId: number,
  token: string
): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post(
    `user/add/follower`,
    {
      following_user_id: userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function unfollowUser(
  userId: number,
  token: string
): Promise<AxiosResponse<any, ResponseType>> {
  return await axiosClient.post(
    `user/unfollow/user`,
    {
      following_user_id: userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
