import axiosClient from '@/api/config';
import { createUserPost } from '@/api/posts/posts';
import { IRefetchUserPostProp } from '@/app/(Pages)/home/page';
import PrimaryBtn from '@/components/PrimaryBtn';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { getAccessToken } from '@/helpers/tokenStorage';
import { PrivacySetting } from '@/types/Auth';
import { AxiosError, AxiosProgressEvent } from 'axios';
import { FileInput, Label } from 'flowbite-react';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye } from 'react-icons/fa6';
import LinkPreview from '../LinkPreview/LinkPreview';

interface PostProps extends IRefetchUserPostProp {
  modal?: React.ReactNode;
  setModal: Dispatch<SetStateAction<boolean>>;
  userPrivacy: PrivacySetting[] | [];
}

interface CreatePostType {
  post: string;
  file: string | any;
  privacy: string;
}

const CreatePost: React.FC<PostProps> = ({
  modal,
  setModal,
  setRefetchUserPost,
  userPrivacy,
}) => {
  const [previews, setPreviews] = useState<{ url: string; type: string }[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
  const { register, handleSubmit, getValues, formState, control, reset } =
    useForm<CreatePostType>();

  useEffect(() => {
    if (modal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [modal]);

  //   Handle file input change for multiple files
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFilePreviews = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        type: file.type, // Capture the file type (image or video)
      }));
      // setPreviews(prevPreviews => [...prevPreviews, ...newFilePreviews]);
      setPreviews(newFilePreviews); // for now user can upload single photo
      // Set the preview URLs for all the files
    }
  };

  // Handle removing a specific preview
  const handleRemovePreview = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index)); // Remove the selected preview
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input
    }
  };

  const handleButtonClick = () => {
    // Trigger click on the hidden file input element
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const createPostHandler = async (data: CreatePostType) => {
    if (!data.file && !data.post.length) {
      toast.error('Can not create empty post!');
      return;
    }

    const formData = new FormData();
    formData.append('body', data.post);
    formData.append('privacy_id', data.privacy);
    // console.log(data);
    for (let key in data.file) {
      if (typeof data.file[key] === 'object') {
        formData.append(`attachments[${key}]`, data.file[key]);
      }
    }

    try {
      // const { data, status } = await createUserPost(formData, getAccessToken());
      // if (status === 201) {
      //   toast.success('Post created successfully!');
      //   setModal(false);
      //   setRefetchUserPost(true);
      // }
      const { data, status } = await axiosClient.post<any>(
        'posts/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            'content-type': 'multipart/form-data',
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
        toast.success('Post created successfully!');
        setModal(false);
        setRefetchUserPost && setRefetchUserPost(true);
        setProgress(0);
      }
    } catch (e) {
      const error = e as AxiosError<any, ResponseType>;
      setProgress(0);
      console.log(error);
      // toast.error(error?.response?.data.message);
      toast.error('Post creation failed!');
    }

    // Log formData entries
    // for (let pair of formData.entries()) {
    //   console.log(pair);
    // }
  };

  // for detecting links

  const [text, setText] = useState('');
  const [links, setLinks] = useState<string | ''>();

  useEffect(() => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const detectedLinks = text.match(urlRegex);

    if (detectedLinks) {
      setLinks(text);
    } else {
      setLinks('');
    }
  }, [text]);

  return (
    <form onSubmit={handleSubmit(createPostHandler)}>
      <div className='flex items-center gap-3 border-b border-gray-200'>
        <Image
          alt='User DP'
          src={user?.profile_picture || '/ProfileDP/Dummy.png'}
          width={50}
          height={65}
        />
        <div className='flex flex-col w-full'>
          <textarea
            // type='text'
            rows={10}
            disabled={progress === 0 ? false : true}
            placeholder='Thinking of something...?'
            {...register('post')}
            onChange={e => setText(e.target.value)}
            className='text-gray-500 font-light w-full outline-none h-[150px] bg-blue-100 rounded-md mb-2 p-2'
          />
          {links && <LinkPreview url={links} />}
        </div>
      </div>
      {/* Preview Section */}
      {previews.length > 0 && (
        <div className='mt-5'>
          <div className=' grid grid-cols-3 gap-4'>
            {previews.map((preview, index) => (
              <div key={index} className='flex flex-col items-center relative'>
                {/* Render image or video based on the file type */}
                {preview.type.startsWith('image/') ? (
                  <Image
                    src={preview.url}
                    alt={`Uploaded file preview ${index + 1}`}
                    width={200}
                    height={200}
                    className='rounded-lg object-cover'
                  />
                ) : (
                  <video
                    src={preview.url}
                    controls
                    className='max-h-64 rounded-lg'
                  />
                )}

                {progress === 0 && (
                  <label
                    onClick={() => handleRemovePreview(index)}
                    className='mt-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 absolute -top-4 right-2 cursor-pointer'
                  >
                    X
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div
        className={`flex flex-col items-center justify-center w-full ${
          previews.length && 'mt-3'
        }`}
      >
        <Label
          htmlFor='dropzone-file'
          className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#00B4DB] bg-gray-50 hover:bg-blue-100 custom-hover hover:text-white ${
            previews.length > 0 ? 'h-12' : 'h-64'
          }`}
        >
          <div
            className={`flex flex-col items-center justify-center ${
              previews.length > 0 ? 'pb-0' : 'pb-6'
            } pt-5`}
          >
            <svg
              className='mb-4 h-8 w-8 text-[#00B4DB]'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 16'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
              />
            </svg>
            <div className={`${previews.length > 0 ? 'hidden' : 'block'}`}>
              {/* <p className='mb-2 text-sm text-gray-500 text-center'>
                Click to upload (Multiple photos)
              </p> */}
              <p className='mb-2 text-sm text-gray-500 text-center'>
                Click to upload
              </p>
              <p className='text-xs text-gray-500'>
                SVG, PNG, JPG, GIF, or MP4 (MAX. 800x400px)
              </p>
            </div>
          </div>

          <Controller
            name='file'
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <FileInput
                disabled={progress === 0 ? false : true}
                id='dropzone-file'
                ref={fileInputRef} // Attach ref to the file input
                className='hidden'
                onChange={e => {
                  field.onChange(e.target.files);
                  handleFileChange(e);
                }} // Capture file input change
                //multiple // Enable multiple file uploads
                accept='video/*, image/*'
              />
            )}
          ></Controller>
        </Label>
      </div>
      <div className='mt-3 flex justify-between items-center'>
        <div>
          {/* Interaction Buttons */}
          <ul className='grid grid-cols-3 text-gray-400'>
            <li
              onClick={() => handleButtonClick()}
              className='hover:bg-gray-100 px-4 rounded-full cursor-pointer flex items-center justify-center gap-1'
            >
              <Controller
                name='file'
                control={control}
                defaultValue={''}
                render={({ field }) => (
                  <FileInput
                    disabled={progress === 0 ? false : true}
                    id='dropzone-file'
                    ref={fileInputRef} // Attach ref to the file input
                    className='hidden'
                    onChange={e => {
                      field.onChange(e.target.files);
                      handleFileChange(e);
                    }} // Capture file input change
                    //multiple // Enable multiple file uploads
                    accept='video/*, image/*'
                  />
                )}
              ></Controller>
              <Image
                src={'/Icons/media.png'}
                width={30}
                height={30}
                alt='Media icon'
              />
              Photo/Video
            </li>
            <li
              //   onClick={() => openModalForTab("location")}
              className='hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center justify-center gap-1'
            >
              <Image
                src={'/Icons/location.png'}
                width={30}
                height={30}
                alt='Location icon'
              />
              Location
            </li>
            <li
              //   onClick={() => openModalForTab("activity")}
              className='hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center justify-center gap-1'
            >
              <Image
                src={'/Icons/emoji.png'}
                width={30}
                height={30}
                alt='Activity icon'
              />
              Activity
            </li>
          </ul>
        </div>
        {(progress as number) > 0 ? (
          <div className='flex items-center pr-4'>
            <progress
              value={progress}
              max='100'
              className='progress-bar'
            ></progress>
            <p className='ml-2'>{progress} %</p>
          </div>
        ) : (
          <>
            <div>
              <label>
                <FaEye className='inline-block' />
              </label>
              <select {...register('privacy')} className='cursor-pointer'>
                {userPrivacy.map(item => {
                  return (
                    <option
                      key={item.privacy_setting_id}
                      value={item.privacy_setting_id}
                    >
                      {item.privacy_setting_name
                        .slice(0, 1)
                        .toLocaleUpperCase() +
                        item.privacy_setting_name.slice(1)}
                    </option>
                  );
                })}
              </select>
            </div>
            <PrimaryBtn text={'Create Post'} width={'15%'}></PrimaryBtn>
          </>
        )}
      </div>
    </form>
  );
};

export default CreatePost;
