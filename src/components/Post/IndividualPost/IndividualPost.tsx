'use client';

import PostTimeConverter from '@/components/PostTimeConverter';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import Image from 'next/image';
import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import { FaLocationDot } from 'react-icons/fa6';
import { Post } from '../UserPost/UserPost';
import ContentLoader from '@/components/Loader/ContentLoader';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ContentViewer from '@/components/Content Viewer/ContentViewer';
import { FaUserCircle } from 'react-icons/fa';
import DropDownMenu from '@/components/Drop down menu/DropDownMenu';
import Modal from '@/components/Modal/Modal';
import ChangePrivacy from './ChangePrivacy/ChangePrivacy';
import { FaEye } from 'react-icons/fa6';
import LinkPreview from '../LinkPreview/LinkPreview';
import { PrivacySetting } from '@/types/Auth';
import { MdDeleteForever } from 'react-icons/md';
import Interaction from './UserInteractions/Interaction';
import DeletePost from './DeletePost/DeletePost';
import PostSettings from '../Post settings/PostSettings';

interface IPostProps {
  post: Post;
  // postKey: number;
  isLoading: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetchUserPost?: React.Dispatch<React.SetStateAction<boolean>>;
  setRemoveId?: Dispatch<SetStateAction<number | null>>;
  updatePostProperty?: (
    postId: number,
    updatedProperties: Partial<Post>
  ) => void;
}

