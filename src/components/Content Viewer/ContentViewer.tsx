import Image from "next/legacy/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import ContentLoader from "../Loader/ContentLoader";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { IoClose } from "react-icons/io5";
import PostSettings from "../Post/Post settings/PostSettings";
import { Post } from "../Post/UserPost/UserPost";
import { PrivacySetting } from "@/types/Auth";
import { FaEye } from "react-icons/fa";
import Interaction from "../Post/IndividualPost/UserInteractions/Interaction";

interface ContentProps {
  post: Post;
  onClose: () => void;
  postContentType: string;
  object: any;
  setRemoveId?: Dispatch<SetStateAction<number | null>>;
  updatePostProperty: (
    postId: number,
    updatedProperties: Partial<Post>
  ) => void;
  setPostPrivacy: Dispatch<SetStateAction<PrivacySetting>>;
  postPrivacy?: PrivacySetting;
}
const ContentViewer: React.FC<ContentProps> = ({
  onClose,
  object,
  post,
  setRemoveId,
  updatePostProperty,
  setPostPrivacy,
  postPrivacy,
}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [screenSize, setIsScreenSize] = useState(false);
  const [toggleEditPost, setToggleEditPost] = useState<boolean>(false);
  const [viewImagePost, setViewImagePost] = useState<string | null>(null);

  //to hide the icon for small screens
  useEffect(() => {
    const handleResize = () => {
      setIsScreenSize(window.innerWidth > 1440);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (object) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup on component unmount
    return () => document.body.classList.remove("no-scroll");
  }, [object]);

  const handleContentView = (object: any) => {
    setViewImagePost(object);
  };

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const textLimit = 90;

  return (
    <div className='bg-black/90 fixed w-full h-full backdrop-blur-sm left-0 top-0 right-0 bottom-0 z-50 flex items-center justify-center animate__animated animate__fadeIn animate__faster overflow-hidden p-4 lg:p-16 custom-scrollbar overflow-y-scroll'>
      <div className='mx-auto w-full md:w-[90%] md:h-[80vh] lg:h-[85vh] flex flex-col lg:flex-row gap-1 border-2 border-white bg-black/80 rounded-md'>
        {object ? (
          <div className='flex justify-center items-center relative scale-90 flex-1'>
            {/* Content loading */}
            {isLoading && <ContentLoader />}
            {object.attachments[0]?.mimeType.includes("image") && (
              <div>
                {screenSize ? (
                  // if screen size is bigger than 1440px
                  <Image
                    alt='Post content'
                    src={`${object.attachments[0]?.fileURL}/${object.attachments[0]?.fileName}`}
                    width={1800}
                    height={1000}
                    className='rounded-md object-contain'
                    onLoadingComplete={() => setIsLoading(false)}
                    loading='lazy'
                  />
                ) : (
                  //regular devices
                  <Image
                    alt='Post content'
                    src={`${object.attachments[0]?.fileURL}/${object.attachments[0]?.fileName}`}
                    width={900}
                    height={700}
                    className='rounded-md object-contain'
                    onLoadingComplete={() => setIsLoading(false)}
                    loading='lazy'
                  />
                )}
              </div>
            )}
            {object.attachments[0]?.mimeType.includes("video") && (
              <video
                width='800'
                height='500'
                controls
                className='rounded-md h-[500px]'
                onCanPlay={() => setIsLoading(false)}
                src={`${object.attachments[0]?.fileURL}/${object.attachments[0]?.fileName}`}
              >
                <source src={object.postContent} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ) : (
          ""
        )}

        {/* Interaction section */}
        <div className='bg-[#f4f7f8] w-full lg:w-[25%] rounded-tr-sm rounded-br-sm py-4 px-4 relative overflow-y-auto custom-scrollbar'>
          <div className='py-2'>
            {/* User Information */}
            <div className='flex items-center gap-2'>
              <div className='w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center'>
                <Image
                  alt='User DP'
                  src={user?.profile_picture || "/ProfileDP/Dummy.png"}
                  width={50}
                  height={50}
                  className='w-10 h-10 md:w-16 md:h-16 rounded-full mt'
                ></Image>
              </div>
              <div className='flex-1 text-left '>
                <h1 className='font-semibold md:text-xl'>
                  {object.creator.name}
                </h1>
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
                          <FaEye className='inline-block' />{" "}
                          {postPrivacy?.privacy_setting_name
                            ? postPrivacy.privacy_setting_name
                                .charAt(0)
                                .toUpperCase() +
                              postPrivacy.privacy_setting_name.slice(1)
                            : ""}
                        </p>
                      </h5>
                    </>
                  )}
                </div>
              </div>
              {user?.userId && user.userId === post.creator.user_id && (
                <div>
                  <HiDotsHorizontal
                    onClick={() => setToggleEditPost(!toggleEditPost)}
                    className='text-[#07a1bc]/50 text-4xl cursor-pointer hover:bg-gray-100 px-1 py-1 rounded-xl'
                  />
                  <PostSettings
                    post={post}
                    postKey={post.postId}
                    isToggled={toggleEditPost}
                    setRemoveId={setRemoveId}
                    updatePostProperty={updatePostProperty}
                    setPostPrivacy={setPostPrivacy}
                    setToggleEditPost={setToggleEditPost}
                    onClose={onClose}
                  />
                </div>
              )}
            </div>

            {/* Post Caption */}
            {post.body && (
              <div className='mt-6 '>
                <p
                  className={`text-left ${
                    isExpanded && "h-60"
                  } custom-scrollbar overflow-y-auto`}
                >
                  {" "}
                  {!isExpanded &&
                    object.body.length > textLimit &&
                    `${object.body.slice(0, textLimit)}...`}
                  {isExpanded &&
                    object.body.length > textLimit &&
                    `${object.body}`}
                  {object.body.length < textLimit && `${object.body}`}
                  {/* Show 'Read More' only if the text exceeds the limit and is not expanded */}
                  {object.body.length > textLimit && !isExpanded && (
                    <small
                      onClick={() => setIsExpanded(!isExpanded)}
                      className='text-[#07a1bc] cursor-pointer'
                    >
                      See more
                    </small>
                  )}
                  {isExpanded && (
                    <small
                      onClick={() => setIsExpanded(!isExpanded)}
                      className='text-[#07a1bc] cursor-pointer'
                    >
                      ..Hide
                    </small>
                  )}
                </p>
              </div>
            )}
            <hr className='mt-5' />
            <div className='mt-2'>
              <Interaction
                post={post}
                updatePostProperty={updatePostProperty}
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className={`fixed top-5 right-5 font-semibold text-gray-500 bg-gray-100 px-2 py-2 rounded-full hover:bg-red-600 hover:text-white custom-hover`}
          >
            <IoClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentViewer;
