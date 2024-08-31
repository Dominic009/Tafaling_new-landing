import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import UserPost from "@/components/UserPost";
import React from "react";

const page = () => {
  return (
    // <div>
    //   <div className='fixed z-50 w-full'>
    //     <Navbar></Navbar>
    //   </div>
    //   {/* Page Layout */}
    //   <div className='w-full grid gap-3 text-center justify-center px-8 py-20'>
    //     <div className='border h-[80vh] fixed left-20 w-[18%]'>
    //       Left Section
    //     </div>

    //     <div className='w-[900px]'>
    //       {/* Create Post section */}
    //       <div>
    //         <Post></Post>
    //       </div>
    //       {/* User Posts */}
    //       <div>
    //         <UserPost></UserPost>
    //       </div>
    //     </div>

    //     <div className='border h-[80vh] fixed right-20 w-[18%]'>
    //       Right Section
    //     </div>
    //   </div>
    // </div>

    <div>
      {/* Page Layout */}
      <div className="grid lg:grid-cols-4 gap-2 w-full md:w-[90%] lg:w-[80%] mx-auto px-5 text-center">
        <div className="h-[80vh] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl ">
          Left Section
        </div>

        <div className="lg:col-span-2 py-6 min-w-[400px]">
          {/* Create Post section */}
          <div>
            <Post></Post>
          </div>
          {/* User Posts */}
          <div>
            <UserPost></UserPost>
          </div>
        </div>

        <div className="h-[80vh] lg:sticky lg:top-24 hidden md:hidden lg:block bg-white rounded-xl ">
          Right Section
        </div>
      </div>
    </div>
  );
};

export default page;
