'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import useLocalStorage from '@/hooks/useLocalStorage';
import { getUserPost } from '@/api/posts/posts';
import { IRefetchUserPostProp } from '@/app/(Pages)/home/page';
import { getAccessToken } from '@/helpers/tokenStorage';
import UserPostSkeleton from '@/components/Loader/Skeleton/UserPostSkeleton';
import IndividualPost from './IndividualPost';

export interface Post {
  profilePicture: string;
  location: string;
  contentType: string;
  postContent: string;
  caption: string;
  hashtags: string;
  creator: Creator;
  attachments: Attachments[];
  createdAt: string;
  mimeType: string;
  body: string;
  fileName: string;
  fileURL: string;
  postId: number;
}
interface Creator {
  name: string;
}
interface Attachments {
  fileName: string;
  fileURL: string;
  mimeType: string;
}
const UserPost: React.FC<IRefetchUserPostProp> = ({
  refetchUserPost,
  setRefetchUserPost,
}) => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { item: accessToken } = useLocalStorage('auth-token');
  const isPostsFetched = useRef(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const response = await getUserPost(getAccessToken(), user?.userId);
          setPosts(response?.data?.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (!isPostsFetched.current) {
      fetchPosts();
      isPostsFetched.current = true;
    }
  }, [user]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        try {
          setIsLoading(true);
          const response = await getUserPost(getAccessToken(), user?.userId);
          setPosts(response?.data?.data);
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setIsLoading(false);
          setRefetchUserPost && setRefetchUserPost(false);
        }
      }
    };

    if (refetchUserPost) {
      fetchPosts();
    }
  }, [accessToken, user, refetchUserPost, setRefetchUserPost]);

  const textLimit = 90;

  return (
    <>
      {isLoading ? (
        <UserPostSkeleton cards={8} />
      ) : (
        <div>
          {posts
            .slice(0)
            .reverse()
            .map((post, idx) => {
              return (
                <IndividualPost
                  post={post}
                  key={post.postId}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default UserPost;
