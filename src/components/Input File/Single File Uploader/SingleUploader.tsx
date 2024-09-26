'use client';
import React, { useState } from 'react';
import { FileInput, Label } from 'flowbite-react';
import Image from 'next/image'; // Import Next.js Image component
import toast from 'react-hot-toast';
import PrimaryBtn from '@/components/PrimaryBtn';

interface ISingleUploaderProps {
  handleUploadPicture: (
    fileInputRef: React.RefObject<HTMLInputElement>
  ) => void;
  progress?: number;
}

const SingleUploader: React.FC<ISingleUploaderProps> = ({
  handleUploadPicture,
  progress,
}) => {
  const [preview, setPreview] = useState<string | null>(null); // State to store a single file preview
  const fileInputRef = React.useRef<HTMLInputElement | null>(null); // Ref for the file input to reset it

  // Handle file input change for a single image file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file)); // Set the preview URL for the image
    } else {
      toast.error('Please select an image file (JPG, PNG, GIF).');
    }
  };

  // Handle removing the preview
  const handleRemovePreview = () => {
    setPreview(null); // Clear the preview state
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input
    }
  };

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <form
        action='/user-profile'
        method='post'
        encType='multipart/form-data'
        className='flex w-full flex-col items-center justify-center'
      >
        <Label
          htmlFor='cover-photo-upload'
          className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#00B4DB] bg-gray-50 hover:bg-blue-100 custom-hover hover:text-white ${
            preview ? 'h-12' : 'h-64'
          }`}
        >
          <div
            className={`flex flex-col items-center justify-center ${
              preview ? 'pb-0' : 'pb-6'
            } pt-5`}
          >
            <svg
              className='mb-4 h-8 w-8 text-gray-500 dark:text-gray-400'
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
            <div className={`${preview ? 'hidden' : 'block'}`}>
              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Only JPG, PNG, or GIF images{' '}
                <span className='text-[#00B4DB] font-semibold'>
                  (1 file only)
                </span>
              </p>
            </div>
          </div>
          <FileInput
            id='cover-photo-upload'
            ref={fileInputRef} // Attach ref to the file input
            className='hidden'
            onChange={handleFileChange} // Capture file input change
            accept='image/jpeg, image/png, image/gif' // Accept only image files
            multiple={false}
          />
        </Label>
      </form>

      {/* Preview Section */}
      {preview && (
        <div className='mt-4 relative'>
          <Image
            src={preview}
            alt='Cover photo preview'
            width={200}
            height={200}
            className='rounded-lg object-cover'
          />
          <button
            onClick={handleRemovePreview}
            className='mt-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 absolute top-0 right-2'
          >
            X
          </button>
        </div>
      )}
      {/* <button
        onClick={() => handleUploadPicture(fileInputRef)}
        disabled = {preview ? false : true}
        className="mt-2 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
      >
        Upload
      </button> */}
      <div className='w-full flex justify-center items-center flex-col-reverse mt-8'>
        {(progress as number) > 0 ? (
          <>
            <progress
              value={progress}
              max='100'
              className='mb-2 progress-bar'
            ></progress>
            <p>{progress} %</p>
          </>
        ) : (
          <PrimaryBtn
            text='Upload'
            disabled={preview ? false : true}
            onclick={() => handleUploadPicture(fileInputRef)}
            width='40%'
          />
        )}
      </div>
    </div>
  );
};

export default SingleUploader;
