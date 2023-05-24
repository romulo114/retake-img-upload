'use client';

import Auth from 'src/components/Auth';
import { useAuth, VIEWS } from 'src/components/AuthProvider';

export const UnAuthenticatedLayout = () => {
  const { initial, view } = useAuth();
  if (initial) {
    return <div className='h-72 px-2'>Loading...</div>;
  }

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  return <Auth view={view} />;
};
