'use client';

import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const [token, setToken] = React.useState('');
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    }
  }, [searchParams]);

  useEffect(() => {
    // setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-4xl'>Verify Email</h1>
      <h2 className='p-2 bg-orange-500 text-black'>
        {token ? `${token}` : 'No token found'}
      </h2>
      {verified && (
        <div>
          <h2 className='text-green-500'>Email verified successfully!</h2>
          <Link href='/login'>Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className='text-red-500'>Email verification failed!</h2>
        </div>
      )}
    </div>
  );
}
