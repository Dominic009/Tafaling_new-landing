import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";

export function FileUploader() {
  const [previews, setPreviews] = useState<{ url: string; type: string }[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null); 
  const path = useRouter();
  console.log(path)

  // Handle file input change for multiple files
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFilePreviews = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type, // Capture the file type (image or video)
      }));
      setPreviews((prevPreviews) => [...prevPreviews, ...newFilePreviews]);
      // Set the preview URLs for all the files
    }
  };

  // Handle removing a specific preview
  const handleRemovePreview = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index)); // Remove the selected preview
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <form
        action="/upload"
        method="post"
        encType="multipart/form-data"
        className={`flex flex-col items-center justify-center w-full`}
      >
        <Label
          htmlFor="dropzone-file"
          className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#00B4DB] bg-gray-50 hover:bg-blue-100 custom-hover hover:text-white ${
            previews.length > 0 ? "h-12" : "h-64"
          }`}
        >
          <div
            className={`flex flex-col items-center justify-center ${
              previews.length > 0 ? "pb-0" : "pb-6"
            } pt-5`}
          >
            <svg
              className="mb-4 h-8 w-8 text-[#00B4DB]"
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
            <div className={`${previews.length > 0 ? "hidden" : "block"}`}>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                SVG, PNG, JPG, GIF, or MP4 (MAX. 800x400px)
              </p>
            </div>
          </div>

          <FileInput
            id="dropzone-file"
            ref={fileInputRef} // Attach ref to the file input
            className="hidden"
            onChange={handleFileChange} // Capture file input change
            multiple // Enable multiple file uploads
            accept="video/*, image/*"
          />
        </Label>
      </form>

      <div className="mt-5">
        {/* Preview Section */}
        {previews.length > 0 && (
          <div className=" grid grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="flex flex-col items-center relative">
                {/* Render image or video based on the file type */}
                {preview.type.startsWith("image/") ? (
                  <Image
                    src={preview.url}
                    alt={`Uploaded file preview ${index + 1}`}
                    width={200} // Set desired width
                    height={200} // Set desired height
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <video
                    src={preview.url}
                    controls
                    className="max-h-64 rounded-lg"
                  />
                )}

                <button
                  onClick={() => handleRemovePreview(index)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 absolute top-0 right-2"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
