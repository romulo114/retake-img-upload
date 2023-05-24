'use client';

import { useEffect, useState } from 'react';
import TakeScreenshotButtonModal from 'src/components/Dashboard/TakeScreenshotButtonModal';
import Auth from 'src/components/Auth';
import { useAuth, VIEWS } from 'src/components/AuthProvider';
import useOpenModal from 'src/hooks/useOpenModal';
import { getScreenshots } from '@/lib/base/screenshots';
import Image from 'next/image';
import ScreenshotModal from '@/components/Screenshot/ScreenshotModal';

export default function Home() {
  const { user, view } = useAuth();
  const [screenshots, setScreenshots] = useState([]);
  const [screenModal, setScreenModal] = useState('');
  const [openScreenModal, setOpenScreenModal] = useState(false);
  const fetchScreenshots = async (id) => {
    try {
      const response = await getScreenshots(id);
      if (response) {
        setScreenshots(response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchScreenshots(user?.id);
  }, [user?.id]);

  if (view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  if (user) {
    return (
      <div className='flex flex-1 flex-col lg:pl-64'>
        <div className='py-8'>
          {/* container */}
          <div className='max-w-8xl mx-4 px-4 sm:px-6 lg:px-3'>
            <div className='mb-12 sm:flex sm:items-center sm:justify-between'>
              <div>
                <h1 className='text-3xl font-medium text-black tracking-wide'>Dashboard</h1>
                <h2 className='text-base font-normal text-gray-500'>
                  Manage your product screenshots with ease
                </h2>
              </div>
              <div className='mt-3 flex sm:mt-0 sm:ml-4'>
                <TakeScreenshotButtonModal useOpenModal={useOpenModal} />
              </div>
            </div>
            {/* Section Recently taken */}
            <h3 className='mb-6 text-lg font-normal text-black tracking-wide'>Recently Taken</h3>

            {/* Display images */}
            <ul className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8'>
              {screenshots.length &&
                screenshots.map((screen) => {
                  return (
                    <li key={screen.id} className='group relative'>
                      {/* Container relative to position hover elements */}
                      <div
                        className='relative'
                        onClick={() => {
                          setScreenModal(screen);
                          setOpenScreenModal(true);
                        }}
                      >
                        {/* inner white border */}
                        <div className='rounded-md border border-slate-300 bg-white p-2 shadow-md'>
                          {/* Icons container - transition bottom up */}
                          <div className='absolute bottom-0 right-0 z-50 mr-5 flex translate-y-10 space-x-2  opacity-0 transition-all ease-in-out will-change-auto group-hover:mb-5 group-hover:translate-y-0 group-hover:opacity-100 '>
                            {/* Copy Link icon */}
                            <div className='flex h-9 w-11 cursor-pointer items-center justify-center rounded-md bg-white shadow drop-shadow-md transition ease-in-out hover:bg-black hover:text-white'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='h-6 w-6'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244'
                                />
                              </svg>
                            </div>

                            {/* Download icon */}
                            <div className='flex h-9 w-11 cursor-pointer items-center justify-center rounded-md bg-white shadow drop-shadow-md transition ease-in-out hover:bg-black hover:text-white'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='h-6 w-6'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Img wrapper and aspect ration */}
                          <div className='aspect-w-10 aspect-h-7 bg-netural-100 focus-within:ring-offset-netural-100 group relative block h-48 w-full overflow-hidden border will-change-auto focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2'>
                            <Image
                              src={screen.url}
                              alt={screen.title}
                              className='pointer-events-none object-cover'
                              fill
                            />
                          </div>
                          <button
                            type='button'
                            className='absolute inset-0 h-full w-full transform-gpu rounded-lg bg-black bg-opacity-0 transition duration-500 ease-in-out will-change-auto focus:outline-none group-hover:bg-opacity-80'
                          >
                            <span className='sr-only'>
                              View details for {screen.title}
                            </span>
                          </button>
                        </div>
                      </div>

                      <p className='text-md text-netural-900 pointer-events-none mt-4 mb-1 block truncate font-medium'>
                        {screen.title}
                      </p>
                    </li>
                  );
                })}
            </ul>
            <ScreenshotModal
              modal={screenModal}
              setOpenScreenModal={setOpenScreenModal}
              openScreenModal={openScreenModal}
            />
          </div>
        </div>
      </div>
    );
  }
}
