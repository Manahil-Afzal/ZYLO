"use client";

import React from 'react';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Loader from './Loader/Loader';

export default function UserLoader({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoadUserQuery({});

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
}

