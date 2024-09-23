// "use client";
// import React, { useState } from "react";
// import { FileInput, Label } from "flowbite-react";
// import Image from "next/image"; // Import Next.js Image component
// import toast from "react-hot-toast";

// interface ISingleUploaderProps {
//   handleUploadPicture: (
//     fileInputRef: React.RefObject<HTMLInputElement>
//   ) => void;
// }

// const SingleUploader: React.FC<ISingleUploaderProps> = ({
//   handleUploadPicture,
// }) => {
//   const [preview, setPreview] = useState<string | null>(null); // State to store a single file preview
//   const fileInputRef = React.useRef<HTMLInputElement | null>(null); // Ref for the file input to reset it

//   // Handle file input change for a single image file
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type.startsWith("image/")) {
//       setPreview(URL.createObjectURL(file)); // Set the preview URL for the image
//     } else {
//       toast.error("Please select an image file (JPG, PNG, GIF).");
//     }
//   };

//   // Handle removing the preview
//   const handleRemovePreview = () => {
//     setPreview(null); // Clear the preview state
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""; // Reset the file input
//     }
//   };

//   return (
//     <div className="flex w-full flex-col items-center justify-center">
//       <form
//         action="/user-profile"
//         method="post"
//         encType="multipart/form-data"
//         className="flex w-full flex-col items-center justify-center"
//       >
//         <Label
//           htmlFor="cover-photo-upload"
//           className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#00B4DB] bg-gray-50 hover:bg-blue-100 custom-hover hover:text-white ${
//             preview ? "h-12" : "h-64"
//           }`}
//         >
//           <div
//             className={`flex flex-col items-center justify-center ${
//               preview ? "pb-0" : "pb-6"
//             } pt-5`}
//           >
//             <svg
//               className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 20 16"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//               />
//             </svg>
//             <div className={`${preview ? "hidden" : "block"}`}>
//               <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                 <span className="font-semibold">Click to upload</span> or drag
//                 and drop
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Only JPG, PNG, or GIF images{" "}
//                 <span className="text-[#00B4DB] font-semibold">
//                   (1 file only)
//                 </span>
//               </p>
//             </div>
//           </div>
//           <FileInput
//             id="cover-photo-upload"
//             ref={fileInputRef} // Attach ref to the file input
//             className="hidden"
//             onChange={handleFileChange} // Capture file input change
//             accept="image/jpeg, image/png, image/gif" // Accept only image files
//             multiple={false}
//           />
//         </Label>
//       </form>

//       {/* Preview Section */}
//       {preview && (
//         <div className="mt-4 relative">
//           <Image
//             src={preview}
//             alt="Cover photo preview"
//             width={200}
//             height={200}
//             className="rounded-lg object-cover"
//           />
//           <button
//             onClick={handleRemovePreview}
//             className="mt-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 absolute top-0 right-2"
//           >
//             X
//           </button>
//           <button
//             onClick={() => handleUploadPicture(fileInputRef)}
//             className="mt-2 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
//           >
//             Upload
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleUploader;

"use client";
import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import Image from "next/image"; // Import Next.js Image component
import toast from "react-hot-toast";

interface ISingleUploaderProps {
  handleUploadPicture: (
    fileInputRef: React.RefObject<HTMLInputElement>
  ) => void;
}

const SingleUploader: React.FC<ISingleUploaderProps> = ({
  handleUploadPicture,
}) => {
  const [preview, setPreview] = useState<string | null>(null); // State to store a single file preview
  const [uploadProgress, setUploadProgress] = useState<number>(0); // State to track upload progress
  const [isUploading, setIsUploading] = useState<boolean>(false); // State to track if the file is being uploaded
  const fileInputRef = React.useRef<HTMLInputElement | null>(null); // Ref for the file input to reset it

  // Handle file input change for a single image file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file)); // Set the preview URL for the image
    } else {
      toast.error("Please select an image file (JPG, PNG, GIF).");
    }
  };

  // Handle removing the preview
  const handleRemovePreview = () => {
    setPreview(null); // Clear the preview state
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };

  // Simulate file upload with progress
  const uploadFileWithProgress = async (file: File) => {
    setIsUploading(true); // Set uploading state
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete); // Update progress
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        toast.success("Upload complete!"); // Show success message
      } else {
        toast.error("Upload failed.");
      }
      setIsUploading(false); // Reset uploading state
      setUploadProgress(0); // Reset progress
    };

    xhr.onerror = () => {
      toast.error("Upload error.");
      setIsUploading(false); // Reset uploading state
      setUploadProgress(0); // Reset progress
    };

    xhr.open("POST", "/api/upload"); // Replace with your upload URL
    xhr.send(formData);
  };

  // Handle file upload
  const handleUpload = () => {
    if (fileInputRef.current?.files?.[0]) {
      uploadFileWithProgress(fileInputRef.current.files[0]);
    } else {
      toast.error("No file selected for upload.");
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <form
        action="/user-profile"
        method="post"
        encType="multipart/form-data"
        className="flex w-full flex-col items-center justify-center"
      >
        <Label
          htmlFor="cover-photo-upload"
          className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#00B4DB] bg-gray-50 hover:bg-blue-100 custom-hover hover:text-white ${
            preview ? "h-12" : "h-64"
          }`}
        >
          <div
            className={`flex flex-col items-center justify-center ${
              preview ? "pb-0" : "pb-6"
            } pt-5`}
          >
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <div className={`${preview ? "hidden" : "block"}`}>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Only JPG, PNG, or GIF images{" "}
                <span className="text-[#00B4DB] font-semibold">
                  (1 file only)
                </span>
              </p>
            </div>
          </div>
          <FileInput
            id="cover-photo-upload"
            ref={fileInputRef} // Attach ref to the file input
            className="hidden"
            onChange={handleFileChange} // Capture file input change
            accept="image/jpeg, image/png, image/gif" // Accept only image files
            multiple={false}
          />
        </Label>
      </form>

      {/* Preview Section */}
      {preview && (
        <div className="mt-4 relative">
          <Image
            src={preview}
            alt="Cover photo preview"
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />
          <button
            onClick={handleRemovePreview}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 absolute top-0 right-2"
          >
            X
          </button>

          {/* Upload Button */}
          {!isUploading && (
            <button
              onClick={handleUpload}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
            >
              Upload
            </button>
          )}

          {/* Progress Bar */}
          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <p className="text-center text-sm mt-2">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleUploader;
