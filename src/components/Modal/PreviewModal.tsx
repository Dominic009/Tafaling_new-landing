import React from "react";
import Modal from "./Modal";
import PrimaryBtn from "../PrimaryBtn";
import SecondaryBtn from "../SecondaryBtn";
import { IoMdLogIn } from "react-icons/io";
import { PiNotePencilFill } from "react-icons/pi";
import { HiUser } from "react-icons/hi";
import Link from "next/link";

interface PreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewProps> = ({ isOpen, onClose }) => {
  return (
    <div>
      <Modal
        className='w-[80%] lg:w-[35%] xl:w-[25%]'
        isOpen={isOpen}
        onClose={onClose}
        bg="gradient-to-r from-[#004A99] to-[#012349]"
      >
        <div className="py-8">
          <div className="w-[70%] mx-auto space-y-5 mb-12">
            <>
              <p className="text-md text-gray-300 mb-2">
                To use the full features, please
              </p>
              <Link href={`login`} className="w-full">
                <PrimaryBtn
                  text="Login"
                  width="100%"
                  disabled={false}
                  icon={IoMdLogIn}
                  size="xl"
                />
              </Link>
            </>
            <>
              <p className="text-md text-gray-300 mb-2">
                Dont have an account?
              </p>
              <Link href={`register`} className="w-full">
                <PrimaryBtn
                  text="Register"
                  width="100%"
                  disabled={false}
                  icon={PiNotePencilFill}
                  size="xl"
                />
              </Link>
            </>
          </div>
          <div className="w-[80%] mx-auto mt-3 flex gap-2 items-center mb-3">
            <div className="border-b border-[#BFB0B0] w-[33%]"></div>
            <div className="text-gray-400 flex-1 text-center hidden md:block">
              or continue as
            </div>
            <p className="text-gray-400 flex-1 text-center md:hidden">or</p>
            <div className="border-b border-[#BFB0B0] w-[33%]"></div>
          </div>
          <div className="w-[50%] mx-auto">
            <SecondaryBtn
              text="Guest"
              width="100%"
              Icon={HiUser}
              onClose={onClose}
            ></SecondaryBtn>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PreviewModal;
