import { Fragment } from 'react';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { navigation } from 'src/lib/routes';
import { classNames } from 'src/lib/utils';
import logo from '../../../public/images/logo.svg';

export const SidebarTransition = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as='div' className='relative z-40 lg:hidden' onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
        </Transition.Child>
        <div className='fixed inset-0 z-40 flex'>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-black'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XMarkIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='h-0 flex-1 overflow-y-auto pt-5 pb-4'>
                <div className='relative flex h-24 shrink-0 items-center px-4'>
                  <Image className='h-8 w-auto' src={logo} alt='Your Company' fill />
                </div>
                <nav className='mt-5 space-y-1 px-2'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-neutral-800 text-white'
                          : 'text-neutral-300 hover:bg-neutral-900 hover:text-white',
                        'group flex items-center rounded-md px-2 py-2 text-base font-medium',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-white'
                            : 'text-neutral-400 group-hover:text-gray-300',
                          'mr-4 h-6 w-6 shrink-0',
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className='flex shrink-0 bg-neutral-900 p-4'>
                <a href='/' className='group block shrink-0'>
                  <div className='flex items-center'>
                    <div className='relative'>
                      <Image
                        className='inline-block h-10 w-10 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                        fill
                      />
                    </div>
                    <div className='ml-3'>
                      <p className='text-base font-medium text-white'>Tom Cook</p>
                      <p className='text-sm font-medium text-gray-400 group-hover:text-gray-300'>
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className='w-14 shrink-0' />
        </div>
      </Dialog>
    </Transition.Root>
  );
};
