import Image from 'next/image';
import { navigation } from 'src/lib/routes';
import { classNames } from 'src/lib/utils';
import { Logo } from '../common/logo';

export const Sidebar = () => {
  return (
    <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col'>
      <div className='flex min-h-0 flex-1 flex-col bg-black'>
        <div className='flex flex-1 flex-col overflow-y-auto pt-5 pb-4'>
          <div className='relative mx-auto flex h-24 shrink-0 items-center px-4'>
            <Logo />
          </div>
          <nav className='mt-5 flex-1 space-y-1 px-2'>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-300 hover:bg-neutral-900 hover:text-white',
                  'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                )}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? 'text-white'
                      : 'text-neutral-400 group-hover:text-gray-300',
                    'mr-3 h-6 w-6 shrink-0',
                  )}
                  aria-hidden='true'
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <div className='flex shrink-0 bg-neutral-900 p-4'>
          <a href='/' className='group block w-full shrink-0'>
            <div className='flex items-center'>
              <div className='relative h-9 w-9'>
                <Image
                  className='inline-block rounded-full'
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  alt=''
                  fill
                />
              </div>
              <div className='ml-3'>
                <p className='text-sm font-medium text-white'>Tom Cook</p>
                <p className='text-xs font-medium text-gray-300 group-hover:text-gray-200'>
                  View profile
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
