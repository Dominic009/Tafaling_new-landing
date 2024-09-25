'use client';
import PrimaryBtn from '@/components/PrimaryBtn';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { AuthUser } from '@/types/Auth';
import { registerUser } from '@/api/auth/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext/AuthProvider';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import 'animate.css';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';

const Page = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
  const { login, user, isAuthLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleRegisterUser = async (data: any) => {
    setIsRegisterLoading(true);

    const userData = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
    };

    try {
      const { data, status } = await registerUser(userData);

      if (status == 201) {
        router.push('login');
      }
      toast.success(data.message);
    } catch (e) {
      const error = e as AxiosError<any>;
      toast.error(error.response?.data.message);
      console.log(error.response?.data.message);
      setIsRegisterLoading(false);
    }
  };

  const password = watch('password');

  if (isAuthLoading) {
    return (
      <div className='h-[90vh] flex justify-center items-center'>
        <h1 className='text-2xl'>Loading... ⏳</h1>
      </div>
    );
  }

  if (user?.user_name && user.email_verified_at) {
    router.push('home');
  } else {
    return (
      <main className='flex min-h-screen bg-gradient-to-b from-[#004A99] to-[#00B4DB]'>
        <div className='opacity-20 absolute -left-52 scale-125'></div>

        <div
          className='grid grid-cols-1 lg:grid-cols-2 w-full items-center justify-center'
          style={{
            backgroundImage: `url('/Pattern 3.png')`,
            backgroundSize: '1700px',
            backgroundPosition: '-600px -150px',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Right side */}
          <div className='z-50 flex flex-col items-center justify-center lg:border-l scale-50 lg:scale-100 h-[50%] lg:order-last'>
            <h1 className='font-semibold text-[#08B7EB] text-4xl mb-3'>
              Welcome to
            </h1>
            <Link href={'/'}>
              <Image
                src='/Tafaling logo.png'
                alt='Image'
                width={500}
                height={200}
                style={{ width: '100%', height: 'auto' }}
                className='mix-blend-plus-darker'
              ></Image>
            </Link>
          </div>

          {/* Left side */}
          <div className='w-[90%] md:w-[70%] lg:max-w-[60%] mx-auto z-50 md:-mt-0 animate__animated animate__fadeIn'>
            <div className='bg-gray-900/30 py-10 rounded-xl flex flex-col items-center backdrop-blur-sm'>
              <h1 className='text-3xl text-white border-b-4 border-[#008EAD] mb-8'>
                Sign Up
              </h1>

              {/* Input fields */}
              <form
                onSubmit={handleSubmit(handleRegisterUser)}
                className='flex flex-col gap-5 w-[80%]'
              >
                {/* Name */}
                <div className='relative'>
                  <input
                    placeholder='Your Name'
                    {...register('fullName', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    className={`px-4 py-2 rounded-md outline-none w-full ${
                      errors.fullName ? 'border-2 border-red-600' : ''
                    }`}
                  />

                  {errors.fullName?.message && (
                    <p className='text-red-300 mt-1'>
                      {String(errors.fullName.message)}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className='relative'>
                  <input
                    placeholder='Your Email'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value:
                          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                        message: 'Enter a valid email',
                      },
                    })}
                    type='email'
                    className={`px-4 py-2 rounded-md outline-none w-full focus:peer ${
                      errors.email ? 'border-2 border-red-600' : ''
                    }`}
                  />

                  {errors.email?.message && (
                    <p className='text-red-300 mt-1'>
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className='relative'>
                  <input
                    placeholder='Your Password'
                    type={isOpen ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
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

                  {errors.password?.message && (
                    <p className='text-red-300 mt-1'>
                      {String(errors.password.message)}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className='relative'>
                  <input
                    placeholder='Confirm Password'
                    type='password'
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: value =>
                        value === password || 'Passwords do not match',
                    })}
                    className={`px-4 py-2 rounded-md outline-none w-full ${
                      errors.confirmPassword ? 'border-2 border-red-600' : ''
                    }`}
                  />
                  {errors.confirmPassword?.message && (
                    <p className='text-red-300 mt-1'>
                      {String(errors.confirmPassword.message)}
                    </p>
                  )}
                </div>

                {/* Sign In button */}
                <div className='flex items-center gap-2 w-[80%] mt-8'>
                  <input type='checkbox' />
                  <p className='text-[#D6EAFF]/50'>
                    Accept
                    <a
                      href='#'
                      className='text-gray-300 hover:text-white transition duration-300 ease-in-out'
                    >
                      {' '}
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a
                      href='#'
                      className='text-gray-300 hover:text-white transition duration-300 ease-in-out'
                    >
                      Privacy & Policy
                    </a>
                  </p>
                </div>

                {/* Sign Up Button */}
                <PrimaryBtn
                  text={'Sign Up'}
                  disabled={isRegisterLoading}
                  width={'100%'}
                  size={'2xl'}
                  weight={'bold'}
                  type='submit'
                  isLoading={isRegisterLoading}
                />
              </form>
            </div>

            {/* Join Now link */}
            <h2 className='mt-7 text-white text-center text-xl font-light'>
              Already Have an acocunt?{' '}
              <Link href='/login' className='text-[#025C70] font-semibold'>
                SIGN IN
              </Link>
            </h2>
          </div>
        </div>
      </main>
    );
  }
};

export default Page;
