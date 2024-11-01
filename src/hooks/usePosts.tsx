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
}

interface UsePostsReturn {
  loading: boolean;
  error: boolean;
  posts: Post[];
  hasMore: boolean;
  setRemoveId: Dispatch<SetStateAction<number | null>>;
}

const usePosts = ({
  start,
  pageSize,
  userId,
  refetchUserPost,
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      let cancel: Canceler;

      try {
        const res = await axiosClient.get(`posts/user/${userId}`, {
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
  }, [start, pageSize, userId, refetchUserPost]);

  return { loading, error, posts, hasMore, setRemoveId };
};

export default usePosts;
