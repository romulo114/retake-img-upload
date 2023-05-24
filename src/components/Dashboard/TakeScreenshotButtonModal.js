import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function TakeScreenshotButtonModal(props) {
  const [open, setToOpen] = props.useOpenModal();

  return (
    <div>
      <button
        onClick={setToOpen}
        type='button'
        className='inline-flex items-center rounded-md bg-black px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-black transition ease-in-out hover:bg-gray-50 hover:text-black'
      >
        Take Screenshot
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setToOpen}>
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
                <Dialog.Panel className='relative w-3/4 max-w-xl transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all'>
                  <div className='absolute top-0 right-0 hidden pt-4 pr-4 sm:block'>
                    <button
                      type='button'
                      className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none'
                      onClick={() => setToOpen(false)}
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon
                        className='h-6 w-6 transition hover:text-black'
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                  <div className='p-3 sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:mt-0 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-base font-semibold leading-6 text-gray-900'
                      >
                        Launch Editor
                      </Dialog.Title>
                      <div className='mt-2'>
                        <p className='text-sm text-gray-500'>
                          Enter the application URL where you want to open the Retake
                          Screenshot Editor. This will open a new tab. We will remember
                          this URL for next time.
                        </p>
                      </div>
                      <label
                        htmlFor='company-website'
                        className='mt-4  block  text-sm font-medium leading-6 text-gray-900'
                      >
                        Site Address
                      </label>
                      <div className='relative mt-2 rounded-md shadow-sm'>
                        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                          <span className='text-gray-500 sm:text-sm'>http://</span>
                        </div>
                        <input
                          type='text'
                          name='company-website'
                          id='company-website'
                          className='block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:pl-14 sm:text-sm sm:leading-6'
                          placeholder='www.example.com'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4 p-3'>
                    <button
                      type='button'
                      className='rounded-md bg-white px-5 py-3 text-center text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 transition ease-in-out hover:bg-gray-50 hover:text-black'
                      onClick={() => setToOpen(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type='button'
                      className='rounded-md bg-black px-8 py-3 text-center text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-black transition ease-in-out hover:bg-gray-50 hover:text-black'
                      onClick={() => setToOpen(false)}
                    >
                      Open
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
