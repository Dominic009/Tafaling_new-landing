import React, { useEffect, useRef, useState } from 'react';
import { Post } from '../UserPost/UserPost';
import { getPublicPost } from '@/api/posts/posts';
import UserPostSkeleton from '@/components/Loader/Skeleton/UserPostSkeleton';
import IndividualPost from '../UserPost/IndividualPost';

const PublicPost = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isPostsFetched = useRef(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await getPublicPost();
        setPosts(response?.data?.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isPostsFetched.current) {
      fetchPosts();
      isPostsFetched.current = true;
    }
  }, []);

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
                  //   setRefetchUserPost={setRefetchUserPost!}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default PublicPost;
