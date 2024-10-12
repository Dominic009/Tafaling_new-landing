import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

interface ILinkPreviewProps {
  url: string;
  closeLinkPreview: React.Dispatch<React.SetStateAction<string>>;
  disableCloseButton?: boolean;
}

const LinkPreview: React.FC<ILinkPreviewProps> = ({
  url,
  closeLinkPreview,
  disableCloseButton = false,
}) => {
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
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
      }
    };

    fetchMetadata();
  }, [url]);

  return (
    <div className=' border border-gray-300 rounded-lg overflow-hidden w-full my-2 relative'>
      {!disableCloseButton && (
        <button
          onClick={() => closeLinkPreview('')}
          className='mt-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 absolute -top-2 right-1 cursor-pointer z-[1000]'
        >
          X
        </button>
      )}
      <Link href={metadata.url} target='_blank' className='w-full flex'>
        {metadata.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={metadata.image}
            alt={metadata.title}
            className='w-44 h-36 object-cover'
          />
        )}
        <div className='p-4 flex flex-col justify-between'>
          <h3 className='text-lg font-semibold text-gray-800'>
            {metadata.title}
          </h3>
          <p className='text-sm text-gray-600 mt-1'>
            {metadata.description.slice(0, 80) + '...'}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default LinkPreview;
