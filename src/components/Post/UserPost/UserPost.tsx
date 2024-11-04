'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import useLocalStorage from '@/hooks/useLocalStorage';
import { getUserPost } from '@/api/posts/posts';
import { IRefetchUserPostProp } from '@/app/(Pages)/home/page';
import { getAccessToken } from '@/helpers/tokenStorage';
import UserPostSkeleton from '@/components/Loader/Skeleton/UserPostSkeleton';
import IndividualPost from '../IndividualPost/IndividualPost';
import usePosts from '@/hooks/usePosts';

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
  privacyId: number;
  isLiked: number;
  likeCount: number;
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
  // const [posts, setPosts] = React.useState<Post[]>([]);
  const [start, setStart] = useState(0);
  const { user } = useAuth();

  const { posts, loading, hasMore, setRemoveId } = usePosts({
    start,
    pageSize: 5,
    userId: user?.userId as number,
    refetchUserPost,
  });
  // const [isLoading, setIsLoading] = useState(true);
  const isPostsFetched = useRef(false);

  // Observer for infinite loading
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
    },
    [loading, hasMore]
  );

  console.log(posts)

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     if (user) {
  //       try {
  //         setIsLoading(true);
  //         const response = await getUserPost(getAccessToken(), user?.userId);
  //         setPosts(response?.data?.data);
  //       } catch (error) {
  //         console.error('Error fetching posts:', error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   if (!isPostsFetched.current) {
  //     fetchPosts();
  //     isPostsFetched.current = true;
  //   }
  // }, [user]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     if (user) {
  //       try {
  //         setIsLoading(true);
  //         const response = await getUserPost(getAccessToken(), user?.userId);
  //         setPosts(response?.data?.data);
  //       } catch (error) {
  //         console.error('Error fetching posts:', error);
  //       } finally {
  //         setIsLoading(false);
  //         setRefetchUserPost && setRefetchUserPost(false);
  //       }
  //     }
  //   };

  //   if (refetchUserPost) {
  //     fetchPosts();
  //   }
  // }, [accessToken, user, refetchUserPost, setRefetchUserPost]);

  const textLimit = 90;

  return (
    <>
      <div>
        {posts
          .slice(0)
          .reverse()
          .map((post, idx) => {
            if (posts.length === idx + 1) {
              return (
                <div ref={lastPostElementRef} key={idx}>
                  <IndividualPost
                    post={post}
                    postKey={idx}
                    // setIsLoading={setIsLoading}
                    isLoading={loading}
                    setRefetchUserPost={setRefetchUserPost!}
                    setRemoveId={setRemoveId}
                  />
                </div>
              );
            } else {
              return (
                <div key={idx}>
                  <IndividualPost
                    post={post}
                    postKey={idx}
                    // setIsLoading={setIsLoading}
                    isLoading={loading}
                    setRefetchUserPost={setRefetchUserPost!}
                    setRemoveId={setRemoveId}
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

export default UserPost;
