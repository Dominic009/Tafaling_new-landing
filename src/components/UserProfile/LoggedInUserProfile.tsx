import axiosClient from "@/api/config";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { getAccessToken } from "@/helpers/tokenStorage";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AxiosError, AxiosProgressEvent } from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";
import SingleUploader from "../Input File/Single File Uploader/SingleUploader";
import ActionButton from "../Buttons/ActionButton";
import ProfileSkeleton from "../Loader/Skeleton/ProfileSkeleton";
import ComingSoon from "../ComingSoon";
import UserPost from "../Post/UserPost/UserPost";
import ActionBtn from "../Buttons/User Profile buttons/ActionBtn";
import { MdEditSquare, MdOutlineEdit, MdSettings } from "react-icons/md";

const LoggedInUserProfile = () => {
  const { user, login } = useAuth();
  const [modalProfilePicture, setModalProfilePicture] =
    useState<boolean>(false);
  const [modalCoverPhoto, setModalCoverPhoto] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const { item: accessToken } = useLocalStorage("auth-token");
  const [progress, setProgress] = useState(0);
  const [refetchUserPost, setRefetchUserPost] = useState<boolean>(false);

  useEffect(() => {
    if (modalProfilePicture || modalCoverPhoto) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [modalProfilePicture, modalCoverPhoto]);

  const closeModalProfilePicture = () => {
    setModalProfilePicture(false);
  };

  const closeModalCoverPhoto = () => {
    setModalCoverPhoto(false);
  };

  //upload picture handler
  const handleUploadProfilePicture = async (
    fileInputRef: React.RefObject<HTMLInputElement>
  ) => {
    let lsItem = accessToken && JSON.parse(accessToken).accessT;
    const formData = new FormData();

    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files[0]
    ) {
      formData.append("profilePhoto", fileInputRef.current.files[0]);
    }

    try {
      const { data, status } = await axiosClient.post<any>(
        "user/profile/picture/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "content-type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            setProgress(percentCompleted);
          },
        }
      );

      if (status === 201) {
        closeModalProfilePicture();
        toast.success(data.message);
        // console.log('updateProfilePicture: ', data);
        login({ ...user, profile_picture: data.data.profile_picture });
        setProgress(0);
        // fetchUserData();
      }
    } catch (e) {
      const error = e as AxiosError<any, ResponseType>;
      //console.log(error);
      setProgress(0);
      error.response?.data.message && toast.error(error.response?.data.message);
    }
  };

  //upload picture handler
  const handleUploadCoverPhoto = async (
    fileInputRef: React.RefObject<HTMLInputElement>
  ) => {
    let lsItem = accessToken && JSON.parse(accessToken).accessT;
    const formData = new FormData();

    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files[0]
    ) {
      formData.append("coverPhoto", fileInputRef.current.files[0]);
    }

    try {
      const { data, status } = await axiosClient.post<any>(
        "user/cover/picture/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "content-type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!
            );
            setProgress(percentCompleted);
          },
        }
      );
      //console.log(data);

      if (status === 201) {
        closeModalCoverPhoto();
        toast.success(data.message);
        // console.log('updateProfilePicture: ', data);
        login({ ...user, cover_photo: data.data.cover_photo });
        // fetchUserData();
        setProgress(0);
      }
    } catch (e) {
      const error = e as AxiosError<any, ResponseType>;
      //console.log(error);
      setProgress(0);
      error.response?.data.message && toast.error(error.response?.data.message);
    }
  };
  console.log(user);
  // Change the setisLoading false
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <div className="w-full lg:w-[80%] mx-auto">
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <div className="relative border-b pb-7">
          {/* Timeline IMG */}
          <div className="relative h-[240px] md:h-[300px] lg:h-[450px] group transition ease-in-out duration-500">
            {/* overlay div */}
            <div className="w-full h-full bg-black z-20 absolute opacity-0 invisible group-hover:opacity-40 group-hover:visible transition-opacity duration-500 ease-in-out rounded-b-lg"></div>
            {/* Change timeline image button */}
            <div className="absolute bottom-6 right-6 z-30 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
              <button
                onClick={() => setModalCoverPhoto(!modalCoverPhoto)}
                className="bg-gray-200 text-center rounded py-1 px-2 font-semibold hover:bg-white hover:text-[#00B4DB]"
              >
                Change Picture
              </button>
            </div>
            <Image
              src={user?.cover_photo || "/Profile banner/banner.png"}
              alt="Banner Image"
              layout="fill"
              objectFit="cover"
              className=" rounded-b-lg"
              onLoadingComplete={() => setIsLoading(false)}
            />
          </div>
          {/* modal for profile picture upload */}
          <Modal
            isOpen={modalProfilePicture}
            onClose={closeModalProfilePicture}
          >
            <div className="py-7 px-2 rounded-lg flex flex-col justify-center items-center">
              <h1 className="text-xl text-gray-500 font-semibold text-center underline mb-4">
                Select Profile Picture from device
              </h1>
              <SingleUploader
                handleUploadPicture={handleUploadProfilePicture}
                progress={progress}
              ></SingleUploader>
            </div>
          </Modal>

          {/* modal for cover photo upload */}
          <Modal
            isOpen={modalCoverPhoto}
            onClose={closeModalCoverPhoto}
          >
            <div className="py-7 px-2 rounded-lg flex flex-col justify-center items-center">
              <h1 className="text-xl text-gray-500 font-semibold text-center underline mb-4">
                Select Cover Photo from device
              </h1>
              <SingleUploader
                handleUploadPicture={handleUploadCoverPhoto}
                progress={progress}
              ></SingleUploader>
            </div>
          </Modal>

          {/* User DP */}
          <div className="flex flex-col lg:flex-row gap-5 w-[90%] mx-auto -mt-16">
            {/* overlay div */}
            <div className="w-48 md:w-[250px] lg:w-[300px] h-48 md:h-[250px] lg:h-[280px] group relative">
              <div className="w-full h-full bg-black z-40 absolute opacity-0 invisible group-hover:opacity-40 group-hover:visible transition-opacity duration-500 ease-in-out rounded-lg overflow-hidden"></div>
              {/* Change timeline image button */}
              <div className="absolute bottom-6 right-6 z-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                <button
                  onClick={() => setModalProfilePicture(!modalProfilePicture)}
                  className="bg-gray-200 text-center rounded py-1 px-2 font-semibold hover:bg-white hover:text-[#00B4DB]"
                >
                  Change Picture
                </button>
              </div>
              <Image
                src={user?.profile_picture || "/ProfileDP/Dummy.png"}
                layout="fill"
                alt="User DP"
                objectFit="cover"
                className="bottom-0 rounded-lg drop-shadow-md z-30 group"
                onLoadingComplete={() => setIsLoading(false)}
              ></Image>
            </div>
            <div className="grid md:w-[70%]">
              <div></div>
              <div className="flex flex-col justify-between lg:pt-10">
                <div className="flex items-center w-full">
                  {/* user name */}
                  <div>
                    <h1 className="text-[#00274A] font-semibold text-3xl ">
                      {user?.name}{" "}
                    </h1>
                    <p className="text-[#00274A]/50 text-md -mt-1">
                      {user?.email}
                    </p>
                  </div>
                  {/* <div className='pl-5'>
                    {user?.userId !== paramId && (
                      <ActionButton
                        onClickFn={() => {
                          console.log('follow user');
                        }}
                        outline={true}
                        text='Follow'
                        icon={IoPersonAdd}
                      />
                    )}
                  </div> */}
                  {/* user email */}
                </div>

                {/* user bio */}
                <p className="text-[#0E2943]/80 text-lg py-1 inline-flex items-center gap-3">
                  Add bio (Coming Soon)
                  <MdEditSquare className="text-2xl text-[#00B4DB] hover:text-[#287f92] cursor-pointer custom-hover" />
                </p>

                <div className="flex items-center gap-4 mt-3 md:mt-0 mb-3 md:mb-0">
                  <h5 className="text-[#00274A]">
                    <span className="text-xl font-semibold">
                      {user?.followers || '0'}
                    </span>{" "}
                    Followers
                  </h5>
                  <span className="w-2 h-2 rounded-full bg-[#00274A]"></span>
                  <h5 className="text-[#00274A]">
                    <span className="text-xl font-semibold">
                      {" "}
                      {user?.following || '0'}
                    </span>{" "}
                    Following
                  </h5>
                </div>

                {/* Profile edit and settings button */}
                <div className="flex items-center gap-5 w-[50%]">
                  <ActionBtn
                    text="Edit"
                    secondaryText="Info"
                    icon={MdOutlineEdit}
                    add={`/user-profile/${user?.userId}/settings/edit-info`}
                  />
                  <ActionBtn
                    text="Settings"
                    icon={MdSettings}
                    add={`/user-profile/${user?.userId}/settings`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Content section */}
      <section className="mt-9 flex justify-center w-[90%] md:w-[80%] gap-5 mx-auto">
        <div className="h-[80vh] w-[20%] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl text-center">
          <ComingSoon />
        </div>
        <div className="lg:w-[60%]">
          <UserPost
            refetchUserPost={refetchUserPost}
            setRefetchUserPost={setRefetchUserPost}
          ></UserPost>
        </div>
      </section>
    </div>
  );
};

export default LoggedInUserProfile;
