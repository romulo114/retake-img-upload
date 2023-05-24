import { HomeIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
  { name: 'Pages', href: '/hello', icon: Square3Stack3DIcon, current: false },
];

export const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Settings', href: '/hello' },
  { name: 'Sign out', href: '/' },
];
