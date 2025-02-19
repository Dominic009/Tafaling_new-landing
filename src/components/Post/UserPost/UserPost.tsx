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
import { usePathname } from 'next/navigation';

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
  profile_picture: string;
  user_id: number;
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
  const pathname = usePathname();

  const { posts, loading, hasMore, setRemoveId, updatePost } = usePosts({
    start,
    pageSize: 5,
    userId: user?.userId as number,
    refetchUserPost,
    url: `${
      pathname.includes('user-profile') ? '/user/search/profile' : 'posts/user'
    }`,
    setRefetchUserPost,
  });

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

  return (
    <>
      <div>
        {posts.map((post, idx) => {
          if (posts.length === idx + 1) {
            return (
              <div ref={lastPostElementRef} key={post.postId}>
                <IndividualPost
                  post={post}
                  // postKey={idx}
                  // setIsLoading={setIsLoading}
                  isLoading={loading}
                  setRefetchUserPost={setRefetchUserPost!}
                  setRemoveId={setRemoveId}
                  updatePostProperty={updatePost}
                />
              </div>
            );
          } else {
            return (
              <div key={post.postId}>
                <IndividualPost
                  post={post}
                  // postKey={idx}
                  // setIsLoading={setIsLoading}
                  isLoading={loading}
                  setRefetchUserPost={setRefetchUserPost!}
                  setRemoveId={setRemoveId}
                  updatePostProperty={updatePost}
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
