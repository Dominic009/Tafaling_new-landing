'use client';

import PostTimeConverter from '@/components/PostTimeConverter';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import Image from 'next/image';
import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';
import { Post } from './UserPost';
import ContentLoader from '@/components/Loader/ContentLoader';
import { useEffect, useState } from 'react';
import ContentViewer from '@/components/Content Viewer/ContentViewer';

interface IPostProps {
  post: Post;
  key: number;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const IndividualPost: React.FC<IPostProps> = ({
  post,
  isLoading,
  setIsLoading,
  key,
}) => {
  const { user, isAuthLoading } = useAuth();
  const [isPostExpanded, setIsPostExpanded] = useState<boolean>(false); // for post.body hiding
  const [viewImagePost, setViewImagePost] = useState<string | null>(null);
  const textLimit = 90;

  const handleContentView = (object: any) => {
    setViewImagePost(object);
    // console.log(object);
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

  return (
    <div
      key={key}
      className='mb-4 w-full mx-auto bg-white rounded-xl p-3 shadow'
    >
      {/* Header */}
      <div className='flex items-center'>
        <div>
          <Link href={'/user-profile'}>
            <Image
              alt='User DP'
              src={user?.profile_picture || '/ProfileDP/Dummy.png'}
              width={65}
              height={65}
              className='mt-1 rounded-full'
            ></Image>
          </Link>
        </div>
        <div className='flex-1 text-left px-2'>
          <Link href={'/user-profile'}>
            <h1 className='font-semibold text-xl'>{post?.creator?.name}</h1>
          </Link>
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
        {post.attachments[0]?.mimeType.includes('image') && (
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
        {post.attachments[0]?.mimeType.includes('video') && (
          <video
            width='800'
            height='500'
            controls
            className='rounded-md h-[500px]'
            onClick={() => handleContentView(post)}
            onCanPlay={() => setIsLoading(false)}
            src={`${post.attachments[0]?.fileURL}/${post.attachments[0]?.fileName}`}
          >
            <source src={post.postContent} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Footer */}
      <div className='mt-3'>
        {/* <p className='text-left text-lg text-wrap'>{post?.body}</p> */}
        <p className='text-left text-lg text-wrap'>
          {/* {post.body.length > 90 ? `${post.body.slice(0, 90)}...`} */}
          {!isPostExpanded &&
            post.body.length > textLimit &&
            `${post.body.slice(0, textLimit)}...`}

          {isPostExpanded && post.body.length > textLimit && `${post.body}`}

          {post.body.length < textLimit && `${post.body}`}

          {/* Show 'Read More' only if the text exceeds the limit and is not expanded */}
          {post.body.length > textLimit && !isPostExpanded && (
            <small
              onClick={() => setIsPostExpanded(!isPostExpanded)}
              className='text-blue-500 cursor-pointer bg-gray-200 px-2 rounded-full'
            >
              See more
            </small>
          )}
          {isPostExpanded && (
            <small
              onClick={() => setIsPostExpanded(!isPostExpanded)}
              className='text-blue-500 cursor-pointer bg-gray-200 px-2 rounded-full'
            >
              Hide
            </small>
          )}
        </p>

        <div className='flex mt-1 gap-3'>
          {/* {post?.hashtags?.map((tag, idx) => (
            <ul key={idx} className='text-[#07a1bc] font-light lowercase'>
                <li>{tag}</li>
            </ul>
            ))} */}
          {/* <ul className='text-[#07a1bc] font-light lowercase'>
                <li>#dummy</li>
            </ul>
          <ul className='text-[#07a1bc] font-light lowercase'>
            <li>#dummy</li>
          </ul> */}
        </div>

        {/* post created time */}
        <div className='text-end text-gray-400 text-sm font-light'>
          {/* <PostTimeConverter time={post?.postedTime}></PostTimeConverter> */}
          <PostTimeConverter time={post?.createdAt}></PostTimeConverter>
        </div>
      </div>

      {viewImagePost && (
        <ContentViewer
          object={viewImagePost}
          postContentType='image'
          onClose={() => setViewImagePost(null)}
        />
      )}
    </div>
  );
};

export default IndividualPost;
