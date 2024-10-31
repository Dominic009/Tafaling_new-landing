import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import ContentLoader from '@/components/Loader/ContentLoader';
import ExternalVideoPlayerModal from '@/components/Content Viewer/ExternalVideoPlayerModal';
import { extractYouTubeVideoId } from '@/helpers/common';
import { Post } from '../UserPost/UserPost';
interface ILinkPreviewProps {
  url: string;
  closeLinkPreview: React.Dispatch<React.SetStateAction<string>>;
  disableCloseButton?: boolean;
  forPost: boolean;
  post: Post;
}

const LinkPreview: React.FC<ILinkPreviewProps> = ({
  url,
  closeLinkPreview,
  disableCloseButton = false,
  forPost,
  post,
}) => {
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [externalVideoPlayer, setExternalVideoPlayer] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://99.237.86.169:7070/api/get/meta/tags?url=${url}`
        );
        setMetadata({
          title: data.title || data['twitter:title'] || 'No Title',
          description: data.description || 'No Description',
          image: data['twitter:image'] || 'https://via.placeholder.com/100', // Default image if none found
          url: data['twitter:url'] || url,
        });
      } catch (error) {
        console.error('Error fetching metadata', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  return (
    <>
      <div className='border border-gray-300 rounded-lg overflow-hidden w-full my-2 relative p-2'>
        {!disableCloseButton && (
          <button
            onClick={() => closeLinkPreview('')}
            className='text-red-600 font-semibold text-lg rounded-full border border-red-500 absolute top-1 right-1 cursor-pointer z-[1000] hover:bg-red-600 hover:text-white px-1 py-1 custom-hover'
          >
            <IoClose />
          </button>
        )}
        {loading ? (
          <div className='h-16 flex items-center justify-center custom-hover'>
            <ContentLoader />
          </div>
        ) : extractYouTubeVideoId(metadata.url) ? (
          <div
            onClick={() => setExternalVideoPlayer(!externalVideoPlayer)}
            className='w-full flex custom-hover cursor-pointer'
          >
            {forPost ? (
              <div className='w-full'>
                <div className='w-full mb-2'>
                  {metadata.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={metadata?.image || 'Image is not avaiable'}
                      alt={metadata.title}
                      className='w-full max-h-[450px] object-cover rounded-sm'
                    />
                  )}
                </div>
                <div className='p-1 flex flex-col justify-center text-left'>
                  <h3 className='text-xl font-semibold text-gray-800 leading-5'>
                    {metadata.title}
                  </h3>
                  <p className='text-sm text-gray-600 mt-1'>
                    {metadata.description.slice(0, 180) + '...'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {metadata.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={metadata.image}
                    alt={metadata.title}
                    className='w-44 h-36 object-cover'
                  />
                )}
                <div className='p-1 flex flex-col justify-center text-left'>
                  <h3 className='text-lg font-semibold text-gray-800 leading-5'>
                    {metadata.title}
                  </h3>
                  <p className='text-sm text-gray-600 mt-2'>
                    {metadata.description.slice(0, 80) + '...'}
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link
            href={metadata.url}
            target='_blank'
            className='w-full flex custom-hover'
          >
            {forPost ? (
              <div className='w-full'>
                <div className='w-full mb-2'>
                  {metadata.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={metadata?.image || 'Image is not avaiable'}
                      alt={metadata.title}
                      className='w-full max-h-[450px] object-cover rounded-sm'
                    />
                  )}
                </div>
                <div className='p-1 flex flex-col justify-center text-left'>
                  <h3 className='text-xl font-semibold text-gray-800 leading-5'>
                    {metadata.title}
                  </h3>
                  <p className='text-sm text-gray-600 mt-1'>
                    {metadata.description.slice(0, 180) + '...'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {metadata.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={metadata.image}
                    alt={metadata.title}
                    className='w-44 h-36 object-cover'
                  />
                )}
                <div className='p-1 flex flex-col justify-center text-left'>
                  <h3 className='text-lg font-semibold text-gray-800 leading-5'>
                    {metadata.title}
                  </h3>
                  <p className='text-sm text-gray-600 mt-2'>
                    {metadata.description.slice(0, 80) + '...'}
                  </p>
                </div>
              </>
            )}
          </Link>
        )}
      </div>

      {externalVideoPlayer && (
        <ExternalVideoPlayerModal
          videoUrl={metadata.url}
          onClose={() => setExternalVideoPlayer(false)}
          post={post}
        />
      )}
    </>
  );
};

export default LinkPreview;
