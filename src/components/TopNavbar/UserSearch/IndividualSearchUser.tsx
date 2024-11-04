/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ISearchUser } from '../Navbar';

interface IIndividualSearchUser {
  user: ISearchUser;
}

const IndividualSearchUser: React.FC<IIndividualSearchUser> = ({ user }) => {
  return (
    <div className=' w-[320px] z-50 flex'>
      <img src={user.profilePicture} alt='user' className='w-24' />
      <h1>{user.name}</h1>
    </div>
  );
};

export default IndividualSearchUser;
