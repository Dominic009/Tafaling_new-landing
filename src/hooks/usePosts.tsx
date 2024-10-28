import axiosClient from '@/api/config';
import { Post } from '@/components/Post/UserPost/UserPost';
import { getAccessToken } from '@/helpers/tokenStorage';
import axios, { Canceler } from 'axios';
import { useEffect, useState } from 'react';

interface UsePostsProps {
  start: number;
  pageSize: number;
  userId: number;
}

interface UsePostsReturn {
  loading: boolean;
  error: boolean;
  posts: Post[];
  hasMore: boolean;
}

const usePosts = ({
  start,
  pageSize,
  userId,
}: UsePostsProps): UsePostsReturn => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(false);

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

          const uniquePosts = [...prevPosts, ...newPosts];

          //   const uniquePosts = [
          //     ...prevPosts,
          //     ...newPosts.filter(
          //       newPost => !prevPosts.some(post => post.postId === newPost.postId)
          //     ),
          //   ];

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
  }, [start, pageSize, userId]);

  return { loading, error, posts, hasMore };
};

export default usePosts;
