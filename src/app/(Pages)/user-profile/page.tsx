"use client"
import { useAuth } from '@/context/AuthContext/AuthProvider';
import React from 'react';

const Page = () => {

    const { user } = useAuth();

    console.log(user)
    return (
        <div>
            This is user profile
        </div>
    );
};

export default Page;