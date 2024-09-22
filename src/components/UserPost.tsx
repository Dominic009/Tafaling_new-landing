// "use client";
// import Image from "next/legacy/image";
// import React, { useEffect, useState } from "react";
// import { HiDotsHorizontal } from "react-icons/hi";
// import { IoLocationOutline } from "react-icons/io5";
// import PostTimeConverter from "./PostTimeConverter";
// import ContentViewer from "./Content Viewer/ContentViewer";

// interface Post {
//   profilePicture: string;
//   username: string;
//   location: string;
//   contentType: string;
//   postContent: string;
//   caption: string;
//   hashtags: string[];
//   postedTime: string;
// }

// const UserPost: React.FC = () => {
//   const [posts, setPosts] = React.useState<Post[]>([]);
//   const [viewImagePost, setViewImagePost] = useState<string | null>(null);
//   const [postContentType, setPostContentType] = useState<string>("");

//   useEffect(() => {
//     fetch("data.json")
//       .then((res) => res.json())
//       .then((data) => setPosts(data));
//   }, []);

//   const handleContentView = (postContent: string, contentType: string) => {
//     setViewImagePost(postContent);
//     setPostContentType(contentType);
//   };

//   useEffect(() => {
//     if (viewImagePost) {
//       document.body.classList.add("no-scroll");
//     } else {
//       document.body.classList.remove("no-scroll");
//     }

//     // Cleanup on component unmount
//     return () => document.body.classList.remove("no-scroll");
//   }, [viewImagePost]);

//   console.log(viewImagePost);

//   return (
//     <div>
//       {posts.map((post, idx) => (
//         <div
//           key={idx}
//           className="mb-4 w-full mx-auto bg-white rounded-xl p-3 shadow"
//         >
//           {/* Header */}
//           <div className="flex items-center">
//             <div>
//               <Image
//                 alt="User DP"
//                 src={post.profilePicture}
//                 width={65}
//                 height={65}
//                 className="mt-1 rounded-full"
//               ></Image>
//             </div>
//             <div className="flex-1 text-left px-2">
//               <h1 className="font-semibold text-xl">{post.username}</h1>
//               <span className="text-sm text-gray-400 flex gap items-center">
//                 <IoLocationOutline className="text-lg" />
//                 {post.location}
//               </span>
//             </div>
//             <div>
//               <HiDotsHorizontal className="text-[#07a1bc]/50 text-4xl cursor-pointer hover:bg-gray-100 px-1 py-1 rounded-xl" />
//             </div>
//           </div>

//           {/* Content body */}
//           <div className="mt-2 cursor-pointer">
//             {post.contentType === "image" ? (
//               <Image
//                 alt="Post content"
//                 src={post.postContent}
//                 width={800}
//                 height={600}
//                 className="rounded-md h-[500px] object-cover hover:scale-105 custom-hover-img"
//                 onClick={() =>
//                   handleContentView(post.postContent, post.contentType)
//                 }
//               />
//             ) : (
//               <video
//                 width="800"
//                 height="500"
//                 src={post.postContent}
//                 controls
//                 className="rounded-md h-[500px] bg-gray-950"
//                 onClick={() =>
//                   handleContentView(post.postContent, post.contentType)
//                 }
//               ></video>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="mt-3">
//             <p className="text-left text-lg">{post.caption}</p>

//             <div className="flex mt-1 gap-3">
//               {post?.hashtags.map((tag, idx) => (
//                 <ul key={idx} className="text-[#07a1bc] font-light lowercase">
//                   <li>{tag}</li>
//                 </ul>
//               ))}
//             </div>
//             <div className="text-end text-gray-400 text-sm font-light">
//               <PostTimeConverter time={post.postedTime}></PostTimeConverter>
//             </div>
//           </div>
//         </div>
//       ))}

//       {viewImagePost && (
//         <ContentViewer
//           postContentType={postContentType}
//           imageURL={viewImagePost}
//           onClose={() => setViewImagePost(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default UserPost;

'use client';
import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';
import PostTimeConverter from './PostTimeConverter';
import ContentViewer from './Content Viewer/ContentViewer';
import { useAuth } from '@/context/AuthContext/AuthProvider';

interface Post {
  profilePicture: string;
  username: string;
  location: string;
  contentType: string;
  postContent: string;
  caption: string;
  hashtags: string[];
  postedTime: string;
}

const UserPost: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [viewImagePost, setViewImagePost] = useState<string | null>(null);
  const [postContentType, setPostContentType] = useState<string>('');
  const { user } = useAuth();

  useEffect(() => {
    fetch('data.json')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleContentView = (object: any) => {
    setViewImagePost(object);
  };

  useEffect(() => {
    if (viewImagePost) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup on component unmount
    return () => document.body.classList.remove('no-scroll');
  }, [viewImagePost]);

  // console.log(viewImagePost);

  return (
    <div>
      {posts.map((post, idx) => (
        <div
          key={idx}
          className='mb-4 w-full mx-auto bg-white rounded-xl p-3 shadow'
        >
          {/* Header */}
          <div className='flex items-center'>
            <div>
              <Image
                alt='User DP'
                src={user?.profile_picture || '/ProfileDP/Dummy.png'}
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
          <div className='mt-2 cursor-pointer'>
            {post.contentType === 'image' ? (
              <Image
                alt='Post content'
                src={post.postContent}
                width={800}
                height={600}
                className='rounded-md h-[500px] object-cover hover:scale-105 custom-hover-img'
                onClick={() => handleContentView(post)}
              />
            ) : (
              <video
                width='800'
                height='500'
                controls
                className='rounded-md h-[500px]'
                onClick={() => handleContentView(post)}
              >
                <source src={post.postContent} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            )}
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
            <div className='text-end text-gray-400 text-sm font-light'>
              <PostTimeConverter time={post.postedTime}></PostTimeConverter>
            </div>
          </div>
        </div>
      ))}

      {viewImagePost && (
        <ContentViewer
          object={viewImagePost}
          postContentType={postContentType}
          onClose={() => setViewImagePost(null)}
        />
      )}
    </div>
  );
};

export default UserPost;
