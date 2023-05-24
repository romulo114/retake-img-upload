import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function ScreenshotModal(props) {
  const { modal, openScreenModal, setOpenScreenModal } = props;

  return (
    <Transition.Root show={openScreenModal} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpenScreenModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative h-[640px] w-3/4 max-w-3xl transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all'>
                <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
                  <button
                    type='button'
                    className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none'
                    onClick={() => setOpenScreenModal(false)}
                  >
                    <span className='sr-only'>Close</span>
                    <XMarkIcon
                      className='h-6 w-6 transition hover:text-black'
                      aria-hidden='true'
                    />
                  </button>
                </div>
                <div className='p-3'>
                  <div className='relative h-[500px] w-full pb-[50px]'>
                    <Image
                      src={modal.url}
                      alt={modal.title}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <Dialog.Title
                    as='h3'
                    className='mt-2 text-base font-semibold leading-6 text-gray-900'
                  >
                    {modal.title}
                  </Dialog.Title>
                  <p className=''>{modal.description}</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
