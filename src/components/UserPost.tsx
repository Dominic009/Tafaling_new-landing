'use client';
import Image from 'next/legacy/image';
import React, { useEffect, useRef, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';
import PostTimeConverter from './PostTimeConverter';
import ContentViewer from './Content Viewer/ContentViewer';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import ContentLoader from './Loader/ContentLoader';
import useLocalStorage from '@/hooks/useLocalStorage';
import { getUserPost } from '@/api/posts/posts';
import { IRefetchUserPostProp } from '@/app/(Pages)/home/page';
import { getAccessToken } from '@/helpers/tokenStorage';
import UserPostSkeleton from './Loader/Skeleton/UserPostSkeleton';

interface Post {
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
  const [viewImagePost, setViewImagePost] = useState<string | null>(null);
  // const [postContentType, setPostContentType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthLoading } = useAuth();
  const { item: accessToken } = useLocalStorage('auth-token');
  const isPostsFetched = useRef(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        try {
          setIsLoading(true);
          // let lsItem = accessToken && JSON.parse(accessToken).accessT;
          const response = await getUserPost(getAccessToken(), user?.userId);
          setPosts(response?.data?.data);
          // console.log(response?.data?.data);
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
          // let lsItem = accessToken && JSON.parse(accessToken).accessT;
          const response = await getUserPost(getAccessToken(), user?.userId);
          setPosts(response?.data?.data);
          // console.log(response?.data?.data);
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

  const handleContentView = (object: any) => {
    setViewImagePost(object);
    console.log(object);
  };

  useEffect(() => {
    if (viewImagePost) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup on component unmount
    return () => document.body.classList.remove('no-scroll');
  }, [viewImagePost]);

  // Setting the loading state to false
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      {isLoading ? (
        <UserPostSkeleton cards={8} />
      ) : (
        <div>
          {posts
            .slice(0)
            .reverse()
            .map((post, idx) => (
              <div
                key={idx}
                className='mb-4 w-full mx-auto bg-white rounded-xl p-3 shadow'
              >
                {/* Header */}
                <div className='flex items-center'>
                  <div>
                    <Image
                      alt='User DP'
                      src={user?.profile_picture || '/ProfileDP/Dummy.png'}
                      // src={"/ProfileDP/Dummy.png"}
                      width={65}
                      height={65}
                      className='mt-1 rounded-full'
                    ></Image>
                  </div>
                  <div className='flex-1 text-left px-2'>
                    <h1 className='font-semibold text-xl'>
                      {post?.creator?.name}
                    </h1>
                    <span className='text-sm text-gray-400 flex gap items-center'>
                      <IoLocationOutline className='text-lg' />
                      {/* {post.location} */}
                      Location
                    </span>
                  </div>
                  <div>
                    <HiDotsHorizontal className='text-[#07a1bc]/50 text-4xl cursor-pointer hover:bg-gray-100 px-1 py-1 rounded-xl' />
                  </div>
                </div>

                {/* Content body */}
                <div className='mt-2 cursor-pointer flex items-center justify-center'>
                  {isLoading && <ContentLoader />}
                  {post.attachments[0]?.mimeType && (
                    <Image
                      alt='Post content'
                      src={`${post.attachments[0]?.fileURL}/${post.attachments[0]?.fileName}`}
                      width={800}
                      height={600}
                      className='rounded-md h-[500px] object-cover hover:scale-105 custom-hover-img'
                      onClick={() => handleContentView(post)}
                      onLoadingComplete={() => setIsLoading(false)}
                      loading='lazy'
                    />
                  )}
                  {/* {post.attachments[0]?.mimeType  ? (
              <Image
                alt="Post content"
                src={`${post.attachments[0]?.fileURL}/${post.attachments[0]?.fileName}`}
                width={800}
                height={600}
                className="rounded-md h-[500px] object-cover hover:scale-105 custom-hover-img"
                onClick={() => handleContentView(post)}
                onLoadingComplete={() => setIsLoading(false)}
                loading="lazy"
              />
            ) : (
              <video
                width="800"
                height="500"
                controls
                className="rounded-md h-[500px]"
                onClick={() => handleContentView(post)}
                onCanPlay={() => setIsLoading(false)}
              >
                <source src={post.postContent} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )} */}
                </div>

                {/* Footer */}
                <div className='mt-3'>
                  <p className='text-left text-lg'>{post?.body}</p>

                  <div className='flex mt-1 gap-3'>
                    {/* {post?.hashtags?.map((tag, idx) => (
                <ul key={idx} className='text-[#07a1bc] font-light lowercase'>
                  <li>{tag}</li>
                </ul>
              ))} */}
                    <ul className='text-[#07a1bc] font-light lowercase'>
                      <li>#dummy</li>
                    </ul>
                    <ul className='text-[#07a1bc] font-light lowercase'>
                      <li>#dummy</li>
                    </ul>
                  </div>
                  <div className='text-end text-gray-400 text-sm font-light'>
                    {/* <PostTimeConverter time={post?.postedTime}></PostTimeConverter> */}
                    <PostTimeConverter
                      time={post?.createdAt}
                    ></PostTimeConverter>
                  </div>
                </div>
              </div>
            ))}

          {viewImagePost && (
            <ContentViewer
              object={viewImagePost}
              postContentType='image'
              onClose={() => setViewImagePost(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserPost;
