'use client';
import { Controller, useForm } from 'react-hook-form';
import PrimaryBtn from '@/components/PrimaryBtn';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';
import {
  forgotPassword,
  resendForgetPasswordOTP,
  resetPassword,
  verifyForgetPasswordOTP,
} from '@/api/auth/auth';
import { AxiosError } from 'axios';
import OTPInput from 'react-otp-input';
import { useAuth } from '@/context/AuthContext/AuthProvider';

const Page = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [validationToken, setValidationToken] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [isForgetPasswordLoading, setIsForgetPasswordLoading] =
    useState<boolean>(false);
  const [isOtpResendLoading, setOtpResendLoading] = useState<boolean>(false);
  const [isOtpSubmitLoading, setOtpSubmitLoading] = useState<boolean>(false);
  const [isSubmitPassword, setIsSubmitPasswordLoading] =
    useState<boolean>(false);
  const [step, setStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const { user, isAuthLoading, login } = useAuth();

  const {
    register,
    handleSubmit,
    resetField,
    control,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const watchNewPassword = watch('newPassword');

  // SEND OTP
  const handleEmailSubmit = async (data: any) => {
    setIsForgetPasswordLoading(true);
    const userData = {
      email: data.email,
    };
    try {
      const { data, status } = await forgotPassword(userData);
      console.log(data);
      setEmail(userData.email);
      setStep(2);
      toast.success(data.message);
      // set otp timer
      const otpTimeInSeconds = data.data.otpValidationTime * 60;
      setTimeLeft(otpTimeInSeconds);
      setIsTimerActive(true);
    } catch (e) {
      const error = e as AxiosError<any>;
      toast.error(error.response?.data.message);

      setIsForgetPasswordLoading(false);
    }
  };

  // OTP VERIFICATION
  const handleOtpSubmit = async (data: any) => {
    setOtpSubmitLoading(true);
    const userData = {
      email: email,
      otp: data.otp,
    };
    try {
      const { data, status } = await verifyForgetPasswordOTP(userData);
      toast.success('OTP verified successfully');
      setValidationToken(data.data.otpValidationToken);
      setStep(3);
      console.log(data);
      // toast.success(data.message);
    } catch (e) {
      const error = e as AxiosError<any>;
      toast.error(error.response?.data.message);
      resetField('otp');
      setOtpSubmitLoading(false);
    }
  };

  // OTP RESEND
  const handleOtpResend = async () => {
    setOtpResendLoading(true);
    const userData = {
      email: email,
    };
    try {
      const { data, status } = await resendForgetPasswordOTP(userData);
      console.log(data);
      toast.success(data.message);
      setOtpResendLoading(false);

      // Restart OTP timer
      const otpTimeInSeconds = data.data.otpValidationTime * 60;
      setTimeLeft(otpTimeInSeconds);
      setIsTimerActive(true);
    } catch (e) {
      const error = e as AxiosError<any>;
      toast.error(error.response?.data.message);
      setOtpResendLoading(false);
    }
  };

  // SUBMIT PASSWORD
  const handlePasswordSubmit = async (data: any) => {
    setIsSubmitPasswordLoading(true);
    const userData = {
      email: email,
      token: validationToken,
      password: data.newPassword,
      password_confirmation: data.confirmPassword,
    };
    try {
      const { data, status } = await resetPassword(userData);
      toast.success(data.message);
      router.push('login');
      setIsSubmitPasswordLoading(false);
    } catch (e) {
      const error = e as AxiosError<any>;
      toast.error(error.response?.data.message);
      setIsSubmitPasswordLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimerActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false); // Stop the timer when it hits 0
    }

    return () => clearTimeout(timer);
  }, [timeLeft, isTimerActive]);

  // Format time in mm:ss format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (isAuthLoading) {
    return (
      <div className='h-[90vh] flex justify-center items-center'>
        <h1 className='text-2xl'>Loading... ⏳</h1>
      </div>
    );
  }

  if (!user) {
    return router.push('login');
  }

  if (user.user_name && user.email_verified_at) {
    return router.push('/home');
  }

  return (
    <main className='flex min-h-screen bg-gradient-to-b from-[#004A99] to-[#00B4DB]'>
      <div
        className='grid grid-cols-1 lg:grid-cols-2 gap-24 w-full items-center justify-center'
        style={{
          backgroundImage: `url('/Pattern 3.png')`,
          backgroundSize: '1700px',
          backgroundPosition: '-600px -150px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='z-50 flex flex-col items-center justify-center lg:border-r scale-50 lg:scale-100 h-[50%] '>
          <h1 className='font-semimedium text-[#08B7EB] text-4xl mb-3'>
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
            />
          </Link>
        </div>

        <div className='w-[90%] md:w-[70%] lg:max-w-[60%] mx-auto z-50 -mt-24 md:-mt-0 animate__animated animate__fadeIn'>
          <div className='bg-gray-900/30 py-10 rounded-xl flex flex-col items-center backdrop-blur-sm'>
            <h1 className='text-3xl text-white border-b-4 border-[#008EAD] mb-8'>
              Forgot Password
            </h1>

            {step === 1 && (
              <form
                onSubmit={handleSubmit(handleEmailSubmit)}
                className='flex flex-col gap-5 w-[80%]'
              >
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                  placeholder='Enter email'
                  className={`px-4 py-2 rounded-md outline-none w-full ${
                    errors.email ? 'border-2 border-red-600' : ''
                  }`}
                />
                {errors.email && (
                  <span className='text-red-300'>
                    {String(errors.email.message)}
                  </span>
                )}
                <PrimaryBtn
                  text={`Request OTP`}
                  disabled={isForgetPasswordLoading}
                  width={'100%'}
                  size={'base'}
                  weight={'semibold'}
                  type='submit'
                  isLoading={isForgetPasswordLoading}
                />
              </form>
            )}
            {/* Step OTP */}
            {step === 2 && (
              <form
                onSubmit={handleSubmit(handleOtpSubmit)}
                className='flex flex-col gap-5 items-center'
              >
                <Controller
                  name='otp'
                  control={control}
                  rules={{
                    required: 'OTP is required',
                    validate: value =>
                      value.length === 6 || 'OTP must be 6 characters long',
                  }}
                  render={({ field }) => (
                    <OTPInput
                      value={field.value}
                      onChange={(value: string) => {
                        setOtp(value);
                        field.onChange(value);
                      }}
                      numInputs={6}
                      inputStyle={{
                        width: '2.5rem',
                        height: '2.5rem',
                        margin: '0.5rem',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(0,0,0,0.3)',
                      }}
                      renderInput={props => <input {...props} />}
                    />
                  )}
                />

                {errors.otp && (
                  <span className='text-red-300'>
                    {errors.otp.message as string}
                  </span>
                )}

                <div className='grid grid-cols-2 gap-4 w-full'>
                  <PrimaryBtn
                    text={`Submit OTP`}
                    disabled={isOtpSubmitLoading}
                    width={'100%'}
                    size={'base'}
                    weight={'semibold'}
                    type='submit'
                    isLoading={isOtpSubmitLoading}
                  />
                  <PrimaryBtn
                    text={`Resend OTP ${
                      isTimerActive ? `(${formatTime(timeLeft)})` : ''
                    }`}
                    disabled={isTimerActive || isOtpResendLoading}
                    width={'100%'}
                    size={'base'}
                    weight={'semibold'}
                    type='button'
                    isLoading={isOtpResendLoading}
                    onclick={() => handleOtpResend()}
                  />
                </div>
              </form>
            )}

            {/* step password submit */}
            {step === 3 && (
              <form
                onSubmit={handleSubmit(handlePasswordSubmit)}
                className='flex flex-col gap-5 w-[80%]'
              >
                <div className='relative'>
                  <input
                    placeholder='New Password'
                    type={isOpen ? 'text' : 'password'}
                    {...register('newPassword', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    className={`px-4 py-2 rounded-md outline-none w-full ${
                      errors.newPassword ? 'border-2 border-red-600' : ''
                    }`}
                  />
                  {errors.newPassword && (
                    <span className='text-red-300'>
                      {String(errors.newPassword.message)}
                    </span>
                  )}
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
                </div>

                <div className='relative'>
                  <input
                    placeholder='Confirm Password'
                    type='password'
                    {...register('confirmPassword', {
                      required: 'Confirm your password',
                      validate: value =>
                        value === watchNewPassword || 'Passwords do not match',
                    })}
                    className={`px-4 py-2 rounded-md outline-none w-full ${
                      errors.confirmPassword ? 'border-2 border-red-600' : ''
                    }`}
                  />
                  {errors.confirmPassword && (
                    <span className='text-red-300'>
                      {String(errors.confirmPassword.message)}
                    </span>
                  )}
                </div>

                <PrimaryBtn
                  text={`Change Password`}
                  disabled={isSubmitPassword}
                  width={'100%'}
                  size={'base'}
                  weight={'semibold'}
                  type='submit'
                  isLoading={isSubmitPassword}
                />
              </form>
            )}
          </div>

          <h2 className='mt-7 text-white text-center text-xl font-light'>
            New to Tafaling?{' '}
            <Link href='/register' className='text-[#025C70] font-semimedium'>
              JOIN NOW
            </Link>
          </h2>
        </div>
      </div>
    </main>
  );
};

export default Page;
