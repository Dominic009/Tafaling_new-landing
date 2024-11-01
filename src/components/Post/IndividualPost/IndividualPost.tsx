'use client';

import PostTimeConverter from '@/components/PostTimeConverter';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import Image from 'next/image';
import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';
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

interface IPostProps {
  post: Post;
  key: number;
  isLoading: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetchUserPost?: React.Dispatch<React.SetStateAction<boolean>>;
  setRemoveId?: Dispatch<SetStateAction<number | null>>;
}

const IndividualPost: React.FC<IPostProps> = ({
  post,
  isLoading,
  setIsLoading,
  key,
  setRefetchUserPost,
  setRemoveId,
}) => {
  const { user } = useAuth();
  // Post selected privacy
  const userPirvacyText = user?.userPrivacy?.find(
    item => item.privacy_setting_id === post.privacyId
  );
  const [postPrivacy, setPostPrivacy] = useState<PrivacySetting>(
    userPirvacyText!
  );
  const [isPostExpanded, setIsPostExpanded] = useState<boolean>(false);
  const [toggleEditPost, setToggleEditPost] = useState<boolean>(false);
  const [viewImagePost, setViewImagePost] = useState<string | null>(null);
  const [editPrivacyModal, setEditPrivacyModal] = useState<boolean>(false);
  const [deletePostModal, setDeletePostModal] = useState<boolean>(false);
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

  // useEffect(() => {
  //   if (viewImagePost) {
  //     document.body.classList.add('no-scroll');
  //   } else {
  //     document.body.classList.remove('no-scroll');
  //   }

  //   // Cleanup on component unmount
  //   return () => document.body.classList.remove('no-scroll');
  // }, [viewImagePost]);

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
        key={key}
        className='mb-4 w-full mx-auto bg-white rounded-xl p-3 shadow'
      >
        {/* Header */}
        <div className='flex items-center mb-3'>
          <div className='w-16 h-16 rounded-full flex items-center justify-center'>
            <Link href={`/user-profile/${user?.userId}`}>
              <Image
                alt='User DP'
                src={user?.profile_picture || '/ProfileDP/Dummy.png'}
                width={50}
                height={50}
                objectFit='cover'
                className='w-16 h-16 rounded-full'
              ></Image>
            </Link>
          </div>
          <div className='flex-1 text-left px-2'>
            <Link href={`/user-profile/${user?.userId}`}>
              <h1 className='font-semibold text-xl'>{post?.creator?.name}</h1>
            </Link>
            <div className='flex items-center gap-3'>
              <h5 className='text-sm text-gray-400 flex gap items-center'>
                <IoLocationOutline className='text-lg' />
                {/* {post.location} */}
                Location
              </h5>
              <span className='w-1 h-1 rounded-full bg-[#d4d4d4]'></span>
              <h5 className='text-sm text-gray-400 flex gap items-center'>
                <p className='flex items-center gap-1'>
                  <FaEye className='inline-block' />{' '}
                  {postPrivacy?.privacy_setting_name}
                </p>
              </h5>
            </div>
          </div>
          {user?.user_name && (
            <div className='relative z-40'>
              <HiDotsHorizontal
                onClick={() => setToggleEditPost(!toggleEditPost)}
                className='text-[#07a1bc]/50 text-4xl cursor-pointer hover:bg-gray-100 px-1 py-1 rounded-xl'
              />
              {toggleEditPost && (
                <DropDownMenu bg='[#f4f7f8]' top='6' right='3'>
                  {/* dropdown buttons here */}
                  <button
                    className='hover:bg-[#dfdfdf] p-1 rounded-md cursor-pointer transition-colors ease-linear'
                    onClick={() => setEditPrivacyModal(true)}
                  >
                    <span className='flex items-center gap-2 text-gray-800'>
                      <FaUserCircle className='text-xl text-[#00B4DB]' /> Edit
                      Privacy
                    </span>
                  </button>

                  {/* Delete post */}
                  <button
                    className='hover:bg-[#dfdfdf] p-1 rounded-md cursor-pointer transition-colors ease-linear'
                    onClick={() => setDeletePostModal(true)}
                  >
                    <span className='flex items-center gap-2 text-gray-800'>
                      <MdDeleteForever className='text-xl text-[#dc2626]' />{' '}
                      Delete Post
                    </span>
                  </button>
                </DropDownMenu>
              )}
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
              className={`rounded-md object-cover hover:scale-[102%] custom-hover-img h-[500px]`}
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
          <p className='text-left text-lg text-wrap'>
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
                className='text-gray-400 cursor-pointer'
              >
                See more
              </small>
            )}
            {isPostExpanded && (
              <small
                onClick={() => setIsPostExpanded(!isPostExpanded)}
                className='text-gray-400 cursor-pointer'
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
            <Interaction post={post} />
          </div>

          {/* post created time */}
          <div className='text-end text-gray-400 text-sm font-light'>
            <PostTimeConverter time={post?.createdAt}></PostTimeConverter>
          </div>
        </div>
      </div>

      {/* MODAL FOR POST */}
      {/* EDIT PRIVACY MODAL */}
      <Modal
        isOpen={editPrivacyModal}
        onClose={() => setEditPrivacyModal(!editPrivacyModal)}
        width={'40%'}
      >
        <h1>Edit Privacy</h1>
        <ChangePrivacy
          modal={editPrivacyModal}
          setModal={setEditPrivacyModal}
          setRefetchUserPost={setRefetchUserPost}
          userPrivacy={user?.userPrivacy && user?.userPrivacy}
          postData={{
            postId: post.postId,
            privacyId: post.privacyId,
          }}
          setToggleEditPost={setToggleEditPost}
          setPostPrivacy={setPostPrivacy}
        />
      </Modal>

      {/* DELETE POST MODAL */}
      <Modal
        isOpen={deletePostModal}
        onClose={() => setDeletePostModal(!deletePostModal)}
        width={'30%'}
      >
        <DeletePost
          modal={deletePostModal}
          setModal={setDeletePostModal}
          post={post}
          setRemoveId={setRemoveId}
          setToggleEditPost={setToggleEditPost}
        />
      </Modal>

      {/* CONTENT VIEW MODAL */}
      {viewImagePost && (
        <ContentViewer
          object={viewImagePost}
          postContentType='image'
          onClose={() => setViewImagePost(null)}
        />
      )}
    </>
  );
};

export default IndividualPost;
