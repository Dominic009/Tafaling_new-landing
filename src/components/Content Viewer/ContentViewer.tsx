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

import Image from "next/legacy/image";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";

interface ContentProps {
  onClose: () => void;
  postContentType: string;
  object: any;
}

const ContentViewer: React.FC<ContentProps> = ({ onClose, object }) => {
  return (
    <div className="bg-black/90 fixed w-full h-full backdrop-blur-sm left-0 top-0 right-0 bottom-0 z-50 flex items-center justify-center animate__animated animate__fadeIn animate__faster overflow-hidden p-16">
      <div className="mx-auto w-[80%] h-[90vh] flex gap-1 border-4 border-white rounded-md">
        {object ? (
          <div className=" lg:col-span-2 flex justify-center items-center relative scale-90 flex-1">
            {object.contentType === "image" ? (
              <div className="">
                <Image
                  alt="Image"
                  src={object.postContent}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            ) : (
              <video
                src={object.postContent}
                width="400"
                height="500"
                controls
              ></video>
            )}
          </div>
        ) : (
          ""
        )}

        {/* Interaction section */}
        <div className="bg-[#f4f7f8] w-[25%] rounded-tr-sm rounded-br-sm p-4">
          <div>
            {/* User Information */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Image
                  alt="User DP"
                  src={object.profilePicture}
                  width={50}
                  height={50}
                  className="mt-1 rounded-full"
                ></Image>
              </div>
              <div className="flex-1 text-left">
                <h1 className="font-semibold text-xl">{object.username}</h1>
                <span className="text-sm text-gray-400 flex items-center">
                  <IoLocationOutline />
                  {object.location}
                </span>
              </div>
              <div>
                <HiDotsHorizontal className="text-[#07a1bc]/50 text-3xl cursor-pointer hover:bg-gray-100 px-1 py-1 rounded-xl" />
              </div>
            </div>

            {/* Post Caption */}
            <div className="mt-6">
              <p className="text-left leading-4">{object.caption}</p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full hover:bg-red-600 hover:text-white`}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default ContentViewer;
