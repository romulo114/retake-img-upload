'use client';

import { useState } from 'react';
import { SidebarTransition } from 'src/components/Sidebar/SidebarTransition';
import { Sidebar } from 'src/components/Sidebar';
import { SearchBar } from 'src/components/Searchbar';

export const AuthenticatedLayout = () => {
  // const { initial, user, view, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <SidebarTransition sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar />
      <SearchBar setSidebarOpen={setSidebarOpen} />
    </>
  );
};
