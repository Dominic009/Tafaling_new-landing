'use client';
import { getAuthUser, loginUser } from '@/api/auth/auth';
import PrimaryBtn from '@/components/PrimaryBtn';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { AuthUser } from '@/types/Auth';
import { ResponseType } from '@/types/Response';
import { AxiosError } from 'axios';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import 'animate.css';
import useLocalStorage from '@/hooks/useLocalStorage';

// for using reacts "useState" changed the function name from 'page' to "Page"
const Page = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const { setItem } = useLocalStorage('auth-token');
  const { login, user, isAuthLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthUser>();

  // if (isAuthLoading) {
  //   return (
  //     <div className='h-[90vh] flex justify-center items-center'>
  //       <h1 className='text-2xl'>Loading... ⏳</h1>
  //     </div>
  //   );
  // }

  const handleLoginUser = async (userData: AuthUser) => {
    toast.dismiss();
    setIsLoginLoading(true);
    try {
      const { data, status } = await loginUser(userData);
      console.log('login response: ', data);
      if (status == 200) {
        login({
          user_name: data.data.user.user_name,
          email: data.data.user.email,
          cover_photo: data.data.user.cover_photo,
          profile_picture: data.data.user.profile_picture,
          name: data.data.user.name,
          email_verified_at: data.data.user.email_verified_at ? true : false,
        });

        setItem(
          JSON.stringify({
            accessT: data.data.access_token,
            refreshT: data.data.refresh_token,
          })
        );

        // check if email is verified, if not, redirect to email verification page
        if (data?.data?.user?.email_verified_at === null) {
          router.push('verifyEmail');
        } else {
          setItem(
            JSON.stringify({
              accessT: data.data.access_token,
              refreshT: data.data.refresh_token,
            })
          );
          router.push('home');
        }

        //toast.success("Login Success!");
      }
    } catch (e) {
      const error = e as AxiosError<any, ResponseType>;
      // console.log(error);
      error.response?.data.message && toast.error(error.response?.data.message);
      setIsLoginLoading(false);
    }
  };

  if (user?.user_name && user.email_verified_at) {
    router.push('home');
  } else {
    return (
      <main className='flex min-h-screen bg-gradient-to-b from-[#004A99] to-[#00B4DB]'>
        <div className='opacity-20 absolute -left-52 scale-125'></div>

        <div
          className='grid grid-cols-1 lg:grid-cols-2 gap-24 w-full items-center justify-center'
          style={{
            backgroundImage: `url('/Pattern 3.png')`,
            backgroundSize: '1700px',
            backgroundPosition: '-600px -150px',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Left side */}
          <div className='z-50 flex flex-col items-center justify-center lg:border-r scale-50 lg:scale-100 h-[50%] '>
            <h1 className='font-semibold text-[#08B7EB] text-4xl mb-3'>
              Welcome to
            </h1>
            <Link href={'/'}>
              <Image
                src='/Tafaling logo.png'
                alt='Image'
                style={{ width: '100%', height: 'auto' }}
                width={500}
                height={200}
                className='mix-blend-plus-darker'
              ></Image>
            </Link>
          </div>

          {/* Rigth side */}
          <div className='w-[90%] md:w-[70%] lg:max-w-[60%] mx-auto z-50 -mt-24 md:-mt-0  animate__animated animate__fadeIn'>
            <div className='bg-gray-900/30 py-10 rounded-xl flex flex-col items-center backdrop-blur-sm'>
              <h1 className='text-3xl text-white border-b-4 border-[#008EAD] mb-8'>
                Sign In
              </h1>

              <form
                onSubmit={handleSubmit(handleLoginUser)}
                className='flex flex-col gap-5 w-[80%]'
              >
                {/* Email */}
                <div className='relative'>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    placeholder='Your Email'
                    className={`px-4 py-2 rounded-md outline-none w-full ${
                      errors.email ? 'border-2 border-red-600' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className='text-red-300'>{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className='relative'>
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    placeholder='Your Password'
                    type={isOpen ? 'text' : 'password'}
                    className={`px-4 py-2 rounded-md outline-none w-full ${
                      errors.password ? 'border-2 border-red-600' : ''
                    }`}
                  />
                  {isOpen ? (
                    <IoEyeOutline
                      onClick={() => setIsOpen(!isOpen)}
                      className='absolute right-3 top-3 cursor-pointer text-xl text-[#00B4DB]'
                    />
                  ) : (
                    <IoEyeOffOutline
                      onClick={() => setIsOpen(!isOpen)}
                      className='absolute right-3 top-3 cursor-pointer text-xl text-[#00B4DB]'
                    />
                  )}
                  {errors.password && (
                    <p className='text-red-300'>{errors.password.message}</p>
                  )}
                </div>

                {/* Sign In button */}
                <div className='w-full flex justify-center'>
                  <PrimaryBtn
                    text={`Login`}
                    disabled={isLoginLoading}
                    width={'100%'}
                    size={'2xl'}
                    weight={'bold'}
                    type='submit'
                    isLoading={isLoginLoading}
                  />
                </div>
                <div>
                  <Link
                    href='/forgotPassword'
                    className='text-[#D6EAFF]/50 -mt-5 text-sm'
                  >
                    Forgot password?
                  </Link>

                  {/* <div className="flex items-center gap-1 w-[80%] mt-4">
                    <input type="checkbox" />
                    <p className="text-[#D6EAFF]/50">Remember Me</p>
                  </div> */}
                </div>
              </form>

              {/* Third party log in */}
              <div className='w-[80%] mt-3 flex gap-2 items-center mb-3'>
                <div className='border-b border-[#BFB0B0] w-[33%]'></div>
                <div className='text-[#D6EAFF]/50 flex-1 text-center hidden md:block'>
                  or continue with
                </div>
                <p className='text-[#D6EAFF]/50 flex-1 text-center md:hidden'>
                  or
                </p>
                <div className='border-b border-[#BFB0B0] w-[33%]'></div>
              </div>

              <p className='text-center font-light text-gray-400 text-sm md:text-md'>
                By clicking continue, you agree to Tafalings <br />{' '}
                <a href='#' className='text-gray-300'>
                  User Agreement
                </a>
                ,{' '}
                <a href='#' className='text-gray-300'>
                  Privacy Policy{' '}
                </a>{' '}
                &{' '}
                <a href='#' className='text-gray-300'>
                  Cookie Policy
                </a>
              </p>

              <div className='flex gap-4 text-[#00B4DB] font-normal w-[70%] mt-5'>
                <button className='bg-[#F2F2F2] hover:bg-[#1f515c] hover:text-white w-[100%] py-2 px-4 rounded-md text-lg flex justify-center items-center gap-2 transitiont duration-300 ease-in-out'>
                  <Image
                    src='/Icons/google.png'
                    alt='google'
                    width={25}
                    height={25}
                    style={{ width: 'auto', height: 'auto' }}
                  ></Image>
                  Google
                </button>
                <button className='bg-[#F2F2F2] w-[100%] py-2 px-4 rounded-md lg:text-lg hover:bg-[#1f515c] hover:text-white transitiont duration-300 ease-in-out'>
                  Other
                </button>
              </div>
            </div>

            {/* Join Now link */}
            <h2 className='mt-7 text-white text-center text-xl font-light'>
              New to Tafaling?{' '}
              <Link href='/register' className='text-[#025C70] font-semibold'>
                JOIN NOW
              </Link>
            </h2>
          </div>
        </div>
      </main>
    );
  }
};

export default Page;
