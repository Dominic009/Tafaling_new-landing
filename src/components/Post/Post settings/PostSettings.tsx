import DropDownMenu from '@/components/Drop down menu/DropDownMenu';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Post } from '../UserPost/UserPost';
import Modal from '@/components/Modal/Modal';
import ChangePrivacy from '../IndividualPost/ChangePrivacy/ChangePrivacy';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { PrivacySetting } from '@/types/Auth';
import DeletePost from '../IndividualPost/DeletePost/DeletePost';

interface PostSettingsProps {
  post: Post;
  postKey?: number;
  isToggled: boolean;
  bg?: string;
  top?: string;
  right?: string;
  setRefetchUserPost?: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleEditPost?: React.Dispatch<React.SetStateAction<boolean>>;
  setRemoveId?: Dispatch<SetStateAction<number | null>>;
  setPostPrivacy: Dispatch<SetStateAction<PrivacySetting>>;
  postPrivacy?: string;
  updatePostProperty: (
    postId: number,
    updatedProperties: Partial<Post>
  ) => void;
  onClose?: () => void;
}

const PostSettings: React.FC<PostSettingsProps> = ({
  isToggled,
  post,
  postKey,
  setRefetchUserPost,
  setRemoveId,
  setPostPrivacy,
  postPrivacy,
  updatePostProperty,
  setToggleEditPost,
  onClose,
}) => {
  const [editPrivacyModal, setEditPrivacyModal] = useState<boolean>(false);
  const [deletePostModal, setDeletePostModal] = useState<boolean>(false);
  const { user } = useAuth();
  // Post selected privacy
  const userPirvacyText = user?.userPrivacy?.find(
    item => item.privacy_setting_id === post.privacyId
  );

  const handleDeletePost = () => {
    if (setRemoveId) {
      setRemoveId(post.postId);
    }
    setDeletePostModal(false);
  };

  if (!isToggled) return null;

  return (
    <div key={postKey}>
      <DropDownMenu bg='[#f4f7f8]' top='6' right='3'>
        {/* Edit Privacy Button */}
        <button
          className='hover:bg-[#dfdfdf] p-1 rounded-md cursor-pointer transition-colors ease-linear'
          onClick={() => setEditPrivacyModal(true)}
        >
          <span className='flex items-center gap-2 text-gray-800'>
            <FaUserCircle className='text-xl text-[#00B4DB]' /> Edit Privacy
          </span>
        </button>

        {/* Delete Post Button */}
        <button
          className='hover:bg-[#dfdfdf] p-1 rounded-md cursor-pointer transition-colors ease-linear'
          onClick={() => setDeletePostModal(true)}
        >
          <span className='flex items-center gap-2 text-gray-800'>
            <MdDeleteForever className='text-xl text-[#dc2626]' /> Delete Post
          </span>
        </button>
      </DropDownMenu>

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
          setRefetchUserPost={setRefetchUserPost!}
          userPrivacy={user?.userPrivacy && user?.userPrivacy}
          postData={{
            postId: post.postId,
            privacyId: post.privacyId,
          }}
          setToggleEditPost={setToggleEditPost!}
          setPostPrivacy={setPostPrivacy}
          updatePostProperty={updatePostProperty}
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
          setRemoveId={handleDeletePost}
          setToggleEditPost={setToggleEditPost!}
          onClose={onClose}
        />
      </Modal>
    </div>
  );
};

export default PostSettings;
