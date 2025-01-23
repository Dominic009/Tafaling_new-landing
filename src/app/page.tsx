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
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Make sure AOS CSS is imported
import SecondaryBtn from "@/components/SecondaryBtn";
import Link from "next/link";

const gochiHand = Gochi_Hand({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease", delay: 300 });
  }, []);

  const features = [
    "Share and Showcase Your Moments",
    "Intuitive Design",
    "Entertainment Hub",
    "Seamless Interaction",
    "Personalized Discovery",
  ];

  const stepsData = [
    {
      image: "/Landing page/Step1.png",
      description: "Sign Up for free",
    },
    {
      image: "/Landing page/Step2.png",
      description: "Set up your profile",
    },
    {
      image: "/Landing page/Asset2.png",
      description: "Do TAFALING",
    },
  ];

  return (
    <main>
      <div className="min-h-screen bg-gradient-to-tr from-secondary to-[#00B4DB] p-5">
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
        <section className="flex flex-col-reverse lg:flex-row gap-16 md:w-[95%] mx-auto  rounded-xl md:mt-9 p-2 md:p-8">
          <div className="flex justify-center flex-col ">
            <div className="mb-5 lg:mb-16">
              <h1 className="text-3xl md:text-5xl lg:text-7xl text-white font-bold mb-2">
                Connect, Share and <br /> Discover like never before
              </h1>
              <p
                className={`${gochiHand.className} text-gray-200 md:text-xl`}
              >
                Tafaling is your ultimate destination for seamless social
                interactions and creative expression. Share your moments,
                connect with a vibrant community, and explore endless
                entertainment. Whether you are uploading photos, sharing videos,
                or discovering new content, Tafaling makes it all effortless and
                fun.
              </p>
            </div>
            {/* <PrimaryBtn text="Learn more" size="xl" width="100%" /> */}
            <div>
              <a
                href="#getting-started"
                className={`bg-primary hover:bg-secondary py-2 rounded-md text-white font- md:text-xl flex items-center justify-center gap-2 transition duration-300 ease-in-out active:scale-90`}
              >
                <button>Learn More</button>
              </a>
            </div>
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
      </div>
      {/* About Section */}
      <div
        className={`mt-32 mb-32 w-[90%] mx-auto flex flex-col lg:flex-row justify-center items-center gap-5`}
      >
        <div data-aos="flip-up" className="rounded-lg shadow-xl">
          <Image
            src="/Landing page/About.jpg"
            alt="Banner 1"
            width={2000}
            height={1300}
            className="rounded-lg"
          ></Image>
        </div>
        <div>
          <h1
            className={`text-3xl md:text-5xl border-l-8 border-primary pl-2 mb-3`}
          >
            About tafaling
          </h1>
          <p className={`text-xl text-gray-500 ${gochiHand.className} `}>
            Tafaling is a vibrant social media and entertainment platform
            designed to bring people closer through creativity and connection.
            Our mission is to create a space where users can effortlessly share
            their stories, discover engaging content, and connect with a dynamic
            community worldwide.
          </p>
          <div
            data-aos="fade-left"
            className="grid md:grid-cols-3 text-center gap-5 mt-10"
          >
            {features.map((feature, key) => (
              <div key={key}>
                <p className="border border-primary rounded-full px-3 py-1 hover:bg-[#003846]/50 custom-hover font-semibold text-gray-800">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Get Started Section */}
      <section
        id="getting-started"
        className="min-h-screen bg-gradient-to-tr from-secondary to-[#00B4DB] py-4 flex items-center"
      >
        <div className="w-[90%] mx-auto">
          <div data-aos="fade-up" className="text-center mb-16 lg:mb-24">
            <h1
              className={`text-3xl lg:text-5xl mb-5 lg:w-[40%] mx-auto font-bold text-white`}
            >
              Getting Started with Tafaling
            </h1>
            <p className={`text-xl text-gray-200 ${gochiHand.className} lg:w-[70%] mx-auto`}>
              Getting started with Tafaling is quick and easy! In just a few
              simple steps, you will be part of a vibrant community, ready to
              share, discover, and connect. First, sign up for free and create
              your account. Then, personalize your profile to showcase who you
              are. Finally, start exploring the platform, share your moments,
              and engage with others. Tafaling is designed to be intuitive, so
              you will be up and running in no time!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-10 justify-between items-center">
            {stepsData.map((step, idx) => (
              <div key={idx} className="border md:border-none p-2 rounded-lg">
                <img
                  src={step.image}
                  width={400}
                  height={400}
                  alt="steps"
                  className="rounded-lg drop-shadow-2xl animate-pulse h-[320px] object-contain"
                ></img>
                <h1
                  className={`text-white text-xl lg:text-3xl mt-5 text-center font-semibold uppercase`}
                >
                  {step.description}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join us */}
      <section className="bg-gray-100 py-32">
        <div
          className="w-[90%] mx-auto bg-secondary p-5 flex flex-col-reverse gap-16 md:flex-row items-center justify-center rounded-lg shadow-2xl group"
          style={{
            backgroundImage: `url('/Pattern 3.png')`,
            backgroundSize: "1700px",
            backgroundPosition: "-600px -500px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col gap-6 md:w-[30%]">
            <h1
              className={`text-3xl lg:text-3xl mb-5 font-semibold text-white text-left`}
            >
              Join Tafaling Today and Be Part of the Community!
            </h1>
            <div data-aos="zoom-out" data-aos-duration="2000">
              <Link href={"/register"}>
                {" "}
                <PrimaryBtn
                  text="Register"
                  width="100%"
                  size="2xl"
                  weight="bold"
                />
              </Link>
            </div>
            <div data-aos="zoom-out" data-aos-duration="2500">
              <Link href={"/login"}>
                {" "}
                <SecondaryBtn
                  text="Sign In"
                  width="100%"
                  size="2xl"
                  weight="bold"
                />
              </Link>
            </div>
          </div>
          <div>
            <Image
              src={"/Landing page/Join.png"}
              width={500}
              height={500}
              alt="Join us"
            ></Image>
          </div>
        </div>
      </section>

      <footer className="text-center py-4 bg-gray-800 text-white">
        <p>&copy; {new Date().getFullYear()} Tafaling. All Rights Reserved.</p>
      </footer>

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
