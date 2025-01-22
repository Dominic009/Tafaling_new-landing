"use client";
import PrimaryBtn from "@/components/PrimaryBtn";
// import SecondaryBtn from "@/components/SecondaryBtn";
import Image from "next/legacy/image";
// import Link from "next/link";
import "animate.css";
// import { redirect } from "next/navigation";
import { Gochi_Hand } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const gochiHand = Gochi_Hand({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-secondary to-[#00B4DB] p-5">
      <div className="flex justify-between animate__animated animate__fadeInLeft">
        <Image
          src="/Tafaling logo.png"
          alt="Image"
          width={200}
          height={85}
          className="mix-blend-plus-darker scale-75 md:scale-100"
        ></Image>
      </div>
      {/* Banner Section */}
      <section className="flex flex-col-reverse lg:flex-row gap-5 md:w-[95%] mx-auto border rounded-xl md:mt-9 p-2 md:p-8">
        <div className="flex justify-center flex-col">
          <div className="mb-5 lg:mb-16">
            <h1 className="text-3xl md:text-5xl lg:text-7xl text-white font-bold mb-2">
              Connect, Share and <br /> Discover like never before
            </h1>
            <p className={`${gochiHand.className} text-gray-200 md:text-xl`}>
              Tafaling is your ultimate destination for seamless social
              interactions and creative expression. Share your moments, connect
              with a vibrant community, and explore endless entertainment.
              Whether you are uploading photos, sharing videos, or discovering
              new content, Tafaling makes it all effortless and fun.
            </p>
          </div>
          <PrimaryBtn text="Learn more" size="xl" width="100%" />
        </div>

        {/* Swiper Section */}
        <div className="w-[100%] lg:w-[50%] object-contain rounded-lg">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            <SwiperSlide>
              <Image
                src="/Landing page/Banner.jpg"
                alt="Banner 1"
                width={2000}
                height={1300}
                className="rounded-lg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/Landing page/Banner2.jpg"
                alt="Banner 2"
                width={2000}
                height={1300}
                className="rounded-lg"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="/Landing page/Banner3.jpg"
                alt="Banner 3"
                width={2000}
                height={1300}
                className="rounded-lg"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* <div className='h-[80vh] flex flex-col items-center justify-center'>
        <h1 className='text-3xl md:text-5xl lg:text-7xl font-semibold text-white text-center'>
          Welcome to <span className='text-[#26d5fc]'>Tafaling.com</span>
        </h1>

        <p className='text-lg md:text-xl lg:text-2xl text-center mt-2 text-gray-300'>
          Your journey with us starts here. Whether you&apos;re new or
          returning, we&apos;re excited to have you. <br />
        </p>

        <div className='w-[90%] lg:w-[50%] mt-12 flex flex-col justify-center items-center  animate__animated animate__fadeInUp animate__delay-1s'>
          <p className='text-lg md:text-xl lg:text-xl text-center mt-2 text-gray-100 mb-5'>
            Please choose an option below to get started :
          </p>
          <div className='flex flex-col gap-3 lg:flex-row w-[90%] lg:w-[70%]'>
            <Link href={'/login'} className=' w-full flex justify-center'>
              <PrimaryBtn
                text={'Go to Sign In'}
                // icon
                width={'80%'}
                weight={'bold'}
                size={'2xl'}
              ></PrimaryBtn>
            </Link>

            <Link href={'/register'} className=' w-full flex justify-center'>
              <SecondaryBtn
                text={'Go to Sign Up'}
                // icon
                width={'80%'}
                weight='bold'
                size='2xl'
              ></SecondaryBtn>
            </Link>
          </div>
        </div>
      </div> */}
    </main>
  );

  // return redirect('/home');
}
