import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import FileUploader from "./Input File/FileUploader";
import Modal from "./Modal/Modal";

interface PostProps {
  children?: React.ReactNode;
}

const PostBody: React.FC<PostProps> = ({ children }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Function to handle the opening of the modal for different tabs
  const openModalForTab = (tab: string | null) => {
    setActiveTab(tab);
    setModal(true); // Open the modal
  };

  // Function to close the modal and reset the active tab
  const closeModal = () => {
    setModal(false);
    setActiveTab(null);
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup on component unmount
    return () => document.body.classList.remove("no-scroll");
  }, [modal]);

  return (
    <div>
      <div className="flex items-center gap-3 border-b border-gray-200">
        <Image
          alt="User DP"
          src={"/ProfileDP/Profile.png"}
          width={50}
          height={65}
        />
        <input
          type="text"
          placeholder="Thinking of something...?"
          className="text-gray-400 font-light w-full outline-none h-[100px]"
        />
      </div>
      {children}
      <div className="mt-3 flex justify-between items-center">
        <div>
          {/* <ul className="flex text-gray-400">
            <li className="hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center gap-1">
              <Image
                src={"/Icons/media.png"}
                width={30}
                height={30}
                alt="Media icon"
              ></Image>
              Photo/Video
            </li>
            <li className="hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center gap-1">
              <Image
                src={"/Icons/location.png"}
                width={30}
                height={30}
                alt="Media icon"
              ></Image>
              Location
            </li>
            <li className="hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center gap-1">
              <Image
                src={"/Icons/emoji.png"}
                width={30}
                height={30}
                alt="Media icon"
              ></Image>
              Activity
            </li>
          </ul> */}
          {/* Interaction Buttons */}
          <ul className="grid grid-cols-3 text-gray-400">
            <li
              onClick={() => openModalForTab("photo-video")}
              className="hover:bg-gray-100 px-4 rounded-full cursor-pointer flex items-center justify-center gap-1"
            >
              <Image
                src={"/Icons/media.png"}
                width={30}
                height={30}
                alt="Media icon"
              />
              Photo/Video
            </li>
            <li
              onClick={() => openModalForTab("location")}
              className="hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center justify-center gap-1"
            >
              <Image
                src={"/Icons/location.png"}
                width={30}
                height={30}
                alt="Location icon"
              />
              Location
            </li>
            <li
              onClick={() => openModalForTab("activity")}
              className="hover:bg-gray-100 px-4 py-1 rounded-full cursor-pointer flex items-center justify-center gap-1"
            >
              <Image
                src={"/Icons/emoji.png"}
                width={30}
                height={30}
                alt="Activity icon"
              />
              Activity
            </li>
          </ul>
        </div>
        <PrimaryBtn text={"Create Post"} width={"15%"}></PrimaryBtn>
      </div>
      {/* Modal Content Based on Active Tab */}
      <Modal isOpen={modal} onClose={closeModal}>
        {/* Default Modal for "Thinking about something...?" */}
        {!activeTab && <PostBody></PostBody>}

        {/* Modal for Photo/Video Upload */}
        {activeTab === "photo-video" && (
          <div>
            <PostBody>
              {/* new */}
              <FileUploader></FileUploader>
            </PostBody>
          </div>
        )}

        {/* Modal for Location */}
        {activeTab === "location" && (
          <PostBody>
            {" "}
            <div>
              <h2 className="text-xl mb-4">Add Location</h2>
              <input
                type="text"
                placeholder="Enter location..."
                className="w-full border border-gray-300 p-2 rounded-md mb-4"
              />
            </div>
          </PostBody>
        )}

        {/* Modal for Activity */}
        {activeTab === "activity" && (
          <PostBody>
            {" "}
            <div>
              <h2 className="text-xl mb-4">Add Activity</h2>
              <input
                type="text"
                placeholder="What are you doing?"
                className="w-full border border-gray-300 p-2 rounded-md mb-4"
              />
            </div>
          </PostBody>
        )}
      </Modal>
    </div>
  );
};

export default PostBody;
