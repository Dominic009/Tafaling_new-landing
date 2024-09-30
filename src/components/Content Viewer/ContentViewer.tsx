// import Image from "next/legacy/image";
// import React from "react";

// interface ContentProps {
//   imageURL: string;
//   onClose: () => void;
//   postContentType: string;
// }

// const ContentViewer: React.FC<ContentProps> = ({
//   imageURL,
//   onClose,
//   postContentType,
// }) => {
//   return (
//     <div className="bg-gray-900/70 fixed w-full h-full backdrop-blur-sm left-0 top-0 z-50 flex items-center justify-center animate__animated animate__fadeIn animate__faster pt-[100px] overflow-hidden">
//       <div className="mx-auto w-[95%] h-full rounded-xl p-3 shadow mb-12 bg-black/60 relative grid lg:grid-cols-4 gap-5">
//         <div className="col-span-3 relative flex justify-center items-center">
//           {postContentType === "image" ? (
//             <Image
//               alt="Image"
//               src={imageURL}
//               layout="fill"
//               objectFit="contain"
//               className="rounded-md"
//             />
//           ) : (
//             <video src={imageURL} width="400" height="500" controls ></video>
//           )}
//         </div>
//         <div className="border bg-[#f4f7f8] rounded-md">
//           <h1>Comment section</h1>
//         </div>
//         <button
//           onClick={onClose}
//           className={`absolute top-2 right-2 font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full hover:bg-red-600 hover:text-white`}
//         >
//           X
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ContentViewer;

import Image from 'next/legacy/image';
import React, { useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';
import ContentLoader from '../Loader/ContentLoader';
import { useAuth } from '@/context/AuthContext/AuthProvider';

interface ContentProps {
  onClose: () => void;
  postContentType: string;
  object: any;
}
const ContentViewer: React.FC<ContentProps> = ({ onClose, object }) => {
  const { user, isAuthLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className='bg-black/90 fixed w-full h-full backdrop-blur-sm left-0 top-0 right-0 bottom-0 z-50 flex items-center justify-center animate__animated animate__fadeIn animate__faster overflow-hidden p-16'>
      <div className='mx-auto w-full lg:w-[80%] h-[85vh] flex flex-col lg:flex-row gap-1 border-2 border-white bg-black/80 rounded-md'>
        {object ? (
          <div className=' lg:col-span-2 flex justify-center items-center relative scale-90 flex-1'>
            {/* Content loading */}
            {isLoading && <ContentLoader />}
            {object.attachments[0]?.mimeType.includes('image') && (
              <Image
                alt='Post content'
                src={`${object.attachments[0]?.fileURL}/${object.attachments[0]?.fileName}`}
                width={800}
                height={600}
                className='rounded-md h-[500px] object-cover hover:scale-105 custom-hover-img'
                onLoadingComplete={() => setIsLoading(false)}
                loading='lazy'
              />
            )}
            {object.attachments[0]?.mimeType.includes('video') && (
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
          ''
        )}

        {/* Interaction section */}
        <div className='bg-[#f4f7f8] w-full lg:w-[25%] rounded-tr-sm rounded-br-sm p-4 relative'>
          <div className='py-2'>
            {/* User Information */}
            <div className='flex items-center gap-2'>
              <div className='flex items-center'>
                <Image
                  alt='User DP'
                  src={user?.profile_picture || '/ProfileDP/Dummy.png'}
                  width={50}
                  height={50}
                  className='mt-1 rounded-full'
                ></Image>
              </div>
              <div className='flex-1 text-left'>
                <h1 className='font-semibold text-xl'>{object.creator.name}</h1>
                <span className='text-sm text-gray-400 flex items-center'>
                  <IoLocationOutline />
                  {/* {object.location} */}
                  Location
                </span>
              </div>
              <div>
                <HiDotsHorizontal className='text-[#07a1bc]/50 text-3xl cursor-pointer hover:bg-gray-100 px-1 py-1 rounded-xl' />
              </div>
            </div>

            {/* Post Caption */}
            <div className='mt-6'>
              <p className='text-left leading-4'>{object.body}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`absolute -top-[570px] -right-3 lg:-top-3 font-semibold text-red-600 bg-gray-200 px-3 py-1 rounded-full hover:bg-red-600 hover:text-white custom-hover`}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentViewer;
