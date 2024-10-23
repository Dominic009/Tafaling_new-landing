import PrimaryBtn from '@/components/PrimaryBtn';
import SecondaryBtn from '@/components/SecondaryBtn';
import Image from 'next/legacy/image';
import Link from 'next/link';
import 'animate.css';
import { redirect } from 'next/navigation';

export default function Home() {
  // return (
  //   <main className='min-h-screen bg-gradient-to-b from-secondary to-[#00B4DB] p-5'>
  //     <div className='flex justify-between animate__animated animate__fadeInLeft'>
  //       <Image
  //         src='/Tafaling logo.png'
  //         alt='Image'
  //         width={200}
  //         height={85}
  //         className='mix-blend-plus-darker'
  //       ></Image>
  //     </div>
  //     <div className='h-[80vh] flex flex-col items-center justify-center'>
  //       <h1 className='text-3xl md:text-5xl lg:text-7xl font-semibold text-white text-center'>
  //         Welcome to <span className='text-[#26d5fc]'>Tafaling.com</span>
  //       </h1>

  //       <p className='text-lg md:text-xl lg:text-2xl text-center mt-2 text-gray-300'>
  //         Your journey with us starts here. Whether you&apos;re new or
  //         returning, we&apos;re excited to have you. <br />
  //       </p>

  //       <div className='w-[90%] lg:w-[50%] mt-12 flex flex-col justify-center items-center  animate__animated animate__fadeInUp animate__delay-1s'>
  //         <p className='text-lg md:text-xl lg:text-xl text-center mt-2 text-gray-100 mb-5'>
  //           Please choose an option below to get started :
  //         </p>
  //         <div className='flex flex-col gap-3 lg:flex-row w-[90%] lg:w-[70%]'>
  //           <Link href={'/login'} className=' w-full flex justify-center'>
  //             <PrimaryBtn
  //               text={'Go to Sign In'}
  //               icon
  //               width={'80%'}
  //               weight={'bold'}
  //               size={'2xl'}
  //             ></PrimaryBtn>
  //           </Link>

  //           <Link href={'/register'} className=' w-full flex justify-center'>
  //             <SecondaryBtn
  //               text={'Go to Sign Up'}
  //               icon
  //               width={'80%'}
  //             ></SecondaryBtn>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   </main>
  // );

  return redirect('/home');
}