const IndividualPost: React.FC<IPostProps> = ({
  post,
  isLoading,
  setIsLoading,
  // postKey,
  setRemoveId,
  updatePostProperty,
}) => {
  const { user, userPrivacy } = useAuth();
  // Post selected privacy
  const userPirvacyText = userPrivacy?.find(
    item => item.privacy_setting_id === post.privacyId
  );
  const [postPrivacy, setPostPrivacy] = useState<PrivacySetting>(
    userPirvacyText!
  );

  const [isPostExpanded, setIsPostExpanded] = useState<boolean>(false);
  const [toggleEditPost, setToggleEditPost] = useState<boolean>(false);
  const [viewImagePost, setViewImagePost] = useState<string | null>(null);
  const textLimit = post.attachments.length === 0 ? 800 : 90;

  const handleContentView = (object: any) => {
    setViewImagePost(object);
  };

  const [text, setText] = useState('');
  const [links, setLinks] = useState<string | ''>('');

  useEffect(() => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const detectedLinks = text.match(urlRegex);

    if (detectedLinks) {
      setLinks(text);
    } else {
      setLinks('');
    }
  }, [text]);

  useEffect(() => {
    if (post.body.includes('http')) {
      const indexOfHttpStart = post.body.indexOf('http');
      const httpText = post.body.slice(indexOfHttpStart);

      //handle white space after link
      if (httpText.includes(' ')) {
        const onlyHttpLink = httpText.split(' ')[0];
        setText(onlyHttpLink);
      } else {
        setText(httpText);
      }
    }
  }, [post]);

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const createClickableLinks = (text: string) => {
    const parts = text.split(urlRegex);
    return parts.map((part: string, index: number) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500'
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const renderPostBody = () => {
    const shortText = post.body.slice(0, textLimit);
    const fullText = post.body;

    if (!isPostExpanded && post.body.length > textLimit) {
      return createClickableLinks(shortText + '...');
    } else if (isPostExpanded) {
      return createClickableLinks(fullText);
    } else {
      return createClickableLinks(post.body);
    }
  };

  return (
    <>
      <div
        // key={postKey}
        className='mb-4 w-full mx-auto bg-white rounded-xl p-3 shadow'
      >
        {/* Header */}
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center'>
            <div className='w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center'>
              <Link href={`/user-profile/${post.creator.user_id}`}>
                <Image
                  alt='User DP'
                  src={post.creator?.profile_picture || '/ProfileDP/Dummy.png'}
                  width={50}
                  height={50}
                  objectFit='cover'
                  className='w-10 h-10 md:w-16 md:h-16 rounded-full'
                ></Image>
              </Link>
            </div>
            <div className='flex flex-col text-left px-2'>
              <>
                <Link href={`/user-profile/${post.creator.user_id}`}>
                  <h1 className='font-semibold md:text-xl'>
                    {post?.creator?.name}
                  </h1>
                </Link>
              </>
              <div className='flex items-center gap-2 md:gap-3'>
                <h5 className='text-[11px] md:text-sm text-gray-400 flex gap items-center'>
                  <FaLocationDot />
                  {/* {post.location} */}
                  Location
                </h5>
                {user?.user_name && (
                  <>
                    <span className='w-1 h-1 rounded-full bg-[#d4d4d4]'></span>
                    <h5 className='text-[11px] md:text-sm text-gray-400 flex gap items-center'>
                      <p className='flex items-center gap-1'>
                        <FaEye className='inline-block' />{' '}
                        {postPrivacy?.privacy_setting_name
                          ? postPrivacy.privacy_setting_name
                              .charAt(0)
                              .toUpperCase() +
                            postPrivacy.privacy_setting_name.slice(1)
                          : ''}
                      </p>
                    </h5>
                  </>
                )}
              </div>
            </div>
          </div>
          {user?.user_name && user.userId === post.creator.user_id && (
            <div className='relative z-30'>
              <HiDotsHorizontal
                onClick={() => setToggleEditPost(!toggleEditPost)}
                className='text-[#07a1bc]/50 text-4xl cursor-pointer hover:bg-gray-100 px-1 py-1 rounded-xl'
              />

              <PostSettings
                setPostPrivacy={setPostPrivacy}
                post={post}
                postKey={post.postId}
                isToggled={toggleEditPost}
                setToggleEditPost={setToggleEditPost}
                setRemoveId={setRemoveId}
                updatePostProperty={updatePostProperty!}
              />
            </div>
          )}
        </div>

        {/* Content body */}
        <div className='mt-2 cursor-pointer flex items-center justify-center overflow-hidden hover:drop-shadow-xl rounded-md custom-hover'>
          {post.attachments[0]?.mimeType.includes('image') && (
            <Image
              alt='Post content'
              src={`${post.attachments[0]?.fileURL}/${post.attachments[0]?.fileName}`}
              width={800}
              height={500}
              className={`rounded-md md:object-cover hover:scale-[102%] custom-hover-img h-[400px] md:h-[550px]`}
              onClick={() => handleContentView(post)}
              onLoadingComplete={() => setIsLoading && setIsLoading(false)}
              loading='lazy'
            />
          )}
          {post.attachments[0]?.mimeType.includes('video') && (
            <video
              width='800'
              height='500'
              controls
              className='rounded-md h-[353px]'
              onClick={() => handleContentView(post)}
              onCanPlay={() => setIsLoading && setIsLoading(false)}
              autoPlay={false}
              src={`${post.attachments[0]?.fileURL}/${post.attachments[0]?.fileName}`}
            >
              <source src={post.postContent} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Footer */}
        <div className='mt-3'>
          <p className='text-left text-[14px] md:text-lg text-wrap'>
            {renderPostBody()}
            {/* {post.body.length > 90 ? `${post.body.slice(0, 90)}...`} */}
            {!isPostExpanded &&
              post.body.length > textLimit &&
              `${post.body.slice(0, textLimit)}...`}

            {isPostExpanded && post.body.length > textLimit && `${post.body}`}

            {/* Show 'Read More' only if the text exceeds the limit and is not expanded */}
            {post.body.length > textLimit && !isPostExpanded && (
              <small
                onClick={() => setIsPostExpanded(!isPostExpanded)}
                className='text-[#07a1bc] cursor-pointer'
              >
                See more
              </small>
            )}
            {isPostExpanded && (
              <small
                onClick={() => setIsPostExpanded(!isPostExpanded)}
                className='text-[#07a1bc] cursor-pointer'
              >
                ..Hide
              </small>
            )}
          </p>

          <div className='flex mt-1 gap-3'>
            {links && (
              <LinkPreview
                forPost={true}
                url={links}
                closeLinkPreview={setLinks}
                disableCloseButton={true}
                post={post}
              />
            )}
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

          <div className='mt-3'>
            <Interaction post={post} updatePostProperty={updatePostProperty!} />
          </div>

          {/* post created time */}
          <div className='text-end text-gray-400 text-[11px] md:text-sm font-light'>
            <PostTimeConverter time={post?.createdAt}></PostTimeConverter>
          </div>
        </div>
      </div>

      {/* CONTENT VIEW MODAL */}
      {viewImagePost && (
        <ContentViewer
          post={post}
          object={viewImagePost}
          postContentType='image'
          onClose={() => setViewImagePost(null)}
          updatePostProperty={updatePostProperty!}
          setPostPrivacy={setPostPrivacy}
          postPrivacy={postPrivacy}
          setRemoveId={setRemoveId}
        />
      )}
    </>
  );
};

export default IndividualPost;
