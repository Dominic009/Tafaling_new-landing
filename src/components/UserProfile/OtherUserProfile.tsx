import { followUser, searchUserProfile, unfollowUser } from '@/api/user/user';
import { getAccessToken } from '@/helpers/tokenStorage';
import { AuthUser } from '@/types/Auth';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ProfileSkeleton from '../Loader/Skeleton/ProfileSkeleton';
import ComingSoon from '../ComingSoon';
import UserPost from '../Post/UserPost/UserPost';
import usePosts from '@/hooks/usePosts';
import IndividualPost from '../Post/IndividualPost/IndividualPost';
import UserPostSkeleton from '../Loader/Skeleton/UserPostSkeleton';
import { IoPersonAdd } from 'react-icons/io5';
import ActionButton from '../Buttons/ActionButton';
import { MdEditSquare } from 'react-icons/md';

interface IOtherUserProfile {
  userId: number;
}

const OtherUserProfile: React.FC<IOtherUserProfile> = ({ userId }) => {
  const [userProfileInfo, setUserProfileInfo] = useState<AuthUser | null>();
  const [followCount, setFollowCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //For user get post
  const [start, setStart] = useState(0);
  //   const { user } = useAuth();

  const { posts, loading, hasMore, setRemoveId, updatePost } = usePosts({
    start,
    pageSize: 5,
    userId: userId,
    url: '/user/search/profile',
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

  //Get user data
  useEffect(() => {
    const getUserData = async () => {
      const res = await searchUserProfile(userId, 0, 1, getAccessToken());

      // console.log(res.data.data[0].creator);
      setUserProfileInfo(null);
      setUserProfileInfo({
        ...res.data.data[0].creator,
        userId: res.data.data[0].creator.user_id,
      });
      setFollowCount(res.data.data[0].creator.followers);
      setIsLoading(false);
    };

    getUserData();
  }, [userId]);

  // follow & unfollow handler
  const followUserHandler = async () => {
    setUserProfileInfo(prevState => {
      return { ...prevState, is_following: true };
    });
    setFollowCount(prevState => prevState + 1);

    try {
      const res = await followUser(
        userProfileInfo?.userId as number,
        getAccessToken()
      );

      if (res.status === 201) {
        // console.log(res);
      }
    } catch (error) {
      setUserProfileInfo(prevState => {
        return { ...prevState, is_following: false };
      });
      setFollowCount(prevState => prevState - 1);
      console.log(error);
    }
  };

  // follow user handler
  const unfollowUserHandler = async () => {
    setUserProfileInfo(prevState => {
      return { ...prevState, is_following: false };
    });
    setFollowCount(prevState => prevState - 1);
    try {
      const res = await unfollowUser(
        userProfileInfo?.userId as number,
        getAccessToken()
      );

      if (res.status === 201) {
        // console.log(res);
      }
    } catch (error) {
      setUserProfileInfo(prevState => {
        return { ...prevState, is_following: true };
      });
      setFollowCount(prevState => prevState + 1);
      console.log(error);
    }
  };

  return (
    <div className='w-full lg:w-[80%] mx-auto'>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <div className='relative border-b pb-7'>
          {/* Timeline IMG */}
          <div className='relative h-[240px] md:h-[300px] lg:h-[450px] group transition ease-in-out duration-500'>
            {/* overlay div */}
            <div className='w-full h-full bg-black z-20 absolute opacity-0 invisible group-hover:opacity-40 group-hover:visible transition-opacity duration-500 ease-in-out rounded-b-lg'></div>
            {/* Change timeline image button */}
            {/* <div className='absolute bottom-6 right-6 z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible'>
          <button
            onClick={() => setModalCoverPhoto(!modalCoverPhoto)}
            className='bg-gray-200 text-center rounded py-1 px-2 font-semibold hover:bg-white hover:text-[#00B4DB]'
          >
            Change Picture
          </button>
        </div> */}
            <Image
              src={userProfileInfo?.cover_photo || '/Profile banner/banner.png'}
              alt='Banner Image'
              layout='fill'
              objectFit='cover'
              className=' rounded-b-lg'
              onLoadingComplete={() => setIsLoading(false)}
            />
          </div>

          {/* User DP */}
          <div className='flex flex-col lg:flex-row gap-5 w-[90%] mx-auto -mt-16'>
            {/* overlay div */}
            <div className='w-48 md:w-[250px] lg:w-[300px] h-48 md:h-[250px] lg:h-[280px] group relative'>
              <div className='w-full h-full bg-black z-40 absolute opacity-0 invisible group-hover:opacity-40 group-hover:visible transition-opacity duration-500 ease-in-out rounded-lg overflow-hidden'></div>
              <Image
                src={userProfileInfo?.profile_picture || '/ProfileDP/Dummy.png'}
                layout='fill'
                alt='User DP'
                objectFit='cover'
                className='bottom-0 rounded-lg drop-shadow-md z-30 group'
                onLoadingComplete={() => setIsLoading(false)}
              ></Image>
            </div>
            <div className='grid w-[70%]'>
              <div></div>
              <div className='flex flex-col justify-between lg:pt-10'>
                <div className='flex items-center w-full'>
                  {/* user name */}
                  <div>
                    <h1 className='text-[#00274A] font-semibold text-3xl '>
                      {userProfileInfo?.name}{' '}
                    </h1>
                    <small className='text-[#00274A]/50 text-md -mt-1'>
                      {userProfileInfo?.email}
                    </small>
                  </div>
                  <div className='pl-5'>
                    {!userProfileInfo?.is_following ? (
                      <ActionButton
                        onClickFn={followUserHandler}
                        outline={true}
                        text='Follow'
                        icon={IoPersonAdd}
                      />
                    ) : (
                      <ActionButton
                        onClickFn={unfollowUserHandler}
                        outline={true}
                        text='Unfollow'
                      />
                    )}
                  </div>
                  {/* user email */}
                </div>

                {/* user bio */}
                <p className='text-[#0E2943]/80 text-lg py-1 inline-flex items-center gap-3'>
                  Add bio (Coming Soon)
                  <MdEditSquare className='text-2xl text-[#00B4DB] hover:text-[#287f92] cursor-pointer custom-hover' />
                </p>

                <div className='flex items-center gap-4'>
                  <h5 className='text-[#00274A]'>
                    <span className='text-xl font-semibold'>
                      {followCount || 0}
                    </span>{' '}
                    Followers
                  </h5>
                  <span className='w-2 h-2 rounded-full bg-[#00274A]'></span>
                  <h5 className='text-[#00274A]'>
                    <span className='text-xl font-semibold'>
                      {userProfileInfo?.following || 0}
                    </span>{' '}
                    Following
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Content section */}
      <section className='mt-9 flex justify-center w-[95%] md:w-[80%] gap-5 mx-auto'>
        <div className='h-[80vh] w-[20%] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl text-center'>
          <ComingSoon />
        </div>
        <div className='lg:w-[60%]'>
          <>
            <div>
              {posts[0]?.postId === 0 ? (
                <div className='mb-4 w-full mx-auto bg-white rounded-xl p-3 shadow h-[300px] flex items-center justify-center'>
                  <h1 className='font text-2xl font-semibold text-[#07a1bc] text-center'>
                    No posts added yet!
                  </h1>
                </div>
              ) : (
                posts.map((post, idx) => {
                  if (posts.length === idx + 1) {
                    return (
                      <div ref={lastPostElementRef} key={idx}>
                        <IndividualPost
                          post={post}
                          // postKey={idx}
                          // setIsLoading={setIsLoading}
                          isLoading={loading}
                          //   setRefetchUserPost={setRefetchUserPost!}
                          setRemoveId={setRemoveId}
                          updatePostProperty={updatePost}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div key={idx}>
                        <IndividualPost
                          post={post}
                          // postKey={idx}
                          // setIsLoading={setIsLoading}
                          isLoading={loading}
                          //   setRefetchUserPost={setRefetchUserPost!}
                          setRemoveId={setRemoveId}
                          updatePostProperty={updatePost}
                        />
                      </div>
                    );
                  }
                })
              )}
            </div>
            {loading && <UserPostSkeleton cards={1} />}
          </>
        </div>
      </section>
    </div>
  );
};

export default OtherUserProfile;
