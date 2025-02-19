import { useAuth } from '@/context/AuthContext/AuthProvider';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoClose, IoLocationOutline } from 'react-icons/io5';
import ContentLoader from '../Loader/ContentLoader';
import { extractYouTubeVideoId } from '@/helpers/common';
import { Post } from '../Post/UserPost/UserPost';

interface ExternalVideoPlayerModal {
  onClose: () => void;
  videoUrl: string;
  post?: Post;
}

const ExternalVideoPlayerModal: React.FC<ExternalVideoPlayerModal> = ({
  videoUrl,
  onClose,
  post,
}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [screenSize, setIsScreenSize] = useState(false);

  //to hide the icon for small screens
  useEffect(() => {
    const handleResize = () => {
      setIsScreenSize(window.innerWidth > 1440);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='bg-black/90 fixed w-full h-full backdrop-blur-sm left-0 top-0 right-0 bottom-0 z-50 flex items-center justify-center animate__animated animate__fadeIn animate__faster p-4 lg:p-16 custom-scrollbar overflow-y-scroll'>
      <div className='mx-auto w-full md:w-[90%] md:h-[80vh] lg:h-[85vh] flex flex-col lg:flex-row gap-1 border-2 border-white bg-black/80 rounded-md'>
        {!videoUrl ? (
          <div className='flex justify-center items-center relative scale-90 flex-1'>
            {/* Content loading */}
            {isLoading && <ContentLoader />}
          </div>
        ) : (
          <iframe
            width='100%'
            height='100%'
            src={`https://www.youtube.com/embed/${extractYouTubeVideoId(
              videoUrl
            )}`}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        )}

        <button
          onClick={onClose}
          className={`fixed top-5 right-5 font-semibold text-gray-500 bg-gray-100 px-2 py-2 rounded-full hover:bg-red-600 hover:text-white custom-hover`}
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default ExternalVideoPlayerModal;
