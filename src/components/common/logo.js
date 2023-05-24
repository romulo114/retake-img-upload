import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/images/logo.svg';

export const Logo = () => {
  return (
    <Link href='/'>
      <Image
        className='mx-auto h-12 w-auto'
        src={logo}
        alt='LOGO'
        width={50}
        height={50}
      />
    </Link>
  );
};
