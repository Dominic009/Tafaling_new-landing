import axiosClient from '@/api/config';
import { Post } from '@/components/Post/UserPost/UserPost';
import { getAccessToken } from '@/helpers/tokenStorage';
import axios, { Canceler } from 'axios';
import { useEffect, useState } from 'react';

interface UsePostsProps {
  start: number;
  pageSize: number;
}

interface UsePostsReturn {
  loading: boolean;
  error: boolean;
  posts: Post[];
  hasMore: boolean;
}

const usePublicPosts = ({ start, pageSize }: UsePostsProps): UsePostsReturn => {
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
        const res = await axiosClient.get(`posts/all/-1`, {
          params: { start_record: start, page_size: pageSize },
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
  }, [start, pageSize]);

  return { loading, error, posts, hasMore };
};

export default usePublicPosts;
