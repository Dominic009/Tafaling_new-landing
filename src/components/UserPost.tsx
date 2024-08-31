'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';

interface Post {
  profilePicture: string;
  username: string;
  location: string;
  postContent: string;
  caption: string;
  hashtags: string[];
}

const UserPost: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  useEffect(() => {
    fetch('data.json')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  console.log(posts);

  return (
    <div>
      {posts.map((post, idx) => (
        <div
          key={idx}
          className='mb-4 w-[100%] mx-auto bg-white rounded-xl p-3 shadow'
        >
          {/* Header */}
          <div className='flex items-center'>
            <div>
              <Image
                alt='User DP'
                src={post.profilePicture}
                width={65}
                height={65}
                className='mt-1 rounded-full'
              ></Image>
            </div>
            <div className='flex-1 text-left px-2'>
              <h1 className='font-semibold text-xl'>{post.username}</h1>
              <span className='text-sm text-gray-400 flex gap items-center'>
                <IoLocationOutline className='text-lg' />
                {post.location}
              </span>
            </div>
            <div>
              <HiDotsHorizontal className='text-[#07a1bc]/50 text-4xl cursor-pointer hover:bg-gray-100 px-1 py-1 rounded-xl' />
            </div>
          </div>

          {/* Content body */}
          <div className='mt-2'>
            <Image
              alt='My image'
              src={post.postContent}
              width={800}
              height={600}
              className='rounded-md h-[500px] object-cover'
            ></Image>
          </div>

          {/* Footer */}
          <div className='mt-3'>
            <p className='text-left text-lg'>{post.caption}</p>

            <div className='flex mt-1 gap-3'>
              {post?.hashtags.map((tag, idx) => (
                <ul key={idx} className='text-[#07a1bc] font-light lowercase'>
                  <li>{tag}</li>
                </ul>
              ))}
            </div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPost;
