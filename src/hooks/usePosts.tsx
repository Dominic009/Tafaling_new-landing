import axiosClient from '@/api/config';
import { Post } from '@/components/Post/UserPost/UserPost';
import { getAccessToken } from '@/helpers/tokenStorage';
import axios, { Canceler } from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface UsePostsProps {
  start: number;
  pageSize: number;
  userId: number;
  refetchUserPost?: boolean;
  url: string;
}

interface UsePostsReturn {
  loading: boolean;
  error: boolean;
  posts: Post[];
  hasMore: boolean;
  setRemoveId: Dispatch<SetStateAction<number | null>>;
  updatePost: (postId: number, updatedProperties: Partial<Post>) => void;
}

const usePosts = ({
  start,
  pageSize,
  userId,
  refetchUserPost,
  url,
}: UsePostsProps): UsePostsReturn => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [removeId, setRemoveId] = useState<null | number>(null);

  useEffect(() => {
    if (removeId) {
      const remainingPost = posts.filter(item => item.postId !== removeId);
      setPosts([...remainingPost]);
      setRemoveId(null);
    }
  }, [posts, removeId, setRemoveId]);

  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);

  // Function to update a post by its ID with new properties
  const updatePost = (postId: number, updatedProperties: Partial<Post>) => {
    console.log('Data to update for postId:', postId, updatedProperties);

    setPosts(prevPosts => {
      const postIndex = prevPosts.findIndex(post => post.postId === postId);

      // If post with postId is found, update it
      if (postIndex !== -1) {
        // Copy the posts array to avoid direct mutation
        const updatedPosts = [...prevPosts];
        updatedPosts[postIndex] = {
          ...prevPosts[postIndex],
          ...updatedProperties,
        };
        return updatedPosts;
      }

      // If no post with the given postId is found, return the original posts array
      return prevPosts;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      let cancel: Canceler;

      try {
        const res = await axiosClient.get(`${url}/${userId}`, {
          params: { start_record: start, page_size: pageSize },
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
          cancelToken: new axios.CancelToken(c => (cancel = c)),
        });

        setPosts(prevPosts => {
          const newPosts = res.data.data as Post[];

          // const uniquePosts = [...prevPosts, ...newPosts];

          const uniquePosts = [
            ...newPosts.filter(
              newPost => !prevPosts.some(post => post.postId === newPost.postId)
            ),
            ...prevPosts,
          ];

          return uniquePosts;
        });
        setHasMore(res.data.data.length > 0);
        setLoading(false);
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError(true);
        setHasMore(false);
        setLoading(false);
      }

      return () => cancel && cancel();
    };

    fetchData();
  }, [start, pageSize, userId, refetchUserPost, url]);

  return { loading, error, posts, hasMore, setRemoveId, updatePost };
};

export default usePosts;
