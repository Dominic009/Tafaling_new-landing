import PrimaryBtn from '@/components/PrimaryBtn';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { FileInput, Label } from 'flowbite-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface PostProps {
  modal?: React.ReactNode;
}

interface CreatePostType {
  post: string;
  file: string | any;
}

const CreatePost: React.FC<PostProps> = ({ modal }) => {
  const [previews, setPreviews] = useState<{ url: string; type: string }[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
    control,
    reset,
  } = useForm<CreatePostType>();

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
      setPreviews(prevPreviews => [...prevPreviews, ...newFilePreviews]);
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

  const createPostHandler = (data: CreatePostType) => {
    const formData = new FormData();
    formData.append('body', data.post);
    formData.append('privacy_id', '1');

    // console.log(data);

    for (let key in data.file) {
      formData.append(`attachments[${key}]`, data.file[key]);
    }

    // Log formData entries
    // for (let pair of formData.entries()) {
    //   console.log(pair);
    // }
  };

  return (
    <form onSubmit={handleSubmit(createPostHandler)}>
      <div className='flex items-center gap-3 border-b border-gray-200'>
        <Image
          alt='User DP'
          src={user?.profile_picture || '/ProfileDP/Dummy.png'}
          width={50}
          height={65}
        />
        <input
          type='text'
          placeholder='Thinking of something...?'
          {...register('post')}
          className='text-gray-400 font-light w-full outline-none h-[100px]'
        />
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

                <button
                  onClick={() => handleRemovePreview(index)}
                  className='mt-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 absolute top-0 right-2'
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
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
                    id='dropzone-file'
                    ref={fileInputRef} // Attach ref to the file input
                    className='hidden'
                    onChange={e => {
                      field.onChange(e.target.files);
                      handleFileChange(e);
                    }} // Capture file input change
                    multiple // Enable multiple file uploads
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
        <PrimaryBtn text={'Create Post'} width={'15%'}></PrimaryBtn>
      </div>
    </form>
  );
};

export default CreatePost;
