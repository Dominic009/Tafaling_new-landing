import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Post } from '../UserPost/UserPost';
import { getPublicPost } from '@/api/posts/posts';
import UserPostSkeleton from '@/components/Loader/Skeleton/UserPostSkeleton';
import IndividualPost from '../IndividualPost/IndividualPost';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import usePublicPosts from '@/hooks/usePublicPosts';

interface IPublicPostProps {
  askUserLoginModal: boolean;
}

const PublicPost: React.FC<IPublicPostProps> = ({ askUserLoginModal }) => {
  const [start, setStart] = useState(0);
  const { posts, loading, hasMore } = usePublicPosts({
    start,
    pageSize: 5,
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;

      // Disconnect the previous observer if it exists
      if (observer.current) observer.current.disconnect();

      // Create a new IntersectionObserver
      observer.current = new IntersectionObserver(entries => {
        if (entries[0]?.isIntersecting && hasMore) {
          setStart(prevStart => prevStart + 5);
        }
      });

      // If the node is provided, observe it
      if (node) observer.current.observe(node);

      // console.log(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (askUserLoginModal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [askUserLoginModal]);

  // const [posts, setPosts] = React.useState<Post[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const isPostsFetched = useRef(false);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await getPublicPost();
  //       setPosts(response?.data?.data);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (!isPostsFetched.current) {
  //     fetchPosts();
  //     isPostsFetched.current = true;
  //   }
  // }, []);

  return (
    <>
      <div>
        {posts.map((post, idx) => {
          if (posts.length === idx + 1) {
            // console.log('ref post', posts.length === idx + 1);

            return (
              <div ref={lastPostElementRef} key={idx}>
                <IndividualPost
                  post={post}
                  // key={idx}
                  // postKey={idx}
                  // setIsLoading={setIsLoading}
                  isLoading={loading}
                  // setRefetchUserPost={setRefetchUserPost!}
                />
              </div>
            );
          } else {
            return (
              <div key={idx}>
                <IndividualPost
                  post={post}
                  // postKey={idx}
                  // key={idx}
                  // setIsLoading={setIsLoading}
                  isLoading={loading}
                  // setRefetchUserPost={setRefetchUserPost!}
                />
              </div>
            );
          }
        })}
      </div>
      {loading && <UserPostSkeleton cards={1} />}
    </>
  );
};

export default PublicPost;
